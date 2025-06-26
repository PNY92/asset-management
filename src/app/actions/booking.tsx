"use server"
import { createClient } from "@/lib/supabase/server";
import { DateRange } from "react-day-picker";


async function searchBooking(date: DateRange | undefined) {
    const supabase = await createClient();
    const conflictsData = await supabase.from("BookingRecord")
        .select()
        .lte('start_date', date?.to?.toISOString().slice(0, 10))  // end_date >= startDate
        .gte('end_date', date?.from?.toISOString().slice(0, 10))  // start_date <= endDate

    const conflictingAssetIds = conflictsData.data?.map(record => record.asset_id) || [];

    const availableAssets = await supabase.from("Asset")
        .select()
        .not('id', 'in', `(${conflictingAssetIds.join(',')})`);

    if (availableAssets.error) {
        console.error(availableAssets.error)
    }

    return availableAssets.data;
}

export { searchBooking }