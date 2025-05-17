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
import { CurrentPageContext } from './current-page-context';
import { CostForm } from './cost-form';

export function DropdownMenuRadio({
    id,
    name,
    status,
    getOrders,
}: {
    id: string;
    name: string;
    status: string;
    getOrders: () => void;
}) {
    const [position, setPosition] = React.useState(status);
    const context = React.useContext(CurrentPageContext);
    const { role } = context;

    function setStatusByValue(value: string) {
        setPosition(value);
        fetch(`http://localhost:8000/api/update-order/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                status: value,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                getOrders();
            });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>Изменить состояние</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={(value) => {
                        setStatusByValue(value);
                    }}>
                    {role == 'admin' ? (
                        <>
                            <DropdownMenuRadioItem
                                value='processing'
                                disabled={true}>
                                В обработке
                            </DropdownMenuRadioItem>
                            <CostForm
                                name={name}
                                id={id}
                                setPosition={(value: string) => {
                                    setStatusByValue(value);
                                }}
                                disabled={
                                    position == 'processing' ? false : true
                                }
                            />
                            <DropdownMenuRadioItem
                                value='making'
                                disabled={true}>
                                Изготовление
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                value='trial'
                                disabled={position == 'making' ? false : true}>
                                Проба формы
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                value='ready'
                                disabled={position == 'trial' ? false : true}>
                                Готов
                            </DropdownMenuRadioItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuRadioItem
                                value='cansel'
                                disabled={
                                    position == 'processing' ? false : true
                                }>
                                Отменить
                            </DropdownMenuRadioItem>
                        </>
                    )}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
