import { ColumnDef } from '@tanstack/react-table';
import { Trainer } from './data';
import { Button } from '@/components/ui/button';
import { FileIcon, TrashIcon } from 'lucide-react';

interface Props {
    deleteHandler: (id: string, index: number) => void;
    updateHandler: (id: string, index: number) => void;
}

export const columnsInit = ({ deleteHandler, updateHandler }: Props) => {
    const columns: ColumnDef<Trainer>[] = [
        {
            header: 'Name',
            cell: ({ row }) => {
                const trainer = row.original;
                return (
                    <div className="flex flex-row items-center gap-2">
                        <img
                            src={'http://localhost:5000/' + trainer.profile}
                            alt="avatar.png"
                            className="w-[35px] h-[35px] rounded-full border"
                        />
                        <span className="text-sm">{trainer.name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            header: 'Registered date',
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className="">
                        {new Date(data.createdAt).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </div>
                );
            },
        },
        {
            header: 'Action',
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className="flex flex-row gap-1.5">
                        <Button
                            className="p-0 w-[40px]"
                            onClick={() => updateHandler(data._id, row.index)}
                        >
                            <FileIcon size={18} />
                        </Button>
                        <Button
                            className="p-0 w-[40px]"
                            onClick={() => deleteHandler(data._id, row.index)}
                        >
                            <TrashIcon size={18} />
                        </Button>
                    </div>
                );
            },
        },
    ];
    return columns;
};
