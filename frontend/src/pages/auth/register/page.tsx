import { useState } from 'react';
import { useNavigate } from 'react-router';
import { genderType, registerPayload } from './data';
import usePost from '@/hooks/usePost';
import { isAxiosError } from 'axios';
import LogoPlaceholder from '@/components/LogoPlaceholder';

const Register = () => {
    const { post: registerPost } = usePost('auth/register');
    const [error, setError] = useState<string[] | null>(null);
    const [payload, setPayload] = useState<registerPayload>({
        name: '',
        email: '',
        password: '',
        address: '',
        gender: genderType.male,
        dateOfBirth: new Date().toString(),
    });

    const navigate = useNavigate();

    const onChangeHandler = (e: any) => {
        const data = { ...payload, [e.target.name]: e.target.value.toString() };
        setPayload(data);
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        registerPost(payload)
            .then((response) => {
                if (response.status === 200) {
                    navigate('/login');
                }
            })
            .catch((err) => {
                if (isAxiosError(err)) {
                    if (err.response?.status === 400) {
                        const errorMessages = err.response.data.errors.map(
                            (x: any) => {
                                return x.msg;
                            }
                        );
                        setError(errorMessages);
                    }
                }
            });
    };

    return (
        <div
            className="flex justify-center items-center h-[100vh] hamburger"
            id="register-page"
        >
            <div className="bg-white border rounded-md py-12 px-8 max-w-[500px] w-[500px] mx-auto self-center">
                <LogoPlaceholder />
                <h1 className="text-center text-2xl font-semibold mb-4 ">
                    Register
                </h1>
                <form className="flex flex-col gap-2" onSubmit={submitHandler}>
                    <label htmlFor="email">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="mb-4"
                        value={payload.name}
                        onChange={onChangeHandler}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="mb-4"
                        onChange={onChangeHandler}
                        value={payload.email}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        className="mb-4"
                        value={payload.password}
                        onChange={onChangeHandler}
                    />
                    <label htmlFor="dateOfBirth">Birth Date</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        required
                        className="mb-4"
                        value={payload.dateOfBirth}
                        onChange={onChangeHandler}
                    />
                    <label htmlFor="address">Address</label>
                    <textarea
                        value={payload.address}
                        name="address"
                        id="address"
                        required
                        className="mb-4"
                        onChange={onChangeHandler}
                    />
                    <label htmlFor="gender">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        className="mb-4"
                        value={payload.gender.toString()}
                        required
                        onChange={onChangeHandler}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <button
                        type="submit"
                        className="btn px-8 py-4 rounded bg-black text-white font-semibold"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
