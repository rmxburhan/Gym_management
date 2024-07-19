import { Download, PencilIcon, PlusIcon, Trash, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getMemberships } from '../../network/api';
import useFetch from '@/hooks/useGet';

interface membershipsData {
    _id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    published: boolean;
}

const Membership = () => {
    const [memberships, setMemberShips] = useState<membershipsData[]>();

    useEffect(() => {
        getMemberships()
            .then((response) => {
                console.log(response);
                const memberships = response.data.data.memberships;
                setMemberShips(memberships);
            })
            .catch((err) => {
                console.error('error memberships', err);
            });
    }, []);

    return (
        <div>
            <h2 className="text-4xl font-bold text-black mb-8">Membership</h2>
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
                                <th>Membership name</th>
                                <th>Description</th>
                                <th>Duration (Day)</th>
                                <th>Price (Rp.)</th>
                                <th>Published</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberships?.map((x: membershipsData) => {
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

                                                <button className="p-2 bg-indigo-500 text-indigo-100 rounded">
                                                    <Trash size={20} />
                                                </button>
                                                <button
                                                    className={`p-2 rounded ${
                                                        x.published
                                                            ? 'bg-red-500 text-white'
                                                            : 'bg-green-500 text-white'
                                                    }`}
                                                >
                                                    {x.published ? (
                                                        <Download size={20} />
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
        </div>
    );
};

export default Membership;
