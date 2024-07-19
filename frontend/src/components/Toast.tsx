import {
    CheckIcon,
    InfoIcon,
    MessageCircleWarningIcon,
    XCircleIcon,
} from 'lucide-react';
import { FC } from 'react';

export enum ToastType {
    SUCCESS,
    ERROR,
    WARNING,
    INFO,
}
const Toast: FC<{ type: ToastType; message: string }> = ({ type, message }) => {
    const toastStyle = [
        'bg-green-100 text-green-800',
        'bg-red-100 text-red-800',
        'bg-yellow-100 text-yello-800',
        'bg-blue-100 text-blue-800',
    ];

    const toastIcon = [
        <CheckIcon />,
        <XCircleIcon />,
        <MessageCircleWarningIcon />,
        <InfoIcon />,
    ];
    return (
        <div
            className={
                'fixed bottom-4 right-4 p-4 min-w-64 rounded flex flex-row items-center' +
                ` ${toastStyle[type]}`
            }
        >
            {toastIcon[type]}
            <p className="ms-2">{message}</p>
        </div>
    );
};

export default Toast;
