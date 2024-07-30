import { useParams } from 'react-router';
import MemberForm from './form';
import { useEffect, useState } from 'react';
import { Member, getMemberResponseData } from './data';
import { api } from '@/network/api';
import { isAxiosError } from 'axios';
import { Attendances, getAttendances } from '../attendances/data';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns-attendances';

const CreateMember = () => {
    const { id } = useParams();
    const [member, setMember] = useState<Member | null>(null);
    const [attendances, setAttendances] = useState<Attendances[]>([]);
    const [error, setError] = useState<string | null>(null);
    const getMember = () => {
        api.get('members/' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    const data: getMemberResponseData = response.data;
                    setMember(data.data);
                } else {
                    setError('Error loading member');
                }
            })
            .catch((err) => {
                if (isAxiosError(err)) {
                    setError(
                        err.response?.data.message || err.response?.data.errors
                    );
                }
            });
    };
    const getAttendances = () => {
        api.get('attendances/?memberId=' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    const data: getAttendances = response.data;
                    setAttendances(data.data);
                } else {
                    setError('Error loading member attendances');
                }
            })
            .catch((err) => {
                if (isAxiosError(err)) {
                    setError(
                        err.response?.data.message || err.response?.data.errors
                    );
                }
            });
    };

    useEffect(() => {
        if (id) {
            console.log(id);
            getMember();
        }
    }, [id]);

    useEffect(() => {
        if (member) {
            getAttendances();
        }
    }, [member]);

    return (
        <div className="px-4 text-sm">
            <h2 className="text-2xl font-bold mb-4">
                {id ? 'Member Detail' : 'Add Member'}
            </h2>
            {error && (
                <p className="bg-red-600 p-2 text-center text-white text-xs">
                    {error}
                </p>
            )}
            <div className="flex flex-row gap-4">
                <div className="max-w-[600px] ">
                    <MemberForm member={member} />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <div className="bg-white rounded-xl border px-4 py-6">
                        <DataTable columns={columns} data={attendances} />
                    </div>
                    <div className="bg-white rounded-xl border px-4 py-6"></div>
                </div>
            </div>
        </div>
    );
};

export default CreateMember;
