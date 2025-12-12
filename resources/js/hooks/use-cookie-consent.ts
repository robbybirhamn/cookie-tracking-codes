import { useCallback, useEffect, useState } from 'react';

export type CookieConsentStatus = 'accepted' | 'rejected' | null;

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_CONSENT_EXPIRY_KEY = 'cookie_consent_expiry';
const COOKIE_CONSENT_DAYS = 30;

/**
 * Get the expiry date for cookie consent (30 days from now)
 */
const getExpiryDate = (): number => {
    return Date.now() + COOKIE_CONSENT_DAYS * 24 * 60 * 60 * 1000;
};

/**
 * Check if the consent has expired
 */
const isConsentExpired = (): boolean => {
    if (typeof window === 'undefined') {
        return true;
    }

    const expiry = localStorage.getItem(COOKIE_CONSENT_EXPIRY_KEY);
    if (!expiry) {
        return true;
    }

    return Date.now() > parseInt(expiry, 10);
};

/**
 * Get the current consent status
 */
const getConsentStatus = (): CookieConsentStatus => {
    if (typeof window === 'undefined') {
        return null;
    }

    // Check if consent has expired
    if (isConsentExpired()) {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        localStorage.removeItem(COOKIE_CONSENT_EXPIRY_KEY);
        sessionStorage.removeItem(COOKIE_CONSENT_KEY);
        return null;
    }

    // Check localStorage first (for "Accept All" - 30 days)
    const localStorageConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (localStorageConsent === 'accepted') {
        return 'accepted';
    }

    // Check sessionStorage (for "Reject All" - session only)
    const sessionStorageConsent = sessionStorage.getItem(COOKIE_CONSENT_KEY);
    if (sessionStorageConsent === 'rejected') {
        return 'rejected';
    }

    return null;
};

/**
 * Enable or disable tracking scripts based on consent
 *
 * This function is called whenever the consent status changes.
 * Add your tracking script initialization/update logic here.
 *
 * Examples:
 * - Google Analytics: window.gtag?.('consent', 'update', { analytics_storage: enabled ? 'granted' : 'denied' });
 * - Facebook Pixel: fbq('consent', enabled ? 'grant' : 'revoke');
 * - Custom tracking: window.trackingEnabled = enabled;
 */
const updateTrackingScripts = (enabled: boolean): void => {
    if (typeof window === 'undefined') {
        return;
    }

    if (enabled) {
        // Enable tracking scripts
        // Example implementations:
        // if (window.gtag) {
        //     window.gtag('consent', 'update', {
        //         analytics_storage: 'granted',
        //         ad_storage: 'granted',
        //     });
        // }
        // if (window.fbq) {
        //     window.fbq('consent', 'grant');
        // }
        console.log('[Cookie Consent] Tracking scripts enabled');
    } else {
        // Disable tracking scripts
        // Example implementations:
        // if (window.gtag) {
        //     window.gtag('consent', 'update', {
        //         analytics_storage: 'denied',
        //         ad_storage: 'denied',
        //     });
        // }
        // if (window.fbq) {
        //     window.fbq('consent', 'revoke');
        // }
        console.log('[Cookie Consent] Tracking scripts disabled');
    }
};

export function useCookieConsent() {
    const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>(null);
    const [isBannerVisible, setIsBannerVisible] = useState(false);

    /**
     * Accept all cookies - store in localStorage for 30 days
     */
    const acceptAll = useCallback(() => {
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        localStorage.setItem(
            COOKIE_CONSENT_EXPIRY_KEY,
            getExpiryDate().toString(),
        );
        // Remove from sessionStorage if it exists
        sessionStorage.removeItem(COOKIE_CONSENT_KEY);

        setConsentStatus('accepted');
        setIsBannerVisible(false);
        updateTrackingScripts(true);
    }, []);

    /**
     * Reject all cookies - store in sessionStorage (session only)
     */
    const rejectAll = useCallback(() => {
        if (typeof window === 'undefined') {
            return;
        }

        sessionStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
        // Remove from localStorage if it exists
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        localStorage.removeItem(COOKIE_CONSENT_EXPIRY_KEY);

        setConsentStatus('rejected');
        setIsBannerVisible(false);
        updateTrackingScripts(false);
    }, []);

    /**
     * Initialize consent status on mount
     */
    useEffect(() => {
        const status = getConsentStatus();
        setConsentStatus(status);

        // Show banner if no consent has been given
        if (status === null) {
            setIsBannerVisible(true);
        } else {
            setIsBannerVisible(false);
            // Apply the existing consent status to tracking scripts
            updateTrackingScripts(status === 'accepted');
        }
    }, []);

    return {
        consentStatus,
        isBannerVisible,
        acceptAll,
        rejectAll,
    } as const;
}

