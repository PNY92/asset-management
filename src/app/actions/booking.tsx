"use server"
import { createClient } from "@/lib/supabase/server";
import { DateRange } from "react-day-picker";

type itemType = {
    id: string,
    asset_tag: string,
    model: string,
    category: string,
    display_name: string
}

type submitFormat = {
    items: itemType[],
    date: DateRange | undefined,
    event_form: FormData
}


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

async function submitBooking(submission: submitFormat) {

    const supabase = await createClient();

    const event_response = await supabase.from("Event").insert({
        name: submission.event_form.get("name"),
        description: submission.event_form.get("description"),
        organization_id: 1
    })

    if (event_response.error) {
        return { error: event_response.error.message }
    }


    if (submission.items.length > 0) {

        
        submission.items.forEach(async (item) => {
            const booking_response = await supabase.from("BookingRecord").insert({
                asset_id: item.id,
                end_date: submission.date?.to,
                start_date: submission.date?.from
            })

            if (booking_response.error) {
                return {error: booking_response.error.message}
            }
        })
    }


    return {success: "Successfully booked"}

}

export { searchBooking, submitBooking }