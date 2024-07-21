import { FC, useState } from 'react';
import Modal from '../../../components/Modal';
import useAuth from '../../../context/Auth';
import { useNavigate } from 'react-router';
import usePost from '@/hooks/usePost';

interface payload {
    name: string;
    description: string;
    date: string;
    maxParticipant: number;
    trainerId: string;
}

interface Props {
    isModalVisible: boolean;
    onClose: () => void;
}
const CreateClass: FC<Props> = ({ isModalVisible, onClose }) => {
    const { post: createClass } = usePost('classes');
    const { logout } = useAuth();
    const [payload, setPayload] = useState<payload>({
        name: '',
        description: '',
        maxParticipant: 0,
        date: '',
        trainerId: '',
    });

    const navigate = useNavigate();

    const onChangeHandler = (e: any) => {
        const data = { ...payload, [e.target.name]: e.target.value };
        setPayload(data);
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        createClass(payload)
            .then((response: any) => {
                console.log('create class response', response);
                if (response.status === 200) {
                    reset();
                    onClose();
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const reset = () => {
        const data = {
            ...payload,
            name: '',
            description: '',
            maxParticipant: 0,
            date: '',
            trainerId: '',
        };
        setPayload(data);
    };

    return (
        <>
            <Modal
                isModalVisible={isModalVisible}
                onClose={onClose}
                closeButton={true}
            >
                <h2 className="text-2xl font-bold text-black">Create</h2>
                <form onSubmit={submitHandler} className="flex flex-col">
                    <label
                        htmlFor="name"
                        className="text-md text-black font-semibold my-2"
                    >
                        Name
                    </label>
                    <input
                        className="rounded px-4 py-2"
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={payload?.name}
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor="description"
                        className="text-md text-black font-semibold my-2"
                    >
                        Description
                    </label>
                    <input
                        className="rounded px-4 py-2"
                        type="text"
                        name="description"
                        id="description"
                        required
                        value={payload?.description}
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor="trainerId"
                        className="text-md text-black font-semibold my-2"
                    >
                        Trainer
                    </label>
                    <input
                        className="rounded px-4 py-2"
                        type="text"
                        name="trainerId"
                        id="trainerId"
                        required
                        value={payload.trainerId}
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor="maxParticipant"
                        className="text-md text-black font-semibold my-2"
                    >
                        Max participant
                    </label>
                    <input
                        className="rounded px-4 py-2"
                        type="number"
                        name="maxParticipant"
                        id="maxParticipant"
                        required
                        value={payload.maxParticipant}
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor="date"
                        className="text-md text-black font-semibold my-2"
                    >
                        Date
                    </label>
                    <input
                        className="rounded px-4 py-2"
                        type="date"
                        name="date"
                        id="date"
                        required
                        value={payload.date.toString()}
                        onChange={onChangeHandler}
                    />
                    <div className="flex flex-row gap-4">
                        <button
                            type="button"
                            className="ms-auto bg-indigo-100 text-indigo-800 px-6 py-2 rounded border-none mt-4"
                            onClick={reset}
                        >
                            Reset
                        </button>
                        <input
                            type="submit"
                            value="Save"
                            className="bg-indigo-800 text-indigo-100 px-6 py-2 rounded border-none mt-4"
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CreateClass;
