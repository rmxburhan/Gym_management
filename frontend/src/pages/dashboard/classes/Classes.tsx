import { PencilIcon, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { deleteClass, getClasses } from '../../../network/api';
import CreateClass from './Create';
import SearchBox from '@/components/SearchBox';

type classData = {
    _id: string;
    name: string;
    description: string;
    date: Date;
    maxParticipant: number;
    trainerDetails: any[];
};

const Classes = () => {
    const [classes, setClasses] = useState<classData[]>();
    const [createModalVisible, setCreateModalVisible] =
        useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [filter, setFilter] = useState('');

    const openCreateModal = () => setCreateModalVisible(true);
    const closeCreateModal = () => setCreateModalVisible(false);

    useEffect(() => {
        getClasses().then((response) => {
            if (response.status == 200) {
                console.log(response);
                const classesData = response.data.data.classes;
                setClasses(classesData);
            }
        });
    }, []);

    const handleSearch = (name: string) => {
        setFilter(name);
    };

    const filterHandler = (x: classData) => {
        return x.name.startsWith(filter);
    };
    const deleteHandler = (id: string, index: number) => {
        deleteClass(id).then((response) => {
            if (response.status === 204) {
                let data = classes?.splice(index, 1);
                setClasses(data);
            } else {
                console.log('delete class failed');
            }
        });
    };

    return (
        <div>
            <h1 className="text-4xl font-semibold mb-8">Classes</h1>
            <div className="flex flex-col">
                <div
                    id="table-container"
                    className="border w-full px-6 py-8 rounded-3xl bg-white"
                >
                    <div className="flex flex-row mb-4">
                        <SearchBox onSearch={handleSearch} />
                        <button
                            className="px-[18px] py-[12px] bg-indigo-800 text-white rounded flex flex-row gap-1 justify-center ms-auto items-center"
                            onClick={openCreateModal}
                        >
                            <span>Create</span>
                        </button>
                    </div>

                    <table className="table-auto w-full">
                        <thead className="bg-indigo-100 text-black">
                            <tr>
                                <th>No.</th>
                                <th>Class Name</th>
                                <th>Trainer</th>
                                <th>Date / Time</th>
                                <th>Participants</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes?.filter(filterHandler).map((x, index) => {
                                return (
                                    <tr key={x._id}>
                                        <td>{index + 1}</td>
                                        <td>{x.name}</td>
                                        <td>{x.trainerDetails[0].name}</td>
                                        <td>
                                            {new Date(
                                                x.date.toString()
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>{x.maxParticipant.toString()}</td>
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
            <CreateClass
                isModalVisible={createModalVisible}
                onClose={closeCreateModal}
            />
        </div>
    );
};

export default Classes;
