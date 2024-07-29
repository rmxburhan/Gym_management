import { ColumnDef } from '@tanstack/react-table';
import { Membership } from './data';

export const columns: ColumnDef<Membership>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'duration',
        header: 'Duration (day)',
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'));
            const formatted = Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(price);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'discountPrice',
        header: 'Discounted Price',
        cell: ({ row }) => {
            const discountedPrice = parseFloat(row.getValue('discountPrice'));
            const formatted = Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(discountedPrice);
            return discountedPrice ? (
                <div className="text-right font-medium">{formatted}</div>
            ) : (
                <div className="text-right font-medium">Rp. -</div>
            );
        },
    },
    {
        accessorKey: 'published',
        cell: ({ row }) => {
            const published = row.original.published;
            return <span>{published ? 'Public' : 'Unpublished'}</span>;
        },
        header: 'Status',
    },
    {
        id: 'action',
        header: 'Action',
        cell: ({ row }) => {
            const published = row.original.published;
            return published ? (
                <button className="rounded text-green-500 border border-green-500 font-medium">
                    Pubilsh
                </button>
            ) : (
                <button className="rounded text-red-500 border border-red-500  font-medium">
                    Unpublish
                </button>
            );
        },
    },
];
