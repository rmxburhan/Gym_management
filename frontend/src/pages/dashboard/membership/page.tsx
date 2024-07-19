import { Download, PencilIcon, Trash, TrashIcon, Upload } from 'lucide-react';
import { useState } from 'react';
import useGet from '@/hooks/useGet';
import { Membership, getMembershipResponse } from './data';
import SearchBox from '@/components/SearchBox';
import CreateMembership from './create';
import Confirmation from '@/components/Confirmation';
import useDelete from '@/hooks/useDelete';
import { isAxiosError } from 'axios';
import usePost from '@/hooks/usePost';

const MembershipPage = () => {
    const { data, refresh } = useGet<getMembershipResponse>('memberships');
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
                            className="px-4 py-2 bg-blue-500 text-white rounded flex flex-row gap-1 justify-center ms-auto items-center"
                            onClick={openCreateModal}
                        >
                            <span>Create</span>
                        </button>
                    </div>

                    <table className="table-auto w-full">
                        <thead className="bg-indigo-100 text-black">
                            <tr>
                                <th>Membership name</th>
                                <th>Description</th>
                                <th>Duration (Day)</th>
                                <th>Price (Rp.)</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.memberships
                                .filter((x) => {
                                    return x.name
                                        .toLocaleLowerCase()
                                        .startsWith(filter.toLocaleLowerCase());
                                })
                                .map((x: Membership, index) => {
                                    return (
                                        <tr>
                                            <td>{x.name}</td>
                                            <td>{x.description}</td>
                                            <td>{x.duration}</td>
                                            <td>{x.price}</td>
                                            <td>
                                                {x.published
                                                    ? 'published'
                                                    : 'unpublished'}
                                            </td>
                                            <td>
                                                <div className="flex flex-row gap-x-2 my-auto">
                                                    <button className="p-2 bg-indigo-100 text-indigo-500 rounded">
                                                        <PencilIcon size={20} />
                                                    </button>

                                                    <button
                                                        className="p-2 bg-indigo-500 text-indigo-100 rounded"
                                                        onClick={() => {
                                                            openDeleteModal(
                                                                x._id,
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        <Trash size={20} />
                                                    </button>
                                                    <button
                                                        className={`p-2 rounded ${
                                                            x.published
                                                                ? 'bg-red-500 text-white'
                                                                : 'bg-green-500 text-white'
                                                        }`}
                                                        onClick={() => {
                                                            setStatusMemebershipHandler(
                                                                x._id
                                                            );
                                                        }}
                                                    >
                                                        {x.published ? (
                                                            <Download
                                                                size={20}
                                                            />
                                                        ) : (
                                                            <Upload size={20} />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
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
