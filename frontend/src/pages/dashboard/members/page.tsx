import { PencilIcon, Trash } from 'lucide-react';
import StatusChips from '../../../components/StatusChips';
import Name from '../../../components/Name';
import useGet from '@/hooks/useGet';
import { getMembersResponseData } from './data';
import SearchBox from '@/components/SearchBox';
import { useState } from 'react';
import CreateMember from './create';

const MemberPage = () => {
    const { data } = useGet<getMembersResponseData>('members');
    const [filter, setFilter] = useState('');

    const [createModalVisible, setCreateModal] = useState<boolean>(false);
    const closeCreateModal = () => setCreateModal(false);
    const openCreateModal = () => setCreateModal(true);

    return (
        <div>
            <h1 className="text-4xl font-semibold mb-8">Member</h1>
            <div className="flex flex-col">
                <div
                    id="table-container"
                    className="border w-full px-6 py-8 rounded-3xl bg-white"
                >
                    <div className="flex flex-row mb-4">
                        <SearchBox
                            onSearch={(name: string) => {
                                setFilter(name);
                            }}
                        />
                        <button
                            className="px-[18px] py-[12px] bg-indigo-800 text-white rounded flex flex-row gap-1 justify-center ms-auto items-center"
                            onClick={openCreateModal}
                        >
                            Create
                        </button>
                    </div>

                    <table className="table-auto w-full">
                        <thead className="bg-indigo-100 text-black">
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Join date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.members
                                .filter((x) => {
                                    return x.name
                                        .toLowerCase()
                                        .startsWith(filter.toLowerCase());
                                })
                                .map((x) => {
                                    return (
                                        <tr>
                                            <td>1.</td>
                                            <td>
                                                <Name
                                                    name={x.name}
                                                    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQae9FkVDq-pht9_nec324ZbRxcuV7juKPPvA&s"
                                                />
                                            </td>
                                            <td>{x.email}</td>
                                            <td>{x.gender}</td>
                                            <td>
                                                {new Date(
                                                    x.dateOfBirth
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <StatusChips status="active" />
                                            </td>
                                            <td className="flex flex-row gap-2">
                                                <button className="p-2 bg-indigo-100 text-indigo-500 rounded">
                                                    <PencilIcon size={20} />
                                                </button>

                                                <button className="p-2 bg-indigo-500 text-indigo-100 rounded">
                                                    <Trash size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
            <CreateMember
                visible={createModalVisible}
                onClose={closeCreateModal}
            />
        </div>
    );
};

export default MemberPage;
