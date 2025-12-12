import TrackingCodeController from '@/actions/App/Http/Controllers/Settings/TrackingCodeController';
import { TrackingCodeFormFields } from '@/components/tracking-code-form-fields';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { index as indexRoute } from '@/routes/settings/tracking-codes';

type TrackingCode = {
    id: number;
    name: string;
    script_content: string;
};

type Props = {
    trackingCode: TrackingCode;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tracking Codes',
        href: indexRoute().url,
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function EditTrackingCode({ trackingCode }: Props) {
    const [name, setName] = useState(trackingCode.name);
    const [scriptContent, setScriptContent] = useState(
        trackingCode.script_content,
    );

    useEffect(() => {
        setName(trackingCode.name);
        setScriptContent(trackingCode.script_content);
    }, [trackingCode]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Tracking Code" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Edit Tracking Code"
                        description="Update your tracking code information"
                    />

                    <Form
                        {...TrackingCodeController.update.form({
                            tracking_code: trackingCode.id,
                        })}
                        data={{
                            name,
                            script_content: scriptContent,
                        }}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <TrackingCodeFormFields
                                    name={name}
                                    scriptContent={scriptContent}
                                    errors={errors}
                                    onNameChange={setName}
                                    onScriptContentChange={setScriptContent}
                                />

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href={indexRoute().url}>
                                            Cancel
                                        </Link>
                                    </Button>
                                    {recentlySuccessful && (
                                        <p className="text-sm text-muted-foreground">
                                            Updated
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

