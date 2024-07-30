import React, { FC, useEffect, useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import {
    Command,
    CommandInput,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from './command';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Check, ChevronsUpDown } from 'lucide-react';

interface Props {
    datas: any[];
    onSelect: (value: string) => void;
    searchPlaceHolder: string;
    displayText: string;
}

const ComboBox: FC<Props> = ({
    datas,
    onSelect,
    searchPlaceHolder,
    displayText,
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        onSelect(value);
    }, [value]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? datas.find((data) => data.value === value)?.label
                        : displayText}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-white">
                <Command>
                    <CommandInput placeholder={searchPlaceHolder} />
                    <CommandEmpty>No data found.</CommandEmpty>
                    <CommandGroup>
                        {datas.map((data) => (
                            <CommandItem
                                key={data.value}
                                value={data.value}
                                onSelect={(currentValue) => {
                                    setValue(
                                        currentValue === value
                                            ? ''
                                            : currentValue
                                    );
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        value === data.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                                {data.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
export default ComboBox;
