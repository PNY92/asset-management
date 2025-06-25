import { Dispatch, SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

function DatePicker({date, setDate} : {date: DateRange | undefined, setDate: Dispatch<SetStateAction<DateRange | undefined>>}) {
    const [open, setOpen] = useState(false);
    
    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date-picker"
                        className="w-50 justify-between font-normal"
                    >
                        {date ? `${date.from?.toLocaleDateString()} - ${date.to?.toLocaleDateString()}` : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="range"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={
                            (date) => {
                                setDate(date)
                            }
                        }
                    >

                    </Calendar>
                </PopoverContent>
            </Popover>

        </>
    );
}
export default DatePicker;