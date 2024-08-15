import { FileQuestionIcon } from 'lucide-react';
import SearchBox from '@/components/SearchBox';
import { useEffect, useState } from 'react';
import Confirmation from '@/components/Confirmation';
import useDelete from '@/hooks/useDelete';
import { DataTable } from '@/components/ui/data-table';
import { getMembersResponseData } from './data';
import useGet from '@/hooks/useGet';
import { columnsInit } from './colums';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import useHide from '@/context/SideBarState';

const MemberPage = () => {
    const {
        data: membersData,
        isLoading,
        refresh,
    } = useGet<getMembersResponseData>('members');
    const { remove, error } = useDelete('members');
    const navigate = useNavigate();
    const { setActiveSideBar } = useHide();
    const [filter, setFilter] = useState('');
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
        useState<boolean>(false);
    const [selectedMember, setSelectedMember] = useState<{
        memberId: string;
        index: number;
    } | null>(null);

    const openConfirmationModal = (id: string, index: number) => {
        setSelectedMember({ memberId: id, index });
        setDeleteConfirmationVisible(true);
    };
    const closeConfirmationModal = () => setDeleteConfirmationVisible(false);

    const deleteHandler = () => {
        try {
            remove(selectedMember?.memberId || '').then((response) => {
                if (response.status === 204) {
                    closeConfirmationModal();
                    refresh();
                    alert('Member deleted');
                } else {
                    alert('Failed to delete member');
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => setActiveSideBar('/dashboard/members'), []);
    return (
        <div className="px-4 pt-4">
            <h1 className="text-3xl font-semibold mb-4">Member</h1>
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
                        <Button
                            className="ms-auto"
                            onClick={() => navigate('create')}
                        >
                            Create
                        </Button>
                    </div>

                    {error ? (
                        <div className="bg-red-500 rounded-t p-2 text-xs text-white transition-all duration-200 rounded mb-2">
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
                            columns={columnsInit({
                                deleteHandler: openConfirmationModal,
                                updateHandler: (id: string) => navigate(id),
                            })}
                        />
                    )}
                    {isLoading && <p className="text-center">Loading...</p>}
                </div>
            </div>
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
