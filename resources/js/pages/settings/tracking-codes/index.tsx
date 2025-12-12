import TrackingCodeController from '@/actions/App/Http/Controllers/Settings/TrackingCodeController';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { index as indexRoute } from '@/routes/settings/tracking-codes';
import { Input } from '@/components/ui/input';

type TrackingCode = {
    id: number;
    name: string;
    script_content: string;
    created_at: string;
    updated_at: string;
};

type Props = {
    trackingCodes: TrackingCode[];
    filters: {
        search?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tracking Codes',
        href: indexRoute().url,
    },
];

export default function TrackingCodesIndex({
    trackingCodes,
    filters,
}: Props) {
    const { flash } = usePage().props;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [trackingCodeToDelete, setTrackingCodeToDelete] = useState<
        number | null
    >(null);
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        if (flash?.error) {
            toast.error(flash.error as string, {
                duration: 10000,
                id: 'flash-error',
            });
        }
        if (flash?.success) {
            toast.success(flash.success as string);
        }
    }, [flash]);

    function handleDelete(id: number) {
        router.delete(
            TrackingCodeController.destroy.url({ tracking_code: id }),
            {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setTrackingCodeToDelete(null);
                },
                onError: () => {
                    toast.error('Failed to delete tracking code. Please try again.');
                },
            },
        );
    }

    function openDeleteDialog(id: number) {
        setTrackingCodeToDelete(id);
        setDeleteDialogOpen(true);
    }

    function closeDeleteDialog() {
        setDeleteDialogOpen(false);
        setTrackingCodeToDelete(null);
    }

    function handleSearch() {
        router.get(indexRoute().url, { search }, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tracking Codes" />
            <SettingsLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Tracking Codes</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Manage your tracking codes and scripts
                            </p>
                        </div>
                        <Button asChild>
                            <Link href={TrackingCodeController.create.url()}>
                                <PlusIcon className="mr-2 size-4" />
                                Create Tracking Code
                            </Link>
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            className="max-w-sm"
                        />
                        <Button
                            variant="outline"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </div>

                    {trackingCodes.length === 0 ? (
                        <div className="rounded-lg border border-border bg-card p-8 text-center">
                            <p className="text-sm font-medium text-muted-foreground">
                                No tracking codes found. Create your first tracking code to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {trackingCodes.map((trackingCode) => (
                                <div
                                    key={trackingCode.id}
                                    className="rounded-lg border border-border bg-card p-4"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">
                                                {trackingCode.name}
                                            </h3>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Created {trackingCode.created_at}
                                            </p>
                                            <div className="mt-2 rounded-md bg-muted p-2">
                                                <pre className="overflow-x-auto text-xs">
                                                    <code>
                                                        {trackingCode.script_content.substring(
                                                            0,
                                                            200,
                                                        )}
                                                        {trackingCode.script_content.length >
                                                        200 && '...'}
                                                    </code>
                                                </pre>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={TrackingCodeController.edit.url(
                                                        {
                                                            tracking_code:
                                                                trackingCode.id,
                                                        },
                                                    )}
                                                >
                                                    <PencilIcon className="size-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    openDeleteDialog(
                                                        trackingCode.id,
                                                    )
                                                }
                                            >
                                                <TrashIcon className="size-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Dialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Tracking Code</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this tracking code? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={closeDeleteDialog}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() =>
                                    trackingCodeToDelete &&
                                    handleDelete(trackingCodeToDelete)
                                }
                            >
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </SettingsLayout>
        </AppLayout>
    );
}

