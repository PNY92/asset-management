"use server"

import { createClient } from "@/lib/supabase/server"

enum status {
    STATUS_READY = "STATUS_READY",
    STATUS_DEPLOYED = "STATUS_DEPLOYED"
} 

type items = {
    id: string,
    asset_tag: string,
    model: string,
    category: string,
    status: status,
    display_name: string,
    organization_id: string
}

async function fetchInventoryItems() {
    const supabase = await createClient();

    const asset_response = await supabase.from("Asset").select();

    if (asset_response.error) {
        return {error: asset_response.error.message}
    }
    else {
        return {data : asset_response.data as items[]};
    }
}

export {fetchInventoryItems}