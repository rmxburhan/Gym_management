import { ColumnDef } from '@tanstack/react-table';
import { Membership } from './data';
import { Button } from '@/components/ui/button';
import {
    DownloadCloudIcon,
    FileIcon,
    TrashIcon,
    UploadCloudIcon,
} from 'lucide-react';

interface Props {
    publishHandler: (id: string, index: number) => void;
    deleteHandler: (id: string, index: number) => void;
    updateHandler: (id: string, index: number) => void;
}

export const columnsInit = ({
    publishHandler,
    deleteHandler,
    updateHandler,
}: Props) => {
    const columns: ColumnDef<Membership>[] = [
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
                return (
                    <div className="text-right font-medium">{formatted}</div>
                );
            },
        },
        {
            accessorKey: 'discountPrice',
            header: 'Discounted Price',
            cell: ({ row }) => {
                const discountedPrice = parseFloat(
                    row.getValue('discountPrice')
                );
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
                return (
                    <div className="flex flex-row">
                        <Button
                            className="p-0 w-[40px] me-2"
                            onClick={() =>
                                updateHandler(row.original._id, row.index)
                            }
                        >
                            <FileIcon size={18} />
                        </Button>
                        <Button
                            className="p-0 w-[40px] me-2"
                            onClick={() =>
                                deleteHandler(row.original._id, row.index)
                            }
                        >
                            <TrashIcon size={18} />
                        </Button>
                        {!published ? (
                            <Button
                                className="bg-green-600 border text-white font-medium p-0 w-[40px] hover:bg-green-500"
                                onClick={() =>
                                    publishHandler(row.original._id, row.index)
                                }
                            >
                                <UploadCloudIcon size={18} />
                            </Button>
                        ) : (
                            <Button
                                className="rounded bg-red-500 hover:bg-red-500 border text-white  font-medium p-0 w-[40px]"
                                onClick={() => {
                                    publishHandler(row.original._id, row.index);
                                }}
                            >
                                <DownloadCloudIcon size={18} />
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];
    return columns;
};
