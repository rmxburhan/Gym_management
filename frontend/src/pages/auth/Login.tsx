import { useState } from 'react';
import useAuth from '../../context/Auth';
import { useNavigate } from 'react-router';
import usePost from '@/hooks/usePost';
import { isAxiosError } from 'axios';
import LogoPlaceholder from '@/components/LogoPlaceholder';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, setUser } = useAuth();
    const navigate = useNavigate();
    const { post, error, isLoading } = usePost('auth/login');

    const loginHandler = (e: any) => {
        e.preventDefault();
        post({ email, password })
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data.data;
                    setToken(data.token);
                    setUser(data.user);
                    navigate('/dashboard');
                }
            })
            .catch((err) => {
                if (isAxiosError(err)) {
                }
            });
    };

    return (
        <div
            className="flex justify-center items-center h-[100vh] hamburger"
            id="login-page"
        >
            <div className="bg-white border rounded py-12 px-8 max-w-[500px] w-[500px] mx-auto self-center">
                <LogoPlaceholder />
                <h1 className="text-center text-2xl font-semibold mb-4 ">
                    Login
                </h1>

                {error ? (
                    <div className="bg-red-500 text-white p-4 text-sm rounded my-2 flex">
                        <span>{error}</span>
                        {/* <XIcon
                            size={20}
                            className="ms-auto"
                            onClick={() => {
                                error;
                            }}
                        /> */}
                    </div>
                ) : (
                    ''
                )}

                <form className="flex flex-col gap-2" onSubmit={loginHandler}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="mb-4 px-4 py-2 rounded"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        className="mb-4 px-4 py-2 rounded"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <button
                        type="submit"
                        className="btn px-8 py-4 rounded bg-black text-white font-semibold"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
