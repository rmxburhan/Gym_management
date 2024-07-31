import useHide from '@/context/SideBarState';
import { FC, useEffect, useState } from 'react';
import ClassForm from './form';
import { useParams } from 'react-router';
import { Class, getClassResponse } from './data';
import { api } from '@/network/api';

const CreateClass: FC = () => {
    const { id } = useParams();
    const { setActiveSideBar } = useHide();
    const [classData, setClassData] = useState<Class | null>(null);

    const getClass = () => {
        api.get('classes/' + id)
            .then((response) => {
                if (response.status === 200) {
                    const data: getClassResponse = response.data;
                    setClassData(data.data);
                } else {
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => setActiveSideBar('/dashboard/classes'), []);
    useEffect(() => {
        getClass();
    }, [id]);
    return (
        <>
            <h2 className="text-2xl font-semibold mb-4">
                {id ? 'Class detail' : 'Add class'}
            </h2>
            <ClassForm classData={classData} />
        </>
    );
};

export default CreateClass;
