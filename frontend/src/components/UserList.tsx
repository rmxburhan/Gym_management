import React from 'react';
import Avatar from '@/assets/images/avatar.png';

interface Props {
    name: string;
    profile: string;
    id: string;
    memberId: string;
    checkInTime: string;
    checkOutTime: string | null;
}

const UserList: React.FC<Props> = ({
    name,
    profile,
    memberId,
    id,
    checkInTime,
    checkOutTime,
}) => {
    return (
        <div className="p-2 flex flex-row items-center gap-4">
            <div className="flex flex-row gap-x-4 items-center flex-grow">
                <img
                    src={
                        profile
                            ? 'http://localhost:5000/api/' + profile
                            : Avatar
                    }
                    alt="avatar.png"
                    style={{ width: '50px', height: '50px' }}
                    className="rounded-full border hover:cursor-pointer"
                />
                <div>
                    <div className="text-md">{name}</div>
                    <div className="text-sm text-gray-500">{memberId}</div>
                </div>
            </div>
            <div>
                <button className="px-2 py-1 text-xs border-2 border-gray-800 rounded-[0.5rem] me-2">
                    {new Date(checkInTime).toLocaleTimeString()}
                </button>
                -
                <button className="px-2 py-1 text-xs border-2 border-gray-800 rounded-[0.5rem] ms-2">
                    {checkOutTime
                        ? new Date(checkOutTime).toLocaleTimeString()
                        : '--:--'}
                </button>
            </div>
        </div>
    );
};

export default UserList;
