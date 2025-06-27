"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CellContext, ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CircleCheck, Ellipsis, Hand, PackagePlus, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { fetchInventoryItems } from "@/src/app/actions/inventory";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";


const StatusList = {
    STATUS_READY: {
        icon: CircleCheck,
        name: "Ready to Deploy"
    },
    STATUS_DEPLOYED: {
        icon: Hand,
        name: "Deployed"
    }
} as const;


enum status {
    STATUS_READY = "STATUS_READY",
    STATUS_DEPLOYED = "STATUS_DEPLOYED"
}

type Asset = {
    id: string,
    asset_tag: string,
    model: string,
    category: string,
    status: status,
    display_name: string,
    organization_id: string
}


const defaultColumns: ColumnDef<Asset>[] = [
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
    },
    
    {
        accessorKey: "status",
        header: "Status",
        cell: (row: CellContext<Asset, unknown>) => {
            const value: status = row.getValue() as status;
            const statusData = StatusList[value]
            return (
                <Badge variant="outline">
                    <statusData.icon></statusData.icon>
                    <span>{StatusList[value].name}</span>

                </Badge>)
        }
    },
    {
        header: "Actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <Ellipsis></Ellipsis>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="right">
                    <DropdownMenuItem>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Delete
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>


        )

    }

]
function InventoryList() {
    const [fetchedItems, setFetchedItems] = useState<Asset[]>([])

    useEffect(() => {

        async function fetchItems() {
            const items: {
                error?: string,
                data?: Asset[]
            } = await fetchInventoryItems();

            if (items.error) {
                toast.error("Error fetching items",
                    { description: items.error }
                )
            }


            setFetchedItems(items.data!);
        }

        fetchItems();
    }, [])

    const table = useReactTable({
        data: fetchedItems,
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel()
    } as any)

    return (
        <>
            <div className="flex flex-col gap-1">
                <Label className="text-md">
                    Inventory List
                </Label>
                <div className="text-muted-foreground text-sm">
                    A list for managing inventory purposes
                </div>
            </div>
            <div className="flex mt-8 justify-between items-center">
                <div>
                    <Input className="max-w-3xs" type="text" placeholder="Filter task..." />
                </div>
                <div className="flex flex-row items-center gap-2 mr-2">
                    <Button variant="secondary">
                        <RefreshCw></RefreshCw>
                        Refresh
                    </Button>
                    <Link href="/inventory/create">
                        <Button>
                            <PackagePlus></PackagePlus>
                            <span>
                                Create Asset
                            </span>
                        </Button>
                    </Link>

                </div>

            </div>


            <div className="mt-4 rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export { InventoryList }