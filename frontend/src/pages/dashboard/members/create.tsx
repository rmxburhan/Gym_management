import Modal from '@/components/Modal';
import { FC, useEffect, useState } from 'react';
import { createMemberRequest, updateMemberRequest } from './data';
import usePost from '@/hooks/usePost';
import { isAxiosError } from 'axios';
import { genderType } from '@/network/api';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const CreateMember: FC<Props> = ({ visible, onClose }) => {
    const [payload, setPayload] = useState<createMemberRequest>({
        address: '',
        dateOfBirth: '',
        email: '',
        password: '',
        gender: 'male',
        name: '',
    });
    const { post } = usePost('members');
    const [error, setError] = useState<string | null>(null);
    const submitHandler = (e: any) => {
        e.preventDefault();
        post(payload)
            .then((response) => {
                if (response.status === 200) {
                    onClose();
                }
            })
            .catch((error) => {
                if (isAxiosError(error)) {
                    if (error.response?.status === 400) {
                        const errorList = error.response.data.errors;
                        const errorMessage = errorList
                            .map((x: any) => x.msg)
                            .join('<br/>');
                        setError(errorMessage);
                    }
                }
            });
    };

    const onChangeHandler = (e: any) => {
        const newPayload = { ...payload, [e.target.name]: e.target.value };
        setPayload(newPayload);
    };

    const reset = () => {
        setPayload({
            password: '',
            email: '',
            address: '',
            dateOfBirth: '',
            gender: 'male',
            name: '',
            image: '',
        });
    };

    return (
        <Modal isModalVisible={visible} onClose={onClose} closeButton={true}>
            <div className="min-w-[700px]">
                <h2 className="text-2xl font-bold text-black">Create</h2>
                {error ? (
                    <div className="bg-red-500 text-white p-4 text-sm my-2 rounded">
                        {error}
                    </div>
                ) : (
                    ''
                )}
                <form onSubmit={submitHandler} className="flex flex-col p-1">
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
                        htmlFor="email"
                        className="text-md text-black font-semibold my-2"
                    >
                        Email
                    </label>
                    <input
                        className="rounded px-4 py-2"
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={payload?.email}
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor="password"
                        className="text-md text-black font-semibold my-2"
                    >
                        Password
                    </label>
                    <input
                        className="rounded px-4 py-2"
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={payload?.password}
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor="dateOfBirth"
                        className="text-md text-black font-semibold my-2"
                    >
                        Birth Date
                    </label>
                    <input
                        className="rounded px-4 py-2"
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        required
                        value={payload?.dateOfBirth.toString()}
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor="gender"
                        className="text-md text-black font-semibold my-2"
                    >
                        Gender
                    </label>
                    <select
                        name="gender"
                        id="gender"
                        value={payload?.gender}
                        required
                        className="px-4 py-2 rounded border"
                        onChange={onChangeHandler}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <label
                        htmlFor="image"
                        className="text-md text-black font-semibold my-2"
                    >
                        Image
                    </label>
                    <input
                        className="rounded px-4 py-2"
                        type="file"
                        name="image"
                        id="image"
                        required
                        value={payload?.image}
                        onChange={onChangeHandler}
                    />
                    <label
                        htmlFor="address"
                        className="text-md text-black font-semibold my-2"
                    >
                        Address
                    </label>
                    <textarea
                        className="rounded px-4 py-2 border-black border"
                        name="address"
                        id="address"
                        required
                        value={payload?.address}
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
            </div>
        </Modal>
    );
};

export default CreateMember;
