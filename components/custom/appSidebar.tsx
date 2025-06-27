"use client"
import { SidebarGroup, SidebarGroupLabel, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarGroupContent, SidebarMenuButton, Sidebar, SidebarTrigger, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import sidebar_config from '@/config/sidebar';
import Link from 'next/link';
import { NavUser } from './nav_user';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

function AppSidebar({ children }: { children: React.ReactNode }) {

    type User = {
        role: string,
        email: string
    }

    const [user, setUser] = useState< User | null>()

    useEffect(() => {

        async function getAuth() {
            const supabase = await createClient();

            setUser((await supabase.auth.getUser()).data.user as User);
        }
        getAuth();
    }, []);

    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    {sidebar_config.headerLabel}
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebar_config.items.map((item) =>
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.path}>
                                                <item.icon></item.icon>
                                                <span>{item.label}</span>
                                            </Link>

                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    
                    <NavUser user={{name: `${user?.role}`, email: `${user?.email}`}}></NavUser>
                </SidebarFooter>
            </Sidebar>

            <main className="w-[100%]">
                <SidebarTrigger className="fixed"></SidebarTrigger>
                <div className="w-[90%] h-[80%] justify-self-center mt-10">
                    {children}
                </div>

            </main>
        </>

    )
}

export default AppSidebar;