import Modal from '@/components/Modal';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addEquipmentLogRequest } from './data';
import usePost from '@/hooks/usePost';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Addlog: FC<{ onClose: () => void; visible: boolean; id: string }> = ({
    visible,
    onClose,
    id: equipmentId,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<addEquipmentLogRequest>();
    const { post, error, isLoading } = usePost(
        'equipments/' + equipmentId + '/logs'
    );
    const onSubmit: SubmitHandler<addEquipmentLogRequest> = (values) => {
        post({ description: values.description, category: values.category })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    alert('Log has been added');
                    onClose();
                } else {
                    alert('Add log failed');
                }
            })
            .catch((err) => console.error(err));
    };
    return (
        <Modal onClose={onClose} isModalVisible={visible} closeButton={true}>
            <div className="px-2">
                <h2 className="text-xl font-semibold mb-4">Add log</h2>
                <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <Label className="font-medium" htmlFor="category">
                        Category
                    </Label>
                    <Select
                        {...register('category', {
                            required: 'Category is required',
                        })}
                        onValueChange={(e) => {
                            setValue('category', e);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="maintenance">
                                Maintenance
                            </SelectItem>
                            <SelectItem value="return">Return</SelectItem>
                            <SelectItem value="sell">Sell</SelectItem>
                            <SelectItem value="buy">Buy</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.category && (
                        <p className="text-red-600 text-xs">
                            {errors.category.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Category for what logs you want to add if you select buy
                        it will added to your current qty and if you sell it
                        will subtract
                    </p>
                    <Label className="font-medium" htmlFor="description">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        {...register('description', {
                            required: 'Description is required',
                        })}
                    />
                    {errors.description && (
                        <p className="text-xs text-red-600 ">
                            {errors.description.message}
                        </p>
                    )}
                    {isLoading && <p className="p-2 text-xs">Loading...</p>}
                    {error && (
                        <p className="p-2 text-xs text-white bg-red-600 rounded text-center font-medium">
                            {error}
                        </p>
                    )}
                    <Button type="submit">Save</Button>
                </form>
            </div>
        </Modal>
    );
};

export default Addlog;
