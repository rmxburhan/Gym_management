import SearchBox from '@/components/SearchBox';
import { useEffect, useState } from 'react';
import useGet from '@/hooks/useGet';
import { getEquipmentsResponse } from './data';
import { DataTable } from '@/components/ui/data-table';
import { columnsInit } from './columns';
import Confirmation from '@/components/Confirmation';
import { FileQuestionIcon, SendToBack } from 'lucide-react';
import useDelete from '@/hooks/useDelete';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import useHide from '@/context/SideBarState';

const Equipments = () => {
    const { setActiveSideBar } = useHide();
    const { data, refresh } = useGet<getEquipmentsResponse>('equipments');
    const { remove } = useDelete('equipments');
    const navigate = useNavigate();
    const [deleteConfirmationVisibility, setDeleteConfirmationVisibility] =
        useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<{
        id: string;
        index: number;
    } | null>(null);

    const closeConfirmationDelete = () =>
        setDeleteConfirmationVisibility(false);
    const openConfirmationDelete = (id: string, index: number) => {
        setSelectedItem({ id, index });
        setDeleteConfirmationVisibility(true);
    };

    const deleteHandler = () => {
        if (selectedItem) {
            remove(selectedItem?.id)
                .then((response) => {
                    if (response?.status == 204) {
                        closeConfirmationDelete();
                        alert('Data deleted');
                        refresh();
                    } else {
                        alert('Data failed delete');
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => setActiveSideBar('/dashboard/equipments'), []);

    return (
        <div className="px-4 pt-4">
            <h1 className="text-3xl font-semibold mb-4">Equipments</h1>
            <div className="flex flex-col">
                <div
                    id="table-container"
                    className="border w-full px-6 py-8 rounded-3xl bg-white mb-8"
                >
                    <div className="flex flex-row mb-4">
                        <SearchBox
                            onSearch={(value: string) => {
                                setFilter(value);
                            }}
                        />
                        <Button
                            className="ms-auto"
                            onClick={() => navigate('create')}
                        >
                            Create
                        </Button>
                    </div>
                    <DataTable
                        columns={columnsInit({
                            deleteMethod: openConfirmationDelete,
                            updateMethod: (id: string) => navigate(id),
                        })}
                        data={
                            data
                                ? data.data.filter((x) =>
                                      x.name
                                          .toLowerCase()
                                          .startsWith(filter.toLowerCase())
                                  )
                                : []
                        }
                    />
                </div>
            </div>
            <Confirmation
                Icon={FileQuestionIcon}
                body="Do you want to delete this equipments data"
                header="Delete confirmation?"
                onClose={closeConfirmationDelete}
                onYes={deleteHandler}
                visible={deleteConfirmationVisibility}
            />
        </div>
    );
};

export default Equipments;
