"use server"

import { createClient } from "@/lib/supabase/server"

async function createAsset(formData: FormData) {
    const supabase = await createClient();

    const asset_response = await supabase.from("Asset").insert({
        display_name: formData.get("display_name"),
        category: formData.get("category"),
        model: formData.get("model"),
        asset_tag: formData.get("asset_tag"),
        status: formData.get("status"),
        organization_id: 1
    })

    if (asset_response.error) {
        return {error: asset_response.error.message}
    }
    return {success: "Successfully created asset record"}
}

export {createAsset}