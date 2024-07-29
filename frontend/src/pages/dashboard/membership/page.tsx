import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import useGet from '@/hooks/useGet';
import { getMembershipResponse } from './data';
import SearchBox from '@/components/SearchBox';
import CreateMembership from './create';
import Confirmation from '@/components/Confirmation';
import useDelete from '@/hooks/useDelete';
import { isAxiosError } from 'axios';
import usePost from '@/hooks/usePost';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

const MembershipPage = () => {
    const { data: membershipDatas, refresh } =
        useGet<getMembershipResponse>('memberships');
    const { remove, error: removeError, isLoading } = useDelete('memberships');
    const { post: setStatusMemership, error: publishError } = usePost(
        'memberships/publish'
    );

    const [deleteModalVisibility, setDeleteModalVisibility] =
        useState<boolean>(false);
    const [publishModalVisibility, setPublishModalVisibility] =
        useState<boolean>(false);
    const [createModalVisibility, setCreateModalVisibility] =
        useState<boolean>(false);

    const [selectedMember, setSelectedMember] = useState<{
        id: string;
        index: number;
    } | null>(null);
    const [filter, setFilter] = useState<string>('');

    const openCreateModal = () => setCreateModalVisibility(true);
    const closeCreateModal = () => setCreateModalVisibility(false);

    const openDeleteModal = (id: string, index: number) => {
        setSelectedMember({ id, index });
        setDeleteModalVisibility(true);
    };
    const closeDeleteModal = () => setDeleteModalVisibility(false);

    const openPublishModal = (id: string, index: number) => {
        setSelectedMember({ id, index });
        setPublishModalVisibility(true);
    };
    const closePublishModal = () => setPublishModalVisibility(false);

    const deleteHandler = () => {
        if (selectedMember) {
            remove(selectedMember.id)
                .then((response) => {
                    if (response.status === 204) {
                        refresh();
                        closeDeleteModal();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    if (isAxiosError(err)) {
                        ///
                    }
                });
        }
    };

    const setStatusMemebershipHandler = (id: string) => {
        setStatusMemership(null, id)
            .then((response) => {
                if (response.status === 200) {
                    refresh();
                }
            })
            .catch((err) => {
                console.error(err);
                if (isAxiosError(err)) {
                }
            });
    };

    return (
        <div>
            <h2 className="text-4xl font-bold text-black mb-8">Membership</h2>
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
                            className="px-4 py-2 bg-slate-950 text-white text-sm font-semibold rounded flex flex-row gap-1 justify-center ms-auto items-center"
                            onClick={openCreateModal}
                        >
                            <span>Create</span>
                        </button>
                    </div>
                    <DataTable
                        data={
                            membershipDatas
                                ? membershipDatas.data.filter((x) =>
                                      x.name
                                          .toLowerCase()
                                          .startsWith(filter.toLowerCase())
                                  )
                                : []
                        }
                        columns={columns}
                    />
                </div>
            </div>
            <CreateMembership
                onClose={closeCreateModal}
                visible={createModalVisibility}
            />
            <Confirmation
                Icon={TrashIcon}
                header="Delete confirmation"
                body="Do you want to delete this membership?"
                onClose={closeDeleteModal}
                onYes={deleteHandler}
                visible={deleteModalVisibility}
            />
        </div>
    );
};

export default MembershipPage;
