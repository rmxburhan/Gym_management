import { FC, useEffect, useState } from 'react';
import usePost from '@/hooks/usePost';
import useHide from '@/context/SideBarState';
import { SubmitHandler, useForm } from 'react-hook-form';
import { postClassPayload } from './data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ComboBox from '@/components/ui/combobox';
import useGet from '@/hooks/useGet';
import { getTrainersResponse } from '../trainers/data';
import { useNavigate } from 'react-router';

const CreateClass: FC = () => {
    const { setActiveSideBar } = useHide();
    const { post: createClass, error, isLoading } = usePost('classes');
    const {
        data: trainersData,
        // error: errorGetTrainers,
        // isLoading: isLoadingTrainer,
    } = useGet<getTrainersResponse>('trainers');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<postClassPayload>();

    const onSubmit: SubmitHandler<postClassPayload> = (
        values: postClassPayload
    ) => {
        createClass(values)
            .then((response) => {
                console.log(response);
                if (response.status === 200 || response.status === 201) {
                    alert('Success create class');
                    navigate('/dashboard/classes');
                    navigate;
                } else {
                    alert('Failed to create class');
                }
            })
            .catch((err) => console.error);
    };

    const onSelectTrainer = (value: string) => setValue('trainer', value);

    useEffect(() => setActiveSideBar('/dashboard/classes'), []);

    return (
        <>
            <h2 className="text-3xl font-medium text-black mb-8">
                Create class
            </h2>
            <div className="bg-white px-4 py-6 rounded-xl border w-full max-w-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col"
                >
                    <div className="grid w-full items-center gap-1.5 mb-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                        />
                        <span className="text-xs text-gray-500">
                            Name of the class
                        </span>
                        {errors.name && (
                            <p className="text-xs text-red-600 font-semibold">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5 mb-4">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            type="text"
                            id="description"
                            {...register('description', {
                                required: 'Description is required',
                            })}
                        />
                        <span className="text-xs text-gray-500">
                            Fill the description for your class so the member
                            know activity during the class
                        </span>
                        {errors.description && (
                            <p className="text-xs text-red-600 font-medium">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5 mb-4">
                        <Label htmlFor="trainer">Trainer</Label>
                        <ComboBox
                            datas={
                                trainersData?.data
                                    ? trainersData?.data.map((x) => {
                                          return {
                                              value: x._id,
                                              label: x.name,
                                          };
                                      })
                                    : []
                            }
                            onSelect={onSelectTrainer}
                            displayText="Select trainer..."
                            searchPlaceHolder="Search trainer name..."
                            {...register('trainer', {
                                required: 'Trainer cannot be empty',
                            })}
                        />
                        <span className="text-xs text-gray-500">
                            Select trainer who will become mentor in the class
                        </span>
                        {errors.trainer && (
                            <p className="text-xs text-red-600 font-medium">
                                {errors.trainer.message}
                            </p>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5 mb-4">
                        <Label htmlFor="maxParticipant">Max participant</Label>
                        <Input
                            type="number"
                            id="maxParticipant"
                            min="0"
                            {...register('maxParticipant', {
                                required: 'Max participant cannot be empty',
                                valueAsNumber: true,
                                min: 0,
                            })}
                        />

                        <span className="text-xs text-gray-500">
                            Max participants in a class
                        </span>
                        {errors.maxParticipant && (
                            <p className="text-xs text-red-600 font-medium">
                                {errors.maxParticipant.message}
                            </p>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5 mb-4">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            type="date"
                            id="date"
                            {...register('date', {
                                required: true,
                            })}
                        />
                        <span className="text-xs text-gray-500">
                            Date when the class will be started
                        </span>
                        {errors.date && (
                            <p className="text-xs text-red-600 font-medium">
                                {errors.date.message}
                            </p>
                        )}
                    </div>
                    {isLoading && (
                        <p className="mb-1.5 p-1 text-center">Loading...</p>
                    )}
                    {error && (
                        <p className="mb-1.5 text-white p-2 text-center bg-red-500 text-xs font-medium rounded">
                            {error}
                        </p>
                    )}
                    <Button type="submit" className="font-medium">
                        Submit
                    </Button>
                </form>
            </div>
        </>
    );
};

export default CreateClass;
