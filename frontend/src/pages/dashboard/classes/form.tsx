import usePost from '@/hooks/usePost';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Class, postClassPayload } from './data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ComboBox from '@/components/ui/combobox';
import useGet from '@/hooks/useGet';
import { getTrainersResponse } from '../trainers/data';
import { useNavigate } from 'react-router';
import { FC, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import usePut from '@/hooks/usePut';

const ClassForm: FC<{ classData: Class | null }> = ({ classData }) => {
    const { post: createClass, error, isLoading } = usePost('classes');
    const {
        update: updateClass,
        error: updateClassError,
        isLoading: updateClassLoading,
    } = usePut('classes/' + classData?._id || '');
    const { data: trainersData } = useGet<getTrainersResponse>('trainers');
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<postClassPayload>();
    const navigate = useNavigate();

    const onSelectTrainer = (value: string) => setValue('trainer', value);

    const onSubmit: SubmitHandler<postClassPayload> = (
        values: postClassPayload
    ) => {
        if (!classData) {
            createClass(values)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200 || response.status === 201) {
                        alert('Success create class');
                        navigate('/dashboard/classes');
                    } else {
                        alert('Failed to create class');
                    }
                })
                .catch((err) => console.error(err));
        } else {
            updateClass(values)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        alert('Success Update class');
                        navigate('/dashboard/classes');
                    } else {
                        alert('Failed to update class');
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        if (classData) {
            setValue('name', classData.name);
            setValue('trainer', classData.trainer._id);
            setValue('description', classData.description);
            setValue('maxParticipant', classData.maxParticipant);
            const data = new Date(classData.date);
            setValue(
                'date',
                `${data.getFullYear()}-${String(data.getMonth()).padStart(
                    2,
                    '0'
                )}-${String(data.getDate()).padStart(2, '0')}`
            );
        }
    }, [classData]);

    return (
        <div className="bg-white px-4 py-6 rounded-xl border w-full max-w-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
                    <Textarea
                        id="description"
                        {...register('description', {
                            required: 'Description is required',
                        })}
                    />
                    <span className="text-xs text-gray-500">
                        Fill the description for your class so the member know
                        activity during the class
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
                        value={classData?.trainer._id}
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
                {(isLoading || updateClassLoading) && (
                    <p className="mb-1.5 p-1 text-center">Loading...</p>
                )}
                {(error || updateClassError) && (
                    <p className="mb-1.5 text-white p-2 text-center bg-red-500 text-xs font-medium rounded">
                        {error}
                    </p>
                )}
                <Button type="submit" className="font-medium">
                    {classData ? 'Update' : 'Save'}
                </Button>
            </form>
        </div>
    );
};

export default ClassForm;
