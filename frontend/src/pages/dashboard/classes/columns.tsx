import { ColumnDef } from '@tanstack/react-table';

import { Class } from './data';
import { Button } from '@/components/ui/button';
import { FileIcon, TrashIcon } from 'lucide-react';

interface Props {
    deleteMethod: (id: string, index: number) => void;
    updateMethod: (id: string, index: number) => void;
}

export const columnsInit = ({ deleteMethod, updateMethod }: Props) => {
    const columns: ColumnDef<Class>[] = [
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
                const data = row.original;
                return (
                    <div className="flex flex-row">
                        <Button
                            className="w-[40px] p-0 me-2"
                            onClick={() => {
                                updateMethod(data._id, row.index);
                            }}
                        >
                            <FileIcon size={18} />
                        </Button>
                        <Button
                            onClick={() => {
                                deleteMethod(data._id, row.index);
                            }}
                            className="w-[40px] p-0"
                        >
                            <TrashIcon size={18} className="w-14 p-0" />
                        </Button>
                    </div>
                );
            },
        },
    ];
    return columns;
};
