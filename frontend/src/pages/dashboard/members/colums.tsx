import { ColumnDef } from '@tanstack/react-table';

import { Member } from './data';
import StatusMembership from '@/components/StatusMembership';
import { Button } from '@/components/ui/button';
import { FileIcon, TrashIcon } from 'lucide-react';

interface Props {
    deleteHandler: (id: string, index: number) => void;
    updateHandler: (id: string, index: number) => void;
}

export const columnsInit = ({ deleteHandler, updateHandler }: Props) => {
    const columns: ColumnDef<Member>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className="flex flex-row items-center gap-2">
                        <img
                            src={'http://localhost:5000/' + data.profile}
                            alt="avatar.png"
                            className="w-[35px] h-[35px] rounded-full border"
                        />
                        <span>{data.name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            header: 'Gender',
            cell: ({ row }) => {
                const gender = row.original.memberDetail?.gender;
                return (
                    <span className="capitalize">{gender ? gender : '-'}</span>
                );
            },
        },
        {
            header: 'Account registered',
            cell: ({ row }) => {
                const data = row.original;
                const formattedDate = new Date(
                    data.createdAt
                ).toLocaleDateString('id-ID', {
                    dateStyle: 'long',
                });
                return <div>{formattedDate}</div>;
            },
        },
        {
            header: 'Join membership date',
            cell: ({ row }) => {
                const data = row.original;
                const formattedDate = data.memberDetail?.membership
                    ? new Date(
                          data.memberDetail?.membership?.registerDate
                      ).toLocaleDateString('id-ID', {
                          dateStyle: 'long',
                      })
                    : '-';
                return <div>{formattedDate}</div>;
            },
        },
        {
            header: 'Expires date',
            cell: ({ row }) => {
                const expiresDate =
                    row.original.memberDetail?.membership?.expiresDate;
                return (
                    <span>
                        {expiresDate
                            ? new Date(expiresDate).toLocaleDateString(
                                  'id-ID',
                                  {
                                      day: '2-digit',
                                      month: 'long',
                                      year: 'numeric',
                                  }
                              )
                            : '-'}
                    </span>
                );
            },
        },
        {
            // accessorKey: 'memberDetail.membership.status',
            header: 'Status Membership',
            cell: ({ row }) => {
                let status = '';
                if (
                    !row.original.memberDetail ||
                    !row.original.memberDetail.membership
                ) {
                    status = 'Nonactive';
                } else if (!row.original.memberDetail.membership.status) {
                    status = 'Expired';
                } else if (row.original.memberDetail.membership.status) {
                    status = 'Active';
                }
                return <StatusMembership text={status} />;
            },
        },
        {
            header: 'Action',
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className="flex flex-row">
                        <Button
                            className="p-0 me-2"
                            onClick={() => updateHandler(data.id, row.index)}
                        >
                            <FileIcon size={18} className="m-2" />
                        </Button>
                        <Button
                            className="p-0"
                            onClick={() => deleteHandler(data.id, row.index)}
                        >
                            <TrashIcon size={18} className="m-2" />
                        </Button>
                    </div>
                );
            },
        },
    ];
    return columns;
};
