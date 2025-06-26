"use client"

import { searchBooking } from "@/src/app/actions/booking";
import DatePicker from "@/components/custom/datePicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, Row, RowModel, useReactTable } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

type itemType = {
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

function BookingItemsDisplay({selectedItems} : {selectedItems: itemType[]}) {
    return (
        <>
            <div className="mt-8 flex flex-col gap-1">
                <Label className="text-md">Selected Items</Label>
                <div className="text-muted-foreground text-sm">Selected items from the table will be listed out here for double-checking purpose.</div>
            </div>
            <div className="mt-4">
                <Card>
                    <CardContent>
                        {(selectedItems.length > 0) ?
                        selectedItems?.map((item: itemType) => (
                        <Badge key={item.asset_tag}>{item.display_name} ({item.asset_tag})</Badge>
                    ))
                    :
                    "No value"
                        }
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

function BookingList({ items }: { items: itemType[] }) {

    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: items,
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        enableRowSelection: true,
        getRowId: (row) => row.asset_tag,
        state: {
            rowSelection,


        }
    })


    return (
        <div className="mt-8">
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
                        {table.getRowModel().rows?.length ?
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
                            :
                            (
                                <TableRow>
                                    <TableCell
                                        colSpan={table.getAllColumns()?.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center px-1 py-2">
                <div className="text-muted-foreground flex 1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of {" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected
                </div>
            </div>
            <BookingItemsDisplay selectedItems={table.getSelectedRowModel().rows.map(row => row.original)}></BookingItemsDisplay>
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

    async function handleOnClicked(date: DateRange | undefined) {
        setItems(await searchBooking(date) as itemType[]);
    }

    return (
        <>
            <BookingDatePicker callback={handleOnClicked}></BookingDatePicker>
            <BookingList items={items}></BookingList>

        </>


    )
}

export { BookingSearcher }