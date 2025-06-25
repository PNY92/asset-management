"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CellContext, ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CircleCheck, Hand } from "lucide-react";
import { useState } from "react";

const STATUS_READY = {
    id: 1,
    icon: CircleCheck,
    name: "Ready to Deploy"
}
const STATUS_DEPLOYED = {
    id: 2,
    icon: Hand,
    name: "Deployed"
}



type Asset = {
    assetTag: string,
    model: string,
    category: string,
    status: { id: number, name: string }
}
const dummyData = [
    {
        assetTag: "ITSM-1000",
        model: "Lenovo",
        category: "Laptop",
        status: STATUS_READY
    },
    {
        assetTag: "ITSM-1001",
        model: "Lenovo",
        category: "Laptop",
        status: STATUS_DEPLOYED
    }
]


const defaultColumns: ColumnDef<Asset>[] = [
    {
        accessorKey: "assetTag",
        header: "Asset Tag",
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
            const value : any = row.getValue(); return (
                <Badge variant="outline">
                    <value.icon></value.icon>
                    <span>{value.name}</span>

                </Badge>)
        }
    },
    {
        header: "Actions",
        cell: () => (
            <Button>Edit</Button>

        )

    }

]
function InventoryList() {
    const [data] = useState<Asset[]>([...dummyData])



    const table = useReactTable({ data, columns: defaultColumns, getCoreRowModel: getCoreRowModel() } as any)

    return (
        <>
        <div className="flex mb-4">
            <Input className="max-w-3xs" type="text" placeholder="Filter task..."/>

        </div>
        
        
        <div className="rounded-md border">
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


function InventoryPage() {
    return (
        <InventoryList>
        </InventoryList>
    );
}

export default InventoryPage;