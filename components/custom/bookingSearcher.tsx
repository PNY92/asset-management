"use client"

import { searchBooking, submitBooking } from "@/src/app/actions/booking";
import DatePicker from "@/components/custom/datePicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, Row, RowModel, useReactTable } from "@tanstack/react-table";
import { Loader, SearchIcon, SearchXIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

type itemType = {
    id: string,
    asset_tag: string,
    model: string,
    category: string,
    display_name: string
}

const columnDefs: ColumnDef<itemType>[] = [
    {
        id: "select",
        header: ({ table }) =>
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ,
        cell: ({ row }) => (
            <Checkbox
                key={row.id}
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "asset_tag",
        header: "Asset Tag",
        cell: row => row.getValue()
    },
    {
        accessorKey: "display_name",
        header: "Display Name",
        cell: row => row.getValue()
    },
    {
        accessorKey: "model",
        header: "Model",
        cell: row => row.getValue()
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: row => row.getValue()
    }
]

function BookingForm({ getItems, getDateRange }: { getItems: () => itemType[], getDateRange: () => DateRange | undefined }) {

    async function handleOnBookingFormSubmitted(formData: FormData) {


        const items: itemType[] = getItems();

        const date: DateRange | undefined = getDateRange();

        const { error, success } = await submitBooking({
            items: items,
            date: date,
            event_form: formData
        });

        if (success) {
            toast.success("Success",
                { description: success }
            )
        }

        if (error) {
            toast.error("Error",
                { description: error }
            )
        }


    }

    return (
        <div>
            <form action={handleOnBookingFormSubmitted} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <Label className="text-md">
                        Booking Details
                    </Label>
                    <div className="text-sm text-muted-foreground">
                        Specify the needs of booking items.
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Label>
                        Event Name
                    </Label>
                    <Input type="text" name="name" className="w-sm">
                    </Input>
                </div>

                <div className="flex flex-col gap-3">
                    <Label>
                        Event Description
                    </Label>
                    <Textarea name="description">
                    </Textarea>
                </div>

                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>

        </div>

    )
}

function BookingItemsDisplay({ selectedItems }: { selectedItems: itemType[] }) {
    return (
        <>
            <div className="flex flex-col gap-1">
                <Label className="text-md">Selected Items</Label>
                <div className="text-muted-foreground text-sm">Selected items from the table will be summarized below for user double-checking purpose.</div>
            </div>
            <div className="mt-4">
                <Card>
                    <CardContent>
                        {(selectedItems.length > 0) ?

                            <ul className="flex gap-2">
                                {selectedItems?.map((item: itemType) => (
                                    <Badge key={item.asset_tag}>{item.display_name} ({item.asset_tag})</Badge>
                                ))}
                            </ul>

                            :
                            <div className="text-sm">
                                No selected item
                            </div>

                        }
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

function BookingList({ items, loading }: { items: itemType[], loading: boolean }) {

    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: items,
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        enableRowSelection: true,
        getRowId: (row) => row.id,
        state: {
            rowSelection,


        }
    })


    return (
        <div>
            <div className="flex flex-col gap-1">
                <Label className="text-md">
                    Item Table
                </Label>
                <div className="text-muted-foreground text-sm">
                    Table will be listed out after date is selected
                </div>
            </div>
            <Input
                placeholder="Filter asset tag..."
                value={(table.getColumn("asset_tag")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("asset_tag")?.setFilterValue(event.target.value)
                }
                className="max-w-3xs mt-4"
            />
            <div className="mt-2 border rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((group) => (
                            <TableRow key={group.id}>
                                {group.headers.map((header) => (
                                    <TableHead key={header.id}>{
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }</TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length && !loading ?
                            table.getRowModel().rows.map((row) =>
                            (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) =>
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )

                            )
                            : (loading) ? <TableRow>
                                <TableCell colSpan={table.getAllColumns()?.length} className="h-30 text-center">
                                    <div>
                                        <div className="flex justify-self-center rounded-md border p-2 mb-1">
                                            <Loader></Loader>
                                        </div>
                                        Loading
                                    </div>
                                </TableCell>
                            </TableRow>
                                :
                                (
                                    <TableRow>
                                        <TableCell
                                            colSpan={table.getAllColumns()?.length}
                                            className="h-30 text-center"
                                        >
                                            <div>
                                                <div className="flex justify-self-center rounded-md border p-2 mb-1">
                                                    <SearchXIcon></SearchXIcon>
                                                </div>
                                                No result found
                                            </div>

                                        </TableCell>
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center px-1 py-2">
                <div className="text-muted-foreground flex 1 text-xs">
                    {table.getFilteredSelectedRowModel().rows.length} of {" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected
                </div>
            </div>
            <div className="mt-15">
                <BookingItemsDisplay selectedItems={table.getSelectedRowModel().rows.map(row => row.original)}></BookingItemsDisplay>
            </div>

        </div>
    )
}

function BookingDatePicker({ callback }: { callback: (date: DateRange | undefined) => void }) {
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    return (
        <>
            <div className="flex gap-3">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="date-picker" className="text-md px-1">
                        Scheduled Date
                    </Label>
                    <div className="flex item-center">
                        <DatePicker date={date} setDate={setDate}></DatePicker>
                        <Button onClick={() => { callback(date) }} variant="outline" disabled={date === undefined} className="ml-2">
                            <SearchIcon></SearchIcon>
                            <span>Search</span>
                        </Button>
                    </div>

                </div>
            </div>
        </>
    )
}


function BookingSearcher() {

    const [items, setItems] = useState<itemType[]>([]);
    const [date, setDate] = useState<DateRange | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleOnClicked(date: DateRange | undefined) {
        setIsLoading(true);
        setItems(await searchBooking(date) as itemType[]);
        setDate(date);
        setIsLoading(false);
    }

    function getItems() {
        return items;
    }

    function getDateRange() {
        return date;
    }

    return (
        <>
            <div className="flex flex-col gap-y-15">

                <BookingDatePicker callback={handleOnClicked}></BookingDatePicker>
                <BookingList items={items} loading={isLoading}></BookingList>

                <BookingForm getItems={getItems} getDateRange={getDateRange}></BookingForm>

            </div>


        </>


    )
}

export { BookingSearcher }