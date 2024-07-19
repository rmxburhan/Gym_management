import Modal from '@/components/Modal';
import usePost from '@/hooks/usePost';
import { FC, useState } from 'react';
import { createMembershipRequest } from './data';
import { isAxiosError } from 'axios';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const CreateMembership: FC<Props> = ({ visible, onClose }) => {
    if (!visible) return '';

    const { error, post: createMembership } = usePost('memberships');
    const [payload, setPayload] = useState<createMembershipRequest>({
        description: '',
        duration: 0,
        name: '',
        price: 0,
    });

    const submitHandler = (e: any) => {
        e.preventDefault();
        createMembership(payload)
            .then((response) => {
                if (response.status === 200) {
                    onClose();
                }
            })
            .catch((err) => {
                if (isAxiosError(err)) {
                    console.error(err);
                }
            });
    };

    const reset = () => {
        const newPayload = {
            ...payload,
            description: '',
            duration: 0,
            name: '',
            price: 0,
        };

        setPayload(newPayload);
    };

    const onChangeHandler = (e: any) => {
        const newPayload = { ...payload, [e.target.name]: e.target.value };
        setPayload(newPayload);
    };
    return (
        <Modal onClose={onClose} isModalVisible={visible} closeButton={true}>
            <div className="w-[600px]">
                <h2 className="text-2xl font-bold mb-2">Create</h2>
                {error ? (
                    <div className="bg-red-500 text-white p-4 rounded mb-2">
                        {error}
                    </div>
                ) : (
                    ''
                )}
                <form onSubmit={submitHandler} className="flex flex-col">
                    <label htmlFor="name" className="mb-2">
                        Name
                    </label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        required
                        value={payload.name}
                        onChange={onChangeHandler}
                        className="rounded mb-2 px-4 py-2"
                    />
                    <label htmlFor="description" className="mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        value={payload.description}
                        onChange={onChangeHandler}
                        className="rounded mb-2 px-4 py-2 border border-black outline-none"
                    />
                    <label htmlFor="price" className="mb-2">
                        Price
                    </label>
                    <input
                        name="price"
                        id="price"
                        type="number"
                        required
                        value={payload.price}
                        onChange={onChangeHandler}
                        className="rounded mb-2 px-4 py-2"
                    />
                    <label htmlFor="duration" className="mb-2">
                        Duration (days)
                    </label>
                    <input
                        name="duration"
                        id="duration"
                        type="text"
                        required
                        value={payload.duration}
                        onChange={onChangeHandler}
                        className="rounded mb-2 px-4 py-2"
                    />
                    <div className="flex flex-row gap-2 justify-end mt-2">
                        <button
                            type="button"
                            onClick={reset}
                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CreateMembership;
