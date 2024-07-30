import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC } from 'react';
import usePost from '@/hooks/usePost';
import useAuth from '@/context/Auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
                    setToken(data.token);
                    setUser(data.data);
                    navigate('/dashboard');
                    // alert('login success');
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
            <div className="bg-white rounded self-center p-4 border">
                <h2 className="text-xl font-bold w-[400px] mb-4">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
                    <div className="flex flex-col mb-4 gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs font-medium">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col mb-4 gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-xs font-medium">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {submitError && (
                        <p className="text-red-500 text-xs p-2 border-red-500 border mb-4 rounded">
                            {submitError}
                        </p>
                    )}

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
