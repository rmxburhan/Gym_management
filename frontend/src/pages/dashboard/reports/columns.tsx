import { ColumnDef } from '@tanstack/react-table';
import { reportData } from './data';
export const columns: ColumnDef<reportData>[] = [
    {
        header: 'Date',
        accessorKey: 'createdAt',
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="font-medium">
                    {new Date(data.createdAt).toLocaleDateString('id-ID', {
                        dateStyle: 'full',
                    })}
                </div>
            );
        },
    },
    {
        header: 'Member',
        accessorKey: 'member.name',
    },
    {
        header: 'Memberships',
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {data.membership.name} {data.membership.duration} day
                </div>
            );
        },
    },
    {
        header: 'Total',
        accessorKey: 'totalPayment',
        cell: ({ row }) => {
            const data = row.original;
            const formatted = Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(data.totalPayment);
            return (
                <div className="font-medium text-end font-semibold">
                    {formatted}
                </div>
            );
        },
    },
];
