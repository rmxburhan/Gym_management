import { SubmitHandler, useForm } from 'react-hook-form';
import { createEquipmentsRequest } from './data';
import { useRef, useState } from 'react';
import usePost, { PostContentType } from '@/hooks/usePost';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const CreateEquipment = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<createEquipmentsRequest>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState('');
    const {
        post: addEquipment,
        error: addEquipmentError,
        isLoading: addEquipmentLoading,
    } = usePost('equipments', PostContentType.FormData);

    const onSubmit: SubmitHandler<createEquipmentsRequest> = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('qty', values.qty);
        if (values.image) {
            formData.append('image', values.image[0]);
        }
        addEquipment(formData)
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    alert('Add equipment success');
                } else {
                    alert('Add equipment failed');
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="max-w-[600px] px-4 text-xs">
            <h1 className="text-2xl font-semibold mb-4">Add equipments</h1>
            <div className="bg-white rounded-xl border px-4 py-6">
                <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                            setValue('image', files);
                            setImagePreview(URL.createObjectURL(files[0]));
                        } else {
                            setValue('image', undefined);
                        }
                    }}
                />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-1.5"
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <img
                                    src={imagePreview}
                                    className="w-[100px] h-[100px] rounded bg-slate-300 border object-cover hover:cursor-pointer"
                                    onClick={() => {
                                        fileInputRef.current?.click();
                                    }}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Change profile image</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Label htmlFor="name" className="font-medium">
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
                    <p className="text-xs text-muted-foreground">
                        Name for the equipment
                    </p>
                    <Label className="font-medium" htmlFor="qty">
                        Qty
                    </Label>
                    <Input
                        type="number"
                        id="qty"
                        min={0}
                        {...register('qty', {
                            required: 'Qty is required',
                            min: 0,
                        })}
                    />
                    {errors.qty && (
                        <p className="text-xs text-red-600">
                            {errors.qty.message}
                        </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        How much equipment you have
                    </p>
                    {addEquipmentError && (
                        <p className="bg-red-600 p-2 text-white text-xs text-center">
                            {addEquipmentError}
                        </p>
                    )}
                    {addEquipmentLoading && (
                        <p className="p-2 text-xs">Loading...</p>
                    )}
                    <Button type="submit" className="mt-2">
                        Save
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateEquipment;
