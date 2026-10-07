import { Link } from '@inertiajs/react';
import { Home, LayoutGrid, Mail, Settings, Users } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { home } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Accueil',
        href: home(),
        icon: Home,
    },
    {
        title: 'Applications',
        href: '/applications',
        icon: LayoutGrid,
    },
    {
        title: 'Collaborateurs',
        href: '/collaborateurs',
        icon: Users,
    },
    {
        title: 'Administration',
        href: '/admin/applications',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Demander une application',
        href: '/applications/request',
        icon: Mail,
    },
];

export function AppSidebar() {
    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="p-2"
        >
            <SidebarHeader className="px-1 pt-1">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="h-12 rounded-xl px-3 transition-colors hover:bg-muted"
                        >
                            <Link href={home()} prefetch>
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                                    D
                                </div>

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        Dashboard
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        Espace collaborateur
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-1 py-3">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="px-1 pb-1">
                <NavFooter
                    items={footerNavItems}
                    className="mb-2"
                />

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}