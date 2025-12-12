import { useCookieConsent } from '@/hooks/use-cookie-consent';
import { useEffect, useRef } from 'react';

type TrackingCode = {
    id: number;
    name: string;
    script_content: string;
};

/**
 * Hook to execute tracking codes based on cookie consent
 * 
 * Tracking codes are wrapped in <script> tags and executed only when
 * cookies are accepted. They are removed when consent is rejected.
 */
export function useTrackingCodes(trackingCodes: TrackingCode[] = []) {
    const { consentStatus } = useCookieConsent();
    const executedScriptsRef = useRef<Set<number>>(new Set());

    useEffect(() => {
        // Only execute if cookies are accepted
        if (consentStatus !== 'accepted') {
            // Remove any previously executed scripts if consent is revoked
            if (consentStatus === 'rejected' || consentStatus === null) {
                // Remove all tracking code scripts
                const scripts = document.querySelectorAll(
                    'script[data-tracking-code-id]',
                );
                scripts.forEach((script) => {
                    script.remove();
                });
                executedScriptsRef.current.clear();
            }
            return;
        }

        // Execute each tracking code
        trackingCodes.forEach((trackingCode) => {
            // Skip if already executed
            if (executedScriptsRef.current.has(trackingCode.id)) {
                return;
            }

            try {
                // Get the script content (already stored without <script> tags)
                const scriptContent = trackingCode.script_content.trim();

                if (!scriptContent) {
                    console.warn(`[Tracking Code] Empty script content for: ${trackingCode.name}`);
                    return;
                }

                // Create a script element
                // The script content is wrapped in <script> tags when injected
                const scriptElement = document.createElement('script');
                scriptElement.textContent = scriptContent;
                scriptElement.setAttribute('data-tracking-code-id', trackingCode.id.toString());
                scriptElement.setAttribute('data-tracking-code-name', trackingCode.name);

                // Append to document head
                document.head.appendChild(scriptElement);

                // Mark as executed
                executedScriptsRef.current.add(trackingCode.id);

                console.log(`[Tracking Code] Executed: ${trackingCode.name}`);
            } catch (error) {
                console.error(`[Tracking Code] Error executing ${trackingCode.name}:`, error);
            }
        });
    }, [consentStatus, trackingCodes]);
}

