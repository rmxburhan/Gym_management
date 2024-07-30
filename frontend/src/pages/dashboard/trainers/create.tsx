import useHide from '@/context/SideBarState';
import { FC, useEffect, useState } from 'react';
import TrainerForm from './form';
import { useParams } from 'react-router';
import { api } from '@/network/api';
import { Trainer, getTrainerResponse } from './data';
import { Class, getClassesResponse } from '../classes/data';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns-classes';

const CreateTrainer: FC = () => {
    const { id } = useParams();
    const { setActiveSideBar } = useHide();
    const [trainer, setTrainer] = useState<Trainer | null>(null);
    const [classes, setClasses] = useState<Class[]>([]);

    const getTrainer = () => {
        api.get('trainers/' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    const data: getTrainerResponse = response.data;
                    setTrainer(data.data);
                } else {
                    alert('Get trainer failed');
                }
            })
            .catch((err) => console.error(err));
    };

    const getClasses = () => {
        api.get('classes?trainerId=' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    const data: getClassesResponse = response.data;
                    setClasses(data.data);
                } else {
                    alert('Get trainer class failed');
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        setActiveSideBar('/dashboard/trainers');
    }, []);

    useEffect(() => {
        if (id) {
            getTrainer();
            getClasses();
        }
    }, [id]);

    return (
        <div className="px-4 text-sm">
            <h2 className="text-2xl font-semibold mb-4">
                {trainer ? 'Trainer detail' : 'Add Trainer'}
            </h2>
            <div className="flex flex-row gap-4">
                <TrainerForm trainer={trainer} />
                <div className="flex flex-col flex-1">
                    <div className="bg-white px-4 py-6 rounded-xl border">
                        <p className="text-xl font-medium mb-2">Classes data</p>
                        <DataTable columns={columns} data={classes} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTrainer;
