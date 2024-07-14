import { PencilIcon, PlusIcon, Trash } from 'lucide-react';
import StatusChips from '../../components/StatusChips';
import Name from '../../components/Name';
import { useEffect, useState } from 'react';
import { getMembers } from '../../network/api';

type memberData = {
    name: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
    image: string;
    address: string;
    role: string;
};
const Member = () => {
    const [members, setMembers] = useState<memberData[]>();
    useEffect(() => {
        getMembers().then((response) => {
            console.log(response);
            if (response.status == 200) {
                const members = response.data.data.users;
                setMembers(members);
            }
        });
    }, []);
    return (
        <div>
            <h1 className="text-4xl font-semibold mb-8">Member</h1>
            <div className="flex flex-col">
                <div
                    id="table-container"
                    className="w-full px-6 py-8 rounded-3xl bg-white"
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members?.map((x) => {
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
                                        <td>
                                            {new Date(
                                                x.dateOfBirth
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <StatusChips status="active" />
                                        </td>
                                        <td className="flex flex-row gap-2">
                                            <button className="p-2 bg-indigo-100 text-indigo-500 rounded">
                                                <PencilIcon size={20} />
                                            </button>

                                            <button className="p-2 bg-indigo-500 text-indigo-100 rounded">
                                                <Trash size={20} />
                                            </button>
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

export default Member;
