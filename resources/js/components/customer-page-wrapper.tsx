import { CookieConsentBanner } from '@/components/cookie-consent-banner';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { useTrackingCodes } from '@/hooks/use-tracking-codes';

type TrackingCode = {
    id: number;
    name: string;
    script_content: string;
};

interface CustomerPageWrapperProps {
    children: ReactNode;
}

/**
 * Wrapper component for customer pages that automatically:
 * - Shows cookie consent banner
 * - Executes tracking codes when cookies are accepted
 * 
 * Use this component on all /customer/* pages to ensure
 * tracking codes are properly integrated.
 */
export function CustomerPageWrapper({ children }: CustomerPageWrapperProps) {
    // Get tracking codes from shared props (available on all /customer/* routes)
    const { trackingCodes = [] } = usePage<SharedData & { trackingCodes?: TrackingCode[] }>().props;

    // Execute tracking codes when cookies are accepted
    useTrackingCodes(trackingCodes || []);

    return (
        <>
            <CookieConsentBanner />
            {children}
        </>
    );
}

