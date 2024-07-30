import { FileQuestionIcon } from 'lucide-react';
import { useState } from 'react';
import SearchBox from '@/components/SearchBox';
import Confirmation from '@/components/Confirmation';
import useGet from '@/hooks/useGet';
import { getClassesResponse } from './data';
import useDelete from '@/hooks/useDelete';
import { columnsInit } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

const ClassPage = () => {
    const { data, refresh } = useGet<getClassesResponse>('classes');
    const { remove: deleteClass } = useDelete('classes');

    const [confirmationVisible, setConfirmationVisible] =
        useState<boolean>(false);
    const [filter, setFilter] = useState('');
    const [selectedData, setSelectedData] = useState<{
        _id: string;
        index: number;
    }>();
    const navigate = useNavigate();

    const openConfirmationDelete = (id: string, index: number) => {
        setSelectedData({ _id: id, index });
        setConfirmationVisible(true);
    };
    const closeConfirmationDelete = () => setConfirmationVisible(false);

    const handleSearch = (name: string) => {
        setFilter(name);
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
                        <Button
                            className="ms-auto"
                            onClick={() => {
                                navigate('create');
                            }}
                        >
                            Create
                        </Button>
                    </div>
                    <DataTable
                        data={
                            data
                                ? data?.data.filter((x) =>
                                      x.name
                                          .toLowerCase()
                                          .startsWith(filter.toLowerCase())
                                  )
                                : []
                        }
                        columns={columnsInit({
                            deleteMethod: openConfirmationDelete,
                            updateMethod: (id: string) => navigate(id),
                        })}
                    />
                </div>
            </div>
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
