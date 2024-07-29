import { ColumnDef } from '@tanstack/react-table';

import { Class } from './data';
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
        accessorKey: 'maxParticipant',
        header: 'Max Participant',
    },
    {
        id: 'trainerDetail',
        header: 'Trianer',
        cell: ({ row }) => {
            const trainer = row.original.trainer;
            return <span>{trainer.name}</span>;
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const id = row.original;
        },
    },
];
