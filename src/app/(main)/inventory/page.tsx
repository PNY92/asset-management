import { InventoryList } from "@/components/custom/inventoryList";
import { Suspense } from "react";



function InventoryPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <InventoryList/>

        </Suspense>
        
    );
}

export default InventoryPage;