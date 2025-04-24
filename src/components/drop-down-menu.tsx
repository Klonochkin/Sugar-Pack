'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function DropdownMenuRadio({
    name,
    status,
    getOrders,
}: {
    name: string;
    status: string;
    getOrders: () => void;
}) {
    const [position, setPosition] = React.useState(status);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>Изменить состояние</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={(value) => {
                        setPosition(value);
                        const data = localStorage.getItem(name);

                        if (data) {
                            console.log(name);
                            const parsedData = JSON.parse(data);
                            let status = value;
                            parsedData.status = status;
                            localStorage.setItem(
                                name,
                                JSON.stringify(parsedData),
                            );
                            getOrders();
                        }
                    }}>
                    <DropdownMenuRadioItem value='processing'>
                        В обработке
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='preparation'>
                        Подготовка сырья
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='making'>
                        Изготовление
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='trial'>
                        Проба формы
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='ready'>
                        Готов
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
