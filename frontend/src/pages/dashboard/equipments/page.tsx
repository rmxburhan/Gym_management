import { PencilIcon, Trash } from 'lucide-react';
import StatusChips, { StatusChipType } from '@/components/StatusChips';
import Name from '@/components/Name';
import SearchBox from '@/components/SearchBox';
import { useState } from 'react';
import useGet from '@/hooks/useGet';
import { getEquipmentsResponse } from './data';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

const Equipments = () => {
    const { data } = useGet<getEquipmentsResponse>('equipments');

    const [createModalVisibility, setCreateModalVisibility] =
        useState<boolean>(false);
    const [deleteConfirmationVisibility, setDeleteConfirmationVisibility] =
        useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');
    const openCreateModal = () => setCreateModalVisibility(true);
    const closeCreateModal = () => setCreateModalVisibility(false);

    const closeConfirmationDelete = () =>
        setDeleteConfirmationVisibility(false);
    const openConfirmationDelete = () => setDeleteConfirmationVisibility(true);

    const deleteHandler = () => {};

    return (
        <div>
            <h1 className="text-4xl font-semibold mb-8">Equipments</h1>
            <div className="flex flex-col">
                <div
                    id="table-container"
                    className="border w-full px-6 py-8 rounded-3xl bg-white mb-8"
                >
                    <div className="flex flex-row mb-4">
                        <SearchBox onSearch={() => {}} />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded flex flex-row gap-1 justify-center ms-auto items-center">
                            Create
                        </button>
                    </div>
                    {/* <DataTable columns={columns} data={data ? data.equipments.} /> */}
                    <table className="table-auto w-full">
                        <thead className="bg-indigo-100 text-black">
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.equipments
                                .filter((x) =>
                                    x.name.toLowerCase().startsWith(filter)
                                )
                                .map((x, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}.</td>
                                            <td>{x.name}</td>
                                            <td>{x.qty}</td>
                                            <td>
                                                <div className="flex flex-row gap-2 my-auto">
                                                    <button className="p-2 bg-indigo-100 text-indigo-500 rounded">
                                                        <PencilIcon size={20} />
                                                    </button>

                                                    <button className="p-2 bg-indigo-500 text-indigo-100 rounded">
                                                        <Trash size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>

                <div
                    id="table-container"
                    className="border w-full px-6 py-8 rounded-3xl bg-white"
                >
                    <h2 className="text-xl font-semibold mb-4">
                        Equipment Logs
                    </h2>
                    <table className="table-auto w-full">
                        <thead className="bg-indigo-100 text-black">
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.equipments
                                .filter((x) =>
                                    x.name.toLowerCase().startsWith(filter)
                                )
                                .map((x, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}.</td>
                                            <td>{x.name}</td>
                                            <td>{x.qty}</td>
                                            <td>
                                                <div className="flex flex-row gap-2 my-auto">
                                                    <button className="p-2 bg-indigo-100 text-indigo-500 rounded">
                                                        <PencilIcon size={20} />
                                                    </button>

                                                    <button className="p-2 bg-indigo-500 text-indigo-100 rounded">
                                                        <Trash size={20} />
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
        </div>
    );
};

export default Equipments;
