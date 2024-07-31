import usePost from '@/hooks/usePost';
import { Membership, createMembershipRequest } from './data';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FC, useEffect } from 'react';
import usePut from '@/hooks/usePut';
const MembershipForm: FC<{ membership: Membership | null }> = ({
    membership,
}) => {
    const {
        error: addMembershipError,
        post: addMembership,
        isLoading: addMembershipLoading,
    } = usePost('memberships');
    const {
        error: updateMembershipError,
        update: updateMembership,
        isLoading: updateMembershipLoading,
    } = usePut('memberships/' + membership?._id);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<createMembershipRequest>();
    const navigate = useNavigate();

    const submitHandler: SubmitHandler<createMembershipRequest> = (
        values: createMembershipRequest
    ) => {
        if (membership) {
            updateMembership(values)
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        alert('Update membership success');
                        navigate('/dashboard/memberships');
                    } else {
                        alert('Failed update memberships');
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            addMembership(values)
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        alert('Add membership success');
                        navigate('/dashboard/memberships');
                    } else {
                        alert('Failed create memberships');
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    useEffect(() => {
        if (membership) {
            setValue('description', membership.description);
            setValue('name', membership.name);
            setValue('duration', membership.duration);
            setValue('discountPrice', membership.discountPrice);
            setValue('price', membership.price);
        }
    }, [membership]);

    return (
        <div className="max-w-[600px] bg-white px-4 py-6 border rounded-xl">
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col gap-1.5"
            >
                <div className="grid gap-1.5 mb-2">
                    <Label htmlFor="name" className="">
                        Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        {...register('name', {
                            required: 'Name is required',
                        })}
                    />
                    {errors.name && (
                        <p className="text-red-600 text-xs">
                            {errors.name.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Name or title of the membership
                    </p>
                </div>
                <div className="grid gap-1.5 mb-2">
                    <Label htmlFor="description" className="">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        {...register('description', {
                            required: 'Description is required',
                        })}
                    />
                    {errors.description && (
                        <p className="text-red-600 text-xs">
                            {errors.description.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Detail about your membership
                    </p>
                </div>
                <div className="grid gap-1.5 mb-2">
                    <Label htmlFor="price" className="">
                        Price
                    </Label>
                    <Input
                        id="price"
                        type="number"
                        {...register('price', {
                            min: 0,
                            required: 'Price is required',
                        })}
                    />
                    {errors.price && (
                        <p className="text-red-600 text-xs">
                            {errors.price.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Price of the membership in format IDR
                    </p>
                </div>
                <div className="grid gap-1.5 mb-2">
                    <Label htmlFor="discountPrice" className="">
                        Discounted Price
                    </Label>
                    <Input
                        id="discountPrice"
                        type="number"
                        {...register('discountPrice', {
                            min: 0,
                        })}
                    />
                    {errors.discountPrice && (
                        <p className="text-red-600 text-xs">
                            {errors.discountPrice.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Price if you want to place discount in your membership
                        the price field needed for display how much you
                        discounted price
                    </p>
                </div>
                <div className="grid gap-1.5 mb-2">
                    <Label htmlFor="duration" className="">
                        Duration (days)
                    </Label>
                    <Input
                        id="duration"
                        type="text"
                        {...register('duration', {
                            required: 'Description is required',
                        })}
                    />
                    {errors.duration && (
                        <p className="text-red-600 text-xs">
                            {errors.duration.message}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs">
                        Duration of membership (how many days the membership
                        active since registration)
                    </p>
                </div>
                {(updateMembershipError || addMembershipError) && (
                    <div className="bg-red-600 text-white p-2 rounded  text-xs text-center">
                        {updateMembershipError || addMembershipError}
                    </div>
                )}
                {(addMembershipLoading || updateMembershipLoading) && (
                    <div className="p-2 text-center text-xs">Loading...</div>
                )}
                <Button type="submit">{membership ? 'Update' : 'Save'}</Button>
            </form>
        </div>
    );
};

export default MembershipForm;
