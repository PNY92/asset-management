"use client"

import DatePicker from "@/components/custom/datePicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

type item = {
    asset_tag: string,
    model: string,
    category: string,
}

function BookingPage() {
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    const [availableItems, setAvailableItems] = useState();
    const supabase = createClient();

    async function handleOnSearch() {

        // Searching for conflicts
        const conflictsData = await supabase.from("BookingRecord")
            .select()
            .lte('start_date', date?.to?.toISOString().slice(0, 10))  // end_date >= startDate
            .gte('end_date', date?.from?.toISOString().slice(0, 10))  // start_date <= endDate

        const conflictingAssetIds = conflictsData.data?.map(record => record.asset_id) || [];

        const availableAssets = await supabase.from("Asset")
            .select()
            .not('id', 'in', `(${conflictingAssetIds.join(',')})`);

        if (conflictsData.error) {
            console.log('www')
        }
        console.log(availableAssets.data);
    }

    return (
        <>
            <div className="flex gap-3">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="date-picker" className="px-1">
                        Scheduled Date
                    </Label>
                    <div className="flex item-center">
                        <DatePicker date={date} setDate={setDate}></DatePicker>
                        <Button onClick={handleOnSearch} variant="outline" disabled={date === undefined} className="ml-2">
                            <SearchIcon></SearchIcon>
                            <span>Search</span>
                        </Button>
                    </div>

                </div>
            </div>
            <div className="flex mt-8">
                <div className="flex flex-col gap-3">
                    <Label className="px-1">
                        Item Table
                    </Label>


                </div>
            </div>


        </>
    );
}

export default BookingPage