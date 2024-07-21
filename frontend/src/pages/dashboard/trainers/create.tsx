import Modal from '@/components/Modal';
import { FC, useState } from 'react';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const CreateTrainer: FC<Props> = ({ visible, onClose }) => {
    return (
        <Modal isModalVisible={visible} onClose={onClose} closeButton={true}>
            <div className="">
                <h2 className="text-2xl font-bold mb-2">Create</h2>
                <form className="flex flex-col gap-2 px-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" required className="px-4 py-2" />
                </form>
            </div>
        </Modal>
    );
};

export default CreateTrainer;
