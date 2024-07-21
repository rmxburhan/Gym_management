import { ColumnDef } from '@tanstack/react-table';

import { classData } from './data';
export const columns: ColumnDef<classData>[] = [
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
            const trainer = row.original.trainerDetails[0];

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
