import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { getTrainersResponse } from './data';
import SearchBox from '@/components/SearchBox';
import Confirmation from '@/components/Confirmation';
import { DataTable } from '@/components/ui/data-table';
import useGet from '@/hooks/useGet';
import { columnsInit } from './columns';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import useDelete from '@/hooks/useDelete';

const TrainerPage = () => {
    const { data, error, isLoading, refresh } =
        useGet<getTrainersResponse>('trainers');
    const { remove, error: errorDeleteTrainer } = useDelete('trainers');
    const navigate = useNavigate();

    const [filter, setFilter] = useState<string>('');
    const [deleteModalVisibility, setDeleteModalVisibility] =
        useState<boolean>(false);
    const [selectedMember, setSelectedMember] = useState<{
        id: string;
        index: number;
    } | null>(null);

    const openDeleteModal = (id: string, index: number) => {
        setSelectedMember({ id, index });
        setDeleteModalVisibility(true);
    };
    const cloesDeleteModal = () => setDeleteModalVisibility(false);

    const deleteHandler = () => {
        if (selectedMember) {
            remove(selectedMember.id)
                .then((response) => {
                    if (response.status === 204) {
                        refresh();
                        cloesDeleteModal();
                        alert('Delete trainer success');
                    } else {
                        alert('Delete trainer failed');
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-semibold mb-8">Employee</h1>
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
                            onClick={() => {
                                navigate('create');
                            }}
                            className="ms-auto"
                        >
                            Create
                        </Button>
                    </div>
                    {errorDeleteTrainer && (
                        <p className="bg-red-600 text-sm text-white p-2 rounded mb-2">
                            {errorDeleteTrainer}
                        </p>
                    )}
                    {error && (
                        <p className="text-sm text-white bg-red-600 rounded p-2 mb-2">
                            {error}
                        </p>
                    )}

                    <DataTable
                        data={
                            data
                                ? data?.data.filter((x) => {
                                      return x.name
                                          .toLowerCase()
                                          .startsWith(filter.toLowerCase());
                                  })
                                : []
                        }
                        columns={columnsInit({
                            deleteHandler: openDeleteModal,
                            updateHandler: () => {},
                        })}
                    />

                    {isLoading && (
                        <p className="text-sm text-center font-medium">
                            Loading...
                        </p>
                    )}
                </div>
            </div>
            <Confirmation
                Icon={TrashIcon}
                body="Do you want to delete this trainer?"
                header="Delete confirmation"
                onClose={cloesDeleteModal}
                onYes={deleteHandler}
                visible={deleteModalVisibility}
            />
        </div>
    );
};

export default TrainerPage;
