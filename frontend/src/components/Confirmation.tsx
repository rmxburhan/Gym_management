import { FC } from 'react';
import Modal from './Modal';
import { LucideIcon } from 'lucide-react';

const Confirmation: FC<{
    onClose: () => void;
    onYes: () => void;
    Icon: LucideIcon;
    header: string;
    body: string;
    visible: boolean;
}> = ({ onClose, onYes, Icon, header, body, visible }) => {
    if (!visible) return '';
    return (
        <Modal onClose={onClose} isModalVisible={visible}>
            <div className="w-[400px]">
                <div className="flex flex-col align-middle text-center gap-2">
                    <Icon size={35} className="mx-auto" />
                    <h2 className="font-semibold text-2xl">{header}</h2>
                    <p>{body}</p>
                </div>
                <div className="flex flex-row gap-2 mt-4 justify-center p-2">
                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={onYes}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </Modal>
    );
};
export default Confirmation;
