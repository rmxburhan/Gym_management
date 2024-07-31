import { ColumnDef } from '@tanstack/react-table';
import { Class } from '../classes/data';

export const columns: ColumnDef<Class>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        header: 'Date',
        cell: ({ row }) => {
            const data = row.original;
            return <div>{new Date(data.date).toLocaleDateString()}</div>;
        },
    },
];
