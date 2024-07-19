import { CrossIcon, DeleteIcon, XIcon } from 'lucide-react';
import React from 'react';

interface props {
    children: any;
    onClose: () => void;
    isModalVisible: boolean;
}

const Modal: React.FC<props> = ({ isModalVisible, onClose, children }) => {
    if (!isModalVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div
                className={
                    'rounded-lg p-6 bg-white border-2 w-1/3 flex flex-col max-h-[85%]'
                }
            >
                <button
                    className="bg-red-800 text-red-100 p-2 rounded text-[12px] ms-auto"
                    onClick={onClose}
                >
                    <XIcon size={20} />
                </button>
                <div className="pt-4 o overflow-y-scroll">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
