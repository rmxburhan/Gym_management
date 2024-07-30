import useHide from '@/context/SideBarState';
import usePost, { PostContentType } from '@/hooks/usePost';
import React, { useEffect, useRef, useState } from 'react';
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import { createTrainerRequest } from './data';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, TrashIcon } from 'lucide-react';
import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const CreateTrainer: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { setActiveSideBar } = useHide();
    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
    } = useForm<createTrainerRequest>({
        defaultValues: {
            addresses: [{ city: '', state: '', street: '', zip: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'addresses',
    });

    const {
        post: addTrainer,
        error,
        isLoading,
    } = usePost('trainers', PostContentType.FormData);
    const [imagePreview, setImagePreview] = useState('');

    const onSubmit: SubmitHandler<createTrainerRequest> = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('identificationNumber', values.identificationNumber);
        formData.append('bank', values.bank);
        formData.append('bankNumber', values.bankNumber);
        formData.append('phoneNumber', values.phoneNumber);
        for (const [index, address] of values.addresses.entries()) {
            formData.append(`addresses[${index}][city]`, address.city);
            formData.append(`addresses[${index}][state]`, address.state);
            formData.append(`addresses[${index}][zip]`, address.zip);
            formData.append(`addresses[${index}][street]`, address.street);
        }
        if (values.profile) {
            formData.append('profile', values.profile[0]);
        }
        addTrainer(formData)
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    alert('Create trainer success');
                } else {
                    alert('Create trainer failed');
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        setActiveSideBar('/dashboard/trainers');
    }, []);

    return (
        <div className="px-4 text-sm">
            <h2 className="text-2xl font-bold mb-4">Add Trainer</h2>
            <div className="bg-white max-w-[600px] rounded-xl border px-4 py-6">
                <div className="flex flex-col items-baseline gap-1.5 mb-2">
                    <Input
                        type="file"
                        placeholder="choose profile image"
                        className="hidden"
                        id="img-profile"
                        ref={fileInputRef}
                        accept=".jpeg,.jpg,.png"
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                                setImagePreview(URL.createObjectURL(files[0]));
                                setValue('profile', files);
                            } else {
                                setValue('profile', undefined);
                            }
                        }}
                    />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <img
                                    src={imagePreview}
                                    className="w-[100px] h-[100px] rounded bg-slate-300 border object-cover hover:cursor-pointer"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Update profile image</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <form
                    className="grid gap-1.5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Label htmlFor="name" className="font-medium">
                        Name
                    </Label>
                    <Input
                        id="name"
                        {...register('name', {
                            required: 'Name is required',
                        })}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Real name of the trainer
                    </p>

                    <Label htmlFor="email" className="font-medium">
                        Email
                    </Label>
                    <Input
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                        })}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-600">
                            {errors.email.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Email address of the trainer
                    </p>

                    <Label htmlFor="password" className="font-medium">
                        Password
                    </Label>
                    <Input
                        id="password"
                        {...register('password', {
                            required: 'Password is required',
                            min: 6,
                        })}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Password for trainer account
                    </p>
                    <Label
                        htmlFor="identificationNumber"
                        className="font-medium"
                    >
                        ID Number
                    </Label>
                    <Input
                        id="identificationNumber"
                        {...register('identificationNumber', {
                            required: 'ID number is required',
                        })}
                    />
                    {errors.identificationNumber && (
                        <p className="text-xs text-red-600">
                            {errors.identificationNumber.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Identification number (NIK)
                    </p>

                    <Label htmlFor="phoneNumber" className="font-medium">
                        Phone Number
                    </Label>
                    <Input
                        id="phoneNumber"
                        {...register('phoneNumber', {
                            required: 'Phone number is required',
                        })}
                    />
                    {errors.phoneNumber && (
                        <p className="text-xs text-red-600">
                            {errors.phoneNumber.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Phone number of the trainer
                    </p>
                    <Label htmlFor="bank" className="font-medium">
                        Bank Name
                    </Label>
                    <Input
                        id="bank"
                        {...register('bank', {
                            required: 'Bank name is required',
                        })}
                    />
                    {errors.bank && (
                        <p className="text-xs text-red-600">
                            {errors.bank.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">Bank name</p>
                    <Label htmlFor="bankNumber" className="font-medium">
                        Bank Number
                    </Label>
                    <Input
                        id="bankNumber"
                        {...register('bankNumber', {
                            required: 'Bank number is required',
                        })}
                    />
                    {errors.bankNumber && (
                        <p className="text-xs text-red-600">
                            {errors.bankNumber.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">Bank number</p>
                    <hr className="my-2" />
                    <h2 className="font-medium mb-2">Addresses</h2>
                    {fields.map((field, index) => {
                        const city = `addresses[${index}].city`;
                        const street = `addresses[${index}].street`;
                        const state = `addresses[${index}].state`;
                        const zip = `addresses[${index}].zip`;
                        return (
                            <div
                                key={field.id}
                                className="mb-2 flex flex-row gap-2"
                            >
                                <div className="grid grid-cols-2 grid-rows-2 flex-1 gap-2">
                                    <div>
                                        <Label htmlFor={street}>Street</Label>
                                        <Controller
                                            name={street as any} // Ensure these match the FormData structure
                                            control={control}
                                            render={({ field }) => (
                                                <Input id={street} {...field} />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={state}>State</Label>
                                        <Controller
                                            name={state as any} // Ensure these match the FormData structure
                                            control={control}
                                            render={({ field }) => (
                                                <Input id={state} {...field} />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={city}>City</Label>
                                        <Controller
                                            name={city as any} // Ensure these match the FormData structure
                                            control={control}
                                            render={({ field }) => (
                                                <Input id={city} {...field} />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={zip}>Zip code</Label>
                                        <Controller
                                            name={zip as any} // Ensure these match the FormData structure
                                            control={control}
                                            render={({ field }) => (
                                                <Input id={zip} {...field} />
                                            )}
                                        />
                                    </div>
                                </div>
                                {getValues('addresses').length > 1 && (
                                    <button
                                        className="p-0"
                                        onClick={() => remove(index)}
                                    >
                                        <TrashIcon
                                            className="text-red-600"
                                            size={18}
                                        />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="py-2 w-full border rounded text-center bg-slate-50 mb-2"
                                    onClick={() => {
                                        append([
                                            {
                                                city: '',
                                                state: '',
                                                street: '',
                                                zip: '',
                                            },
                                        ]);
                                    }}
                                >
                                    <PlusIcon className="w-[14px] mx-auto" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add additional address</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {error && (
                        <p className="bg-red-600 p-2 rounded text-white font-medium text-center">
                            {error}
                        </p>
                    )}
                    {isLoading && (
                        <p className="font-medium text-center">Loading...</p>
                    )}
                    <Button type="submit">Save</Button>
                </form>
            </div>
        </div>
    );
};

export default CreateTrainer;
