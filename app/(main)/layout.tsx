

import AppSidebar from '@/components/custom/appSidebar';
import {SidebarProvider} from '@/components/ui/sidebar';



function Sidebar_Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar>
                {children}
            </AppSidebar>
        </SidebarProvider>
    )
}

export default Sidebar_Layout;