import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Member, createMemberRequest } from './data';
import usePost, { PostContentType } from '@/hooks/usePost';
import { TrashIcon, PlusIcon } from 'lucide-react';
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from '@/components/ui/tooltip';
import { FC, useEffect, useRef, useState } from 'react';

const memberForm: FC<{ member: Member | null }> = ({ member }) => {
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
    } = useForm<createMemberRequest>({
        defaultValues: {
            addresses: [{ city: '', state: '', street: '', zip: '' }],
        },
    });
    const { append, remove, fields } = useFieldArray({
        control,
        name: 'addresses',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState('');

    const {
        post: addMember,
        isLoading: addMemberLoading,
        error: addMemberError,
    } = usePost('members', PostContentType.FormData);
    const {
        post: updateMember,
        isLoading: updateMemberLoading,
        error: updateMemberError,
    } = usePost('members/' + member?.id, PostContentType.FormData);
    const onSubmit: SubmitHandler<createMemberRequest> = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('gender', values.gender);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('birthDate', values.birthDate);
        for (const [index, address] of values.addresses.entries()) {
            formData.append(`addresses[${index}][city]`, address.city);
            formData.append(`addresses[${index}][state]`, address.state);
            formData.append(`addresses[${index}][zip]`, address.zip);
            formData.append(`addresses[${index}][street]`, address.street);
        }
        if (values.profile) {
            formData.append('profile', values.profile[0]);
        }
        if (member) {
            updateMember(formData)
                .then((response) => {
                    if (response.status === 200) {
                        alert('Update member success');
                    } else {
                        alert('Update member failed');
                    }
                })
                .catch((err) => console.error(err));
        } else {
            addMember(formData)
                .then((response) => {
                    if (response.status === 201 || response.status === 200) {
                        alert('Create member success');
                    } else {
                        alert('Create member failed');
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        console.log('hi i loading the chunk');
        if (member) {
            setValue('name', member.name);
            setValue('email', member.email);
            setImagePreview('http://localhost:5000/' + member.profile || '');
            if (member.memberDetail) {
                const birthDate = new Date(member.memberDetail.birthDate);
                const birthDateString = `${birthDate.getFullYear()}-${String(
                    birthDate.getMonth() + 1
                ).padStart(2, '0')}-${String(birthDate.getDate()).padStart(
                    2,
                    '0'
                )}`;
                console.log(birthDateString);
                setValue('birthDate', birthDateString);

                member.memberDetail.gender == 'male'
                    ? setValue('gender', 'male')
                    : setValue('gender', 'female');
                setValue('phoneNumber', member.memberDetail.phoneNumber);
                remove();
                for (const address of member.memberDetail?.address) {
                    append({
                        city: address.city,
                        state: address.state,
                        street: address.street,
                        zip: address.street,
                    });
                }
            }
        }
    }, [member]);

    return (
        <div className="bg-white p-4 border rounded-xl ">
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
                            console.log(files);
                        } else {
                            setValue('profile', undefined);
                        }
                    }}
                />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <img
                                id="img-profile"
                                src={imagePreview}
                                className="w-[100px] h-[100px] rounded bg-slate-300 border object-cover hover:cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Update profile image</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-1.5">
                <Label htmlFor="name" className=" font-medium">
                    Name
                </Label>
                <Input
                    type="text"
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
                <p className="text-muted-foreground text-xs">Name of member</p>
                <Label htmlFor="email" className="  font-medium">
                    Email
                </Label>
                <Input
                    className="rounded px-4 py-2"
                    type="email"
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
                    Email for member account
                </p>
                <Label htmlFor="password" className="  font-medium">
                    Password
                </Label>

                <Input
                    className="rounded px-4 py-2"
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'Password is requird',
                        min: 6,
                    })}
                />
                {errors.password && (
                    <p className="text-xs text-red-600">
                        {errors.password.message}
                    </p>
                )}
                <p className="text-muted-foreground text-xs">
                    Password for member account
                </p>
                <Label htmlFor="birthDate" className="  font-medium">
                    Birth Date
                </Label>
                <Input
                    className="rounded px-4 py-2"
                    type="date"
                    id="birthDate"
                    {...register('birthDate', {
                        required: 'Birth date is required',
                    })}
                />
                {errors.birthDate && (
                    <p className="text-xs text-red-600">
                        {errors.birthDate.message}
                    </p>
                )}
                <p className="text-muted-foreground text-xs">
                    Birth date of member
                </p>
                <Label htmlFor="phoneNumber" className="  font-medium">
                    Phone number
                </Label>
                <Input
                    className="rounded px-4 py-2"
                    type="text"
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
                    Phone number of member
                </p>
                <Label htmlFor="gender" className="font-medium">
                    Gender
                </Label>

                <Select
                    {...register('gender', {
                        required: 'Gender is required',
                    })}
                    onValueChange={(value: string) =>
                        setValue('gender', value as any)
                    }
                    value={getValues('gender')}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select gender..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>
                {errors.gender && (
                    <p className="text-xs text-red-600">
                        {errors.gender.message}
                    </p>
                )}
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
                {(addMemberLoading || updateMemberLoading) && (
                    <p className="font-medium p-2 text-center">Loading...</p>
                )}
                {(addMemberError || updateMemberError) && (
                    <p className="bg-red-600 p-2 text-white text-center font-medium rounded-md">
                        {addMemberError || updateMemberError}
                    </p>
                )}
                <Button>{member ? 'Update' : 'Save'}</Button>
            </form>
        </div>
    );
};

export default memberForm;
