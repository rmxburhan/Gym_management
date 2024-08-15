import ActionBar from '@/components/ActionBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { checkInPayload } from './data';
import useHide from '@/context/SideBarState';
import { useEffect } from 'react';

const CheckInPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<checkInPayload>();
    const { setActiveSideBar } = useHide();
    useEffect(() => setActiveSideBar('/app/home'), []);
    const onSubmit: SubmitHandler<checkInPayload> = () => {
        return 0;
    };
    return (
        <div className="bg-gray-50">
            <ActionBar title="Attendances" backButton />
            <div className="container h-screen flex flex-col pt-4 text-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <Input
                        placeholder="Chek in code"
                        className="mb-2"
                        {...register('code', {
                            required: 'Code is required',
                        })}
                    />
                    {errors.code && (
                        <p className="text-red-600 mb-2 text-xs">
                            {errors.code.message}
                        </p>
                    )}
                    <Button className="mx-auto w-full" type="submit">
                        Check In
                    </Button>
                </form>
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 border-b-2 border-slate-950 py-2">
                        <p className="text-center font-semibold">Check In</p>
                        <p className="text-center font-semibold">Check Out</p>
                    </div>
                    <div className="grid grid-cols-2 mt-2">
                        <p className="text-center ">00:00</p>
                        <p className="text-center ">00:00</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckInPage;
