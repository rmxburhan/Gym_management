import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import useGet from '@/hooks/useGet';
import { getMembershipsResponse } from './data';
import SearchBox from '@/components/SearchBox';
import Confirmation from '@/components/Confirmation';
import useDelete from '@/hooks/useDelete';
import { isAxiosError } from 'axios';
import { DataTable } from '@/components/ui/data-table';
import { columnsInit } from './columns';
import { Button } from '@/components/ui/button';
import usePatch from '@/hooks/usePatch';
import { useNavigate } from 'react-router';
import useHide from '@/context/SideBarState';

const MembershipPage = () => {
    const { data: membershipDatas, refresh } =
        useGet<getMembershipsResponse>('memberships');
    const { remove } = useDelete('memberships');
    const { patch: setStatusMemership } = usePatch('memberships');
    const navigate = useNavigate();
    const { setActiveSideBar } = useHide();

    const [deleteModalVisibility, setDeleteModalVisibility] =
        useState<boolean>(false);
    const [publishModalVisibility, setPublishModalVisibility] =
        useState<boolean>(false);

    const [selectedMembership, setSelectedMembership] = useState<{
        id: string;
        index: number;
    } | null>(null);
    const [filter, setFilter] = useState<string>('');

    const openDeleteModal = (id: string, index: number) => {
        setSelectedMembership({ id, index });
        setDeleteModalVisibility(true);
    };
    const openPublishModal = (id: string, index: number) => {
        setSelectedMembership({ id, index });
        setPublishModalVisibility(true);
    };

    const closeDeleteModal = () => setDeleteModalVisibility(false);
    const closePublishModal = () => setPublishModalVisibility(false);

    const deleteHandler = () => {
        if (selectedMembership) {
            remove(selectedMembership.id)
                .then((response) => {
                    if (response.status === 204) {
                        refresh();
                        alert('Equipment Deleted');
                        closeDeleteModal();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    if (isAxiosError(err)) {
                    }
                });
        }
    };

    const setStatusMemebershipHandler = () => {
        if (selectedMembership) {
            setStatusMemership(null, `${selectedMembership?.id}/publish`)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        refresh();
                        alert('Status changed');
                        closePublishModal();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    if (isAxiosError(err)) {
                    }
                });
        }
    };

    useEffect(() => setActiveSideBar('/dashboard/memberships'), []);

    return (
        <div className="px-4 pt-4">
            <h2 className="text-3xl font-bold text-black mb-4">Membership</h2>
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
                            className="ms-auto items-center font-medium"
                            onClick={() => {
                                navigate('create');
                            }}
                        >
                            Create
                        </Button>
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
                        columns={columnsInit({
                            publishHandler: openPublishModal,
                            deleteHandler: openDeleteModal,
                            updateHandler: (id: string) => navigate(id),
                        })}
                    />
                </div>
            </div>
            <Confirmation
                Icon={TrashIcon}
                header="Delete confirmation"
                body="Do you want to delete this membership?"
                onClose={closeDeleteModal}
                onYes={deleteHandler}
                visible={deleteModalVisibility}
            />
            <Confirmation
                Icon={TrashIcon}
                header="Change status confirmation?"
                body="Do you want to change the status of this membership?"
                onClose={closePublishModal}
                onYes={setStatusMemebershipHandler}
                visible={publishModalVisibility}
            />
        </div>
    );
};

export default MembershipPage;
