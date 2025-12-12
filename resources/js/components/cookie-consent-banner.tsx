import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/hooks/use-cookie-consent';
import { Cookie } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CookieConsentBanner() {
    const { isBannerVisible, acceptAll, rejectAll } = useCookieConsent();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(isBannerVisible);
    }, [isBannerVisible]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in fade-in-0 slide-in-from-bottom-5 duration-300">
            <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
                <div className="rounded-lg border border-border bg-card p-4 shadow-lg sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="flex-shrink-0">
                                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                                    <Cookie className="size-5 text-primary" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-foreground">
                                    Cookie Consent
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    We use cookies to enhance your browsing experience,
                                    analyze site traffic, and personalize content. By
                                    clicking &quot;Accept All&quot;, you consent to our use
                                    of cookies. You can also choose to reject all cookies.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={rejectAll}
                                className="w-full sm:w-auto"
                            >
                                Reject All
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={acceptAll}
                                className="w-full sm:w-auto"
                            >
                                Accept All
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

