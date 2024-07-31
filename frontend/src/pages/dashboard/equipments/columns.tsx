import { ColumnDef } from '@tanstack/react-table';

import { Equipment } from './data';
import { FileIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    deleteMethod: (id: string, index: number) => void;
    updateMethod: (id: string, index: number) => void;
}

export const columnsInit = ({ deleteMethod, updateMethod }: Props) => {
    const columns: ColumnDef<Equipment>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => {
                return (
                    <div className="flex flex-row items-center gap-4">
                        <img
                            src={'http://localhost:5000/' + row.original.image}
                            alt="equimentimage"
                            width="100px"
                            className="bg-slate-100 border rounded-md h-[60px]"
                            style={{ objectFit: 'cover' }}
                        />
                        <span>{row.getValue('name')}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'qty',
            header: 'Qty',
        },
        {
            id: 'action',
            header: 'Action',
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className="flex flex-row">
                        <Button
                            className="p-0 w-[40px] me-2"
                            onClick={() => updateMethod(data._id, row.index)}
                        >
                            <FileIcon size={18} />
                        </Button>
                        <Button
                            className="p-0 w-[40px]"
                            onClick={() => {
                                deleteMethod(data._id, row.index);
                            }}
                        >
                            <TrashIcon className="text-white" size={18} />
                        </Button>
                    </div>
                );
            },
        },
    ];
    return columns;
};
