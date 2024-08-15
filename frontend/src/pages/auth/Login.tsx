import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC } from 'react';
import usePost from '@/hooks/usePost';
import useAuth from '@/context/Auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FormValues {
    email: string;
    password: string;
}

const Login: FC = () => {
    const navigate = useNavigate();
    const { post, error: submitError } = usePost('auth/login');
    const { setToken, setUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
        post({ email: values.email, password: values.password })
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data;
                    if (data.data.role === 'member') {
                        navigate('/app/home');
                    } else {
                        navigate('/dashboard');
                    }
                    setToken(data.token);
                    setUser(data.data);
                } else if (response.status === 422) {
                    alert('Redirect to personal information form');
                    // TODO : this is for member but i will do for admin first so keep remind me
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="bg-gray-100 w-screen h-screen flex justify-center">
            <div className="bg-white rounded self-center p-4 border  max-w-[400px] w-full mx-4">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-sm grid gap-1.5"
                >
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        className="mb-2"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs font-medium mb-2">
                            {errors.email.message}
                        </p>
                    )}

                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        className="mb-2"
                    />

                    {errors.password && (
                        <p className="text-red-500 text-xs font-medium mb-2">
                            {errors.password.message}
                        </p>
                    )}

                    {submitError && (
                        <p className="text-red-500 text-xs p-2 border-red-500 border rounded mb-2">
                            {submitError}
                        </p>
                    )}
                    <p className="text-xs text-center mb-2">
                        Not have an account?
                        <Link
                            to="/register"
                            className="text-blue-500 underline"
                        >
                            <span> Register</span>
                        </Link>
                    </p>

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
