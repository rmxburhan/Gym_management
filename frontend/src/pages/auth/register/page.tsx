import { useNavigate } from 'react-router';
import usePost from '@/hooks/usePost';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerPayload } from './data';
import { Link } from 'react-router-dom';

const Register = () => {
    const {
        post: registerPost,
        error: postRegisterError,
        isLoading: postRegisterLoading,
    } = usePost('auth/register');
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<registerPayload>();

    const onSubmit: SubmitHandler<registerPayload> = (values) => {
        registerPost(values)
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    navigate('/login');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div
            className="flex justify-center items-center h-[100vh] bg-gray-100"
            id="register-page"
        >
            <div className="bg-white border rounded-md p-4 max-w-[400px] w-full mx-4 self-center">
                <h2 className="text-left text-xl font-semibold mb-4">
                    Register
                </h2>
                <form
                    className="flex flex-col gap-1.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Label htmlFor="email">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        className="mb-2"
                        {...register('name', {
                            required: 'Name is required',
                        })}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-600 mb-2">
                            {errors.name.message}
                        </p>
                    )}
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        className="mb-2"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-600 mb-2">
                            {errors.email.message}
                        </p>
                    )}
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        className="mb-2"
                        {...register('password', {
                            required: 'Password is required',
                            min: 6,
                        })}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-600 mb-2">
                            {errors.password.message}
                        </p>
                    )}
                    <p className="text-xs text-center mb-2">
                        Already have an account?
                        <Link to="/login" className="text-blue-500 underline">
                            <span> Login</span>
                        </Link>
                    </p>
                    {postRegisterError && (
                        <p className="bg-red-600 p-2 text-center text-white text-xs font-medium">
                            {postRegisterError}
                        </p>
                    )}
                    {postRegisterLoading && (
                        <p className="p-2 text-center text-xs">Loading...</p>
                    )}
                    <Button
                        type="submit"
                        className="btn px-8 py-4 rounded bg-black text-white font-semibold"
                    >
                        Register
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Register;
