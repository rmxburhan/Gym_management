import { ColumnDef } from '@tanstack/react-table';

import { Member } from './data';
import StatusMembership from '@/components/StatusMembership';

export const columsn: ColumnDef<Member>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'email',
    },
    {
        header: 'Gender',
        cell: ({ row }) => {
            const gender = row.original.memberDetail?.gender;
            return <span>{gender ? gender : '-'}</span>;
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Join date',
    },
    {
        header: 'Join membership date',
        cell: ({ row }) => {
            const registerDate =
                row.original.memberDetail?.membership?.registerDate;
            return (
                <span>
                    {registerDate
                        ? new Date(registerDate).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                          })
                        : '-'}
                </span>
            );
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
                        ? new Date(expiresDate).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                          })
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
];
