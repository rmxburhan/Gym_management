import { ToyBrick } from 'lucide-react';
import { FC } from 'react';

export enum StatusChipType {
    success,
    danger,
    warning,
}
const StatusChips: FC<{ type: StatusChipType; status: string }> = ({
    status,
    type,
}) => {
    const style = [
        'bg-green-100 text-green-800 rounded-full',
        'bg-red-100 text-red-800 rounded-full',
        'bg-yellow-100 text-yellow-800 rounded-full',
    ];
    console.log(type);
    return (
        <div className="flex">
            <div className={`px-4 py-2 ${style[type]}`}>{status}</div>
        </div>
    );
};

export default StatusChips;
