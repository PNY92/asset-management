"use client"

import AppSidebar from '@/components/custom/appSidebar';
import { Loading } from '@/components/custom/loading';
import {SidebarProvider} from '@/components/ui/sidebar';
import { Suspense } from 'react';



function Sidebar_Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar>
                <Suspense fallback={<Loading></Loading>}>
                    {children}
                </Suspense>
                
            </AppSidebar>
        </SidebarProvider>
    )
}

export default Sidebar_Layout;