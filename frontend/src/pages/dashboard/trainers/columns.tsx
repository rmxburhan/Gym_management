import { ColumnDef } from '@tanstack/react-table';
import { Trainer } from './data';
import Avatar from '@/assets/images/avatar.png';
export const columns: ColumnDef<Trainer>[] = [
    {
        header: 'Name',
        cell: ({ row }) => {
            const trainer = row.original;
            return (
                <div className="flex flex-row items-center gap-2">
                    <img
                        src={Avatar}
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
        header: 'Join date',
    },
    {
        header: 'Join date',
    },
];
