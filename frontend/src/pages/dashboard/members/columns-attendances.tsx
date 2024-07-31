import { ColumnDef } from '@tanstack/react-table';
import { Attendances } from '../attendances/data';

export const columns: ColumnDef<Attendances>[] = [
    {
        header: 'Date',
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="font-medium">
                    {new Date(data.checkInTime).toLocaleDateString()}
                </div>
            );
        },
    },
    {
        header: 'Check In (HH:mm)',
        cell: ({ row }) => {
            const data = row.original;
            return <div>{new Date(data.checkInTime).toLocaleTimeString()}</div>;
        },
    },
    {
        header: 'Check Out (HH:mm)',
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div>
                    {data.checkOutTime
                        ? new Date(data.checkOutTime).toLocaleTimeString()
                        : '-'}
                </div>
            );
        },
    },
];
