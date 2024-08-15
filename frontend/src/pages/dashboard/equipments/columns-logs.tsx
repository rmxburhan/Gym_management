import { ColumnDef } from '@tanstack/react-table';
import { EquipmentLog } from './data';

export const columns: ColumnDef<EquipmentLog>[] = [
    {
        header: 'Description',
        accessorKey: 'description',
    },
    {
        header: 'Category',
        accessorKey: 'category',
        cell: ({ row }) => {
            return <div className="capitalize">{row.original.category}</div>;
        },
    },
    {
        header: 'Admin name logger',
        cell: ({ row }) => {
            const data = row.original;
            return <div>{data.admin.name}</div>;
        },
    },
    {
        header: 'Timestamps',
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {new Date(data.createdAt).toLocaleString('id-ID', {
                        timeZone: 'Asia/Jakarta',
                    })}
                </div>
            );
        },
    },
];
