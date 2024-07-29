import { FileQuestionIcon } from 'lucide-react';
import SearchBox from '@/components/SearchBox';
import { useState } from 'react';
import CreateMember from './create';
import Confirmation from '@/components/Confirmation';
import useDelete from '@/hooks/useDelete';
import { DataTable } from '@/components/ui/data-table';
import { getMembersResponseData } from './data';
import useGet from '@/hooks/useGet';
import { columsn } from './colums';

const MemberPage = () => {
    const { data: membersData, isLoading } =
        useGet<getMembersResponseData>('members');

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

    const { remove, error } = useDelete('members');

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
                    // refresh();
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
                            className="px-3 py-2 bg-slate-950 text-white rounded flex flex-row gap-1 justify-center ms-auto items-center"
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

                    {!isLoading && (
                        <DataTable
                            data={
                                membersData?.data.filter((x) =>
                                    x.name.toLowerCase().startsWith(filter)
                                ) || []
                            }
                            columns={columsn}
                        />
                    )}
                    {isLoading && <p className="text-center">Loading...</p>}
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
