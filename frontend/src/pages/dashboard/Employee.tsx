import { PencilIcon, PlusIcon, Trash } from 'lucide-react';
import StatusChips from '../../components/StatusChips';
import Name from '../../components/Name';
import { useEffect, useState } from 'react';
import { getEmployee } from '../../network/api';

type employeeData = {
    _id: string;
    name: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    image: string;
    address: string;
    role: string;
};

const Employee = () => {
    const [employee, setEmployee] = useState<employeeData[]>([]);
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
                        <input
                            type="text"
                            name="search"
                            id="searchQuery"
                            className="px-4 py-2 border bg-white rounded outline-none focus:border-indigo-500"
                            placeholder="Searh..."
                        />
                        <button className="px-[18px] py-[12px] bg-indigo-800 text-white rounded flex flex-row gap-1 justify-center ms-auto items-center">
                            <PlusIcon size={20} />
                            <span>Add</span>
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
                            {employee.map((x) => {
                                return (
                                    <tr>
                                        <td>1.</td>
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
                                            <StatusChips status="Holiday" />
                                        </td>
                                        <td>
                                            <StatusChips status="Trainer" />
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
        </div>
    );
};

export default Employee;
