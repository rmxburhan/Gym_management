import { PencilIcon, Trash, TrashIcon } from 'lucide-react';
import StatusChips, { StatusChipType } from '@/components/StatusChips';
import Name from '@/components/Name';
import { useEffect, useState } from 'react';
import { getEmployee } from '@/network/api';
import { Trainer } from './data';
import SearchBox from '@/components/SearchBox';
import Confirmation from '@/components/Confirmation';
import useDelete from '@/hooks/useDelete';
import CreateTrainer from './create';

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

    useEffect(() => {
        getEmployee()
            .then((response: any) => {
                if (response.status == 200) {
                    console.log(response);
                    const employees = response.data.data.employees.map(
                        (x: any) => {
                            return {
                                _id: x._id,
                                name: x.name,
                                email: x.email,
                                dateOfBirth: new Date(
                                    x.dateOfBirth
                                ).toLocaleDateString(),
                                gender: x.gender,
                                image: x.image,
                                address: x.address,
                                role: x.role,
                            };
                        }
                    );
                    setEmployee(employees);
                }
            })
            .catch();
    }, []);
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
                        <button className="px-4 py-2 bg-blue-500 text-white rounded flex flex-row gap-1 justify-center ms-auto items-center">
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
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee
                                .filter((x) => {
                                    return x.name
                                        .toLowerCase()
                                        .startsWith(filter?.toLowerCase());
                                })
                                .map((x, index) => {
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
                                            <td>{x.dateOfBirth}</td>
                                            <td>
                                                <StatusChips
                                                    status="Holiday"
                                                    type={
                                                        StatusChipType.success
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <StatusChips
                                                    status="Trainer"
                                                    type={StatusChipType.danger}
                                                />
                                            </td>
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
