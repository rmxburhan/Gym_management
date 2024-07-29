import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getEmployee } from '@/network/api';
import { Trainer, getTrainersResponse } from './data';
import SearchBox from '@/components/SearchBox';
import Confirmation from '@/components/Confirmation';
import { DataTable } from '@/components/ui/data-table';
import useGet from '@/hooks/useGet';
import { columns } from './columns';

const EmployeePage = () => {
    const [filter, setFilter] = useState<string>('');
    const [employee, setEmployee] = useState<Trainer[]>([]);
    const [deleteModalVisibility, setDeleteModalVisibility] =
        useState<boolean>(false);
    const [createModalVisibility, setCreateModalVisibility] =
        useState<boolean>(false);
    const [selectedMember, setSelectedMember] = useState<{
        id: string;
        index: number;
    } | null>(null);

    // const {remove} = useDelete("trainers");

    const openDeleteModal = (id: string, index: number) => {
        setSelectedMember({ id, index });
        setDeleteModalVisibility(true);
    };
    const cloesDeleteModal = () => setDeleteModalVisibility(false);

    const openCreateModal = () => setCreateModalVisibility(true);
    const closeCreateModal = () => setCreateModalVisibility(false);

    const deleteHandler = () => {
        if (selectedMember) {
        }
    };

    const { data, error, isLoading } = useGet<getTrainersResponse>('trainers');

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
                        <button className="px-3 py-1 bg-slate-950 text-xs font-semibold text-white rounded flex flex-row gap-1 justify-center ms-auto items-center">
                            Create
                        </button>
                    </div>
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
                        columns={columns}
                    />
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

export default EmployeePage;
