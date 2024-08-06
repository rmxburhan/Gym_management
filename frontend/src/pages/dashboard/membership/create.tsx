import { useEffect, useState } from 'react';
import useHide from '@/context/SideBarState';
import { useParams } from 'react-router';
import MembershipForm from './form';
import { Membership, getMembershipResponse } from './data';
import { api } from '@/network/api';

const CreateMembership = () => {
    const { id } = useParams();
    const { setActiveSideBar } = useHide();
    const [membership, setMembership] = useState<Membership | null>(null);
    const getMembership = async () => {
        api.get('memberships/' + id)
            .then((response) => {
                if (response.status === 200) {
                    const data: getMembershipResponse = response.data;
                    setMembership(data.data);
                } else {
                }
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        getMembership();
    }, [id]);
    useEffect(() => setActiveSideBar('/dashboard/memberships'), []);

    return (
        <div className="px-4 pt-4">
            <h2 className="text-2xl font-semibold mb-4">
                {id ? 'Membership detail' : 'Add membership'}
            </h2>
            <MembershipForm membership={membership} />
        </div>
    );
};

export default CreateMembership;
