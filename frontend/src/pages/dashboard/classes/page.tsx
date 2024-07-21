import { FileQuestionIcon, PencilIcon, Trash } from 'lucide-react';
import { useState } from 'react';
import CreateClass from './create';
import SearchBox from '@/components/SearchBox';
import Confirmation from '@/components/Confirmation';
import useGet from '@/hooks/useGet';
import { classData, getClassesResponse } from './data';
import useDelete from '@/hooks/useDelete';

const ClassPage = () => {
    const { data, refresh } = useGet<getClassesResponse>('classes');
    const { remove: deleteClass } = useDelete('classes');

    const [createModalVisible, setCreateModalVisible] =
        useState<boolean>(false);
    const [confirmationVisible, setConfirmationVisible] =
        useState<boolean>(false);
    const [filter, setFilter] = useState('');
    const [selectedData, setSelectedData] = useState<{
        _id: string;
        index: number;
    }>();

    const openCreateModal = () => setCreateModalVisible(true);
    const closeCreateModal = () => {
        setCreateModalVisible(false);
        refresh();
    };

    const openConfirmationDelete = (id: string, index: number) => {
        setSelectedData({ _id: id, index });
        setConfirmationVisible(true);
    };
    const closeConfirmationDelete = () => setConfirmationVisible(false);

    const handleSearch = (name: string) => {
        setFilter(name);
    };

    const filterHandler = (x: classData) => {
        return x.name.startsWith(filter);
    };

    const deleteHandler = () => {
        if (selectedData) {
            deleteClass(selectedData?._id).then((response) => {
                if (response.status === 204) {
                    refresh();
                    closeConfirmationDelete();
                } else {
                    console.log('delete class failed');
                }
            });
        }
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
                            className="px-4 py-2 bg-blue-500 text-white rounded flex flex-row gap-1 justify-center ms-auto items-center"
                            onClick={openCreateModal}
                        >
                            <span>Create</span>
                        </button>
                    </div>
                    {/* <DataTable
                        data={
                            data
                                ? data.classes.filter((x) =>
                                      x.name.toLowerCase().startsWith(filter)
                                  )
                                : []
                        }
                        columns={columns}
                    /> */}
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
                            {data?.classes
                                .filter(filterHandler)
                                .map((x, index) => {
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
                                            <td>
                                                {x.maxParticipant.toString()}
                                            </td>
                                            <td>
                                                <div className="flex flex-row gap-2 my-auto">
                                                    <button className="p-2 bg-indigo-100 text-indigo-500 rounded">
                                                        <PencilIcon size={20} />
                                                    </button>

                                                    <button
                                                        className="p-2 bg-indigo-500 text-indigo-100 rounded"
                                                        onClick={() => {
                                                            openConfirmationDelete(
                                                                x._id,
                                                                index
                                                            );
                                                        }}
                                                    >
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
            <Confirmation
                Icon={FileQuestionIcon}
                body="Are you want to delete this class"
                header="Delete confirmation?"
                onClose={closeConfirmationDelete}
                visible={confirmationVisible}
                onYes={deleteHandler}
            />
        </div>
    );
};

export default ClassPage;
