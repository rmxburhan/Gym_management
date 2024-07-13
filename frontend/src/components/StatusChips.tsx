import { FC } from 'react';
interface StatusChipsProps {
    status: string;
}
const StatusChips: FC<StatusChipsProps> = ({ status }) => {
    return (
        <div className="flex">
            <div
                className={`px-4 py-2 bg-green-100 text-green-800 rounded-full`}
            >
                {status}
            </div>
        </div>
    );
};

export default StatusChips;
