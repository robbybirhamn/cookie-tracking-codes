import TrackingCodeController from '@/actions/App/Http/Controllers/Settings/TrackingCodeController';
import { TrackingCodeFormFields } from '@/components/tracking-code-form-fields';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { index as indexRoute } from '@/routes/settings/tracking-codes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tracking Codes',
        href: indexRoute().url,
    },
    {
        title: 'Create',
        href: TrackingCodeController.create.url(),
    },
];

export default function CreateTrackingCode() {
    const [name, setName] = useState('');
    const [scriptContent, setScriptContent] = useState('');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Tracking Code" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Create Tracking Code"
                        description="Add a new tracking code to your account"
                    />

                    <Form
                        {...TrackingCodeController.store.form()}
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
                                        Create
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
                                            Created
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

