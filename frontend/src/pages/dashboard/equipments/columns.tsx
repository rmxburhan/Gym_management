import { ColumnDef } from '@tanstack/react-table';

import { Equipment } from './data';
export const columns: ColumnDef<Equipment>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'qty',
        header: 'Qty',
    },
];
