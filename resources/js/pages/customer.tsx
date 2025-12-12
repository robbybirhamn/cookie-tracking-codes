import { CustomerPageWrapper } from '@/components/customer-page-wrapper';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { customer } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Users, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customer Dashboard',
        href: customer().url,
    },
];

export default function Customer() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer Dashboard" />
            <CustomerPageWrapper>
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total Customers
                                </p>
                                <p className="mt-2 text-3xl font-bold">1,234</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    +12.5% from last month
                                </p>
                            </div>
                            <div className="rounded-full bg-primary/10 p-3">
                                <Users className="size-6 text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total Orders
                                </p>
                                <p className="mt-2 text-3xl font-bold">5,678</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    +8.2% from last month
                                </p>
                            </div>
                            <div className="rounded-full bg-primary/10 p-3">
                                <ShoppingCart className="size-6 text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Revenue
                                </p>
                                <p className="mt-2 text-3xl font-bold">$45,678</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    +15.3% from last month
                                </p>
                            </div>
                            <div className="rounded-full bg-primary/10 p-3">
                                <DollarSign className="size-6 text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Growth Rate
                                </p>
                                <p className="mt-2 text-3xl font-bold">24.5%</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    +2.1% from last month
                                </p>
                            </div>
                            <div className="rounded-full bg-primary/10 p-3">
                                <TrendingUp className="size-6 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Recent Activity */}
                    <div className="relative min-h-[400px] overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
                        <div className="space-y-4">
                            {[
                                { name: 'John Doe', action: 'Placed a new order', time: '2 minutes ago' },
                                { name: 'Jane Smith', action: 'Updated profile', time: '15 minutes ago' },
                                { name: 'Bob Johnson', action: 'Completed purchase', time: '1 hour ago' },
                                { name: 'Alice Williams', action: 'Registered new account', time: '2 hours ago' },
                                { name: 'Charlie Brown', action: 'Requested support', time: '3 hours ago' },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                                >
                                    <div>
                                        <p className="text-sm font-medium">{activity.name}</p>
                                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Overview */}
                    <div className="relative min-h-[400px] overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                        <h2 className="mb-4 text-lg font-semibold">Customer Overview</h2>
                        <div className="space-y-4">
                            <div className="rounded-lg border border-border bg-muted/50 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Active Customers</p>
                                        <p className="mt-1 text-2xl font-bold">892</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">This month</div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-border bg-muted/50 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">New Customers</p>
                                        <p className="mt-1 text-2xl font-bold">156</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">This month</div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-border bg-muted/50 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Average Order Value</p>
                                        <p className="mt-1 text-2xl font-bold">$89.45</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">This month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                    <h2 className="mb-4 text-lg font-semibold">Customer Analytics</h2>
                    <div className="relative h-full min-h-[250px] overflow-hidden rounded-lg">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="relative flex h-full items-center justify-center">
                            <p className="text-sm text-muted-foreground">
                                Analytics chart placeholder
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </CustomerPageWrapper>
        </AppLayout>
    );
}

