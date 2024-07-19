import { FileQuestionIcon, PencilIcon, Trash } from 'lucide-react';
import StatusChips, { StatusChipType } from '../../../components/StatusChips';
import Name from '../../../components/Name';
import useGet from '@/hooks/useGet';
import { getMembersResponseData } from './data';
import SearchBox from '@/components/SearchBox';
import { useState } from 'react';
import CreateMember from './create';
import Confirmation from '@/components/Confirmation';
import useDelete from '@/hooks/useDelete';

const MemberPage = () => {
    const { data, refresh } = useGet<getMembersResponseData>('members');

    const [filter, setFilter] = useState('');
    const [createModalVisible, setCreateModal] = useState<boolean>(false);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
        useState<boolean>(false);
    const [selectedMember, setSelectedMember] = useState<{
        memberId: string;
        index: number;
    } | null>(null);

    const closeCreateModal = () => setCreateModal(false);
    const openCreateModal = () => setCreateModal(true);

    const { remove, error, isLoading } = useDelete('members');

    const openConfirmationModal = (id: string, index: number) => {
        setSelectedMember({ memberId: id, index });
        setDeleteConfirmationVisible(true);
    };
    const closeConfirmationModal = () => setDeleteConfirmationVisible(false);

    const deleteHandler = () => {
        try {
            remove(selectedMember?.memberId || '').then((response) => {
                if (response.status === 204) {
                    closeCreateModal();
                    refresh();
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

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
                            className="px-4 py-2 bg-blue-500 text-white rounded flex flex-row gap-1 justify-center ms-auto items-center"
                            onClick={openCreateModal}
                        >
                            Create
                        </button>
                    </div>

                    {error ? (
                        <div className="bg-red-500 rounded-t p-4 text-sm text-white transition-all duration-200">
                            {error}
                        </div>
                    ) : (
                        ''
                    )}

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
                                .map((x, index) => {
                                    console.log(x);
                                    return (
                                        <tr>
                                            <td>{index + 1}.</td>
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
                                                {x.membershipDetail.length !==
                                                0 ? (
                                                    <StatusChips
                                                        status="active"
                                                        type={
                                                            StatusChipType.success
                                                        }
                                                    />
                                                ) : (
                                                    <StatusChips
                                                        status="inactive"
                                                        type={
                                                            StatusChipType.warning
                                                        }
                                                    />
                                                )}
                                            </td>
                                            <td className="flex flex-row gap-2">
                                                <button className="p-2 bg-indigo-100 text-indigo-500 rounded">
                                                    <PencilIcon size={20} />
                                                </button>

                                                <button
                                                    className="p-2 bg-indigo-500 text-indigo-100 rounded"
                                                    onClick={() => {
                                                        openConfirmationModal(
                                                            x._id,
                                                            index
                                                        );
                                                    }}
                                                >
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
            <Confirmation
                onYes={deleteHandler}
                onClose={closeConfirmationModal}
                Icon={FileQuestionIcon}
                body="Do you want to delete this member?"
                header="Delete confirmation"
                visible={deleteConfirmationVisible}
            />
        </div>
    );
};

export default MemberPage;
