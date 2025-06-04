'use client';

import * as React from 'react';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';
import { useContext } from 'react';
import { CurrentPageContext } from './current-page-context';
import { useNavigate } from 'react-router';
import { AccountCard } from './card';
import { NavigationMenuDemo } from './navigation-menu';

interface UserInfo {
    login: string;
    email: string;
    phone: string;
    role: string;
}

export function NavigationMenuHeader() {
    const context = useContext(CurrentPageContext);
    const { role, setRole, setLogin, setEmail, setPhone } = context;
    const navigate = useNavigate();
    const [load, setLoad] = React.useState(true);

    React.useEffect(() => {
        fetch('http://localhost:8000/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result: UserInfo[]) => {
                // if (role != result[0].role) {
                setRole(result[0].role);
                if (result[0].role != 'none') {
                    setLogin(result[0].login);
                    setEmail(result[0].email);
                    setPhone(result[0].phone);
                }
                // }
                console.log(result[0].role);
                setLoad(false);
            });
    }, []);

    return (
        <div className='flex flex-row items-center gap-[2.5rem]'>
            {load ? (
                <div></div>
            ) : (
                <>
                    <NavigationMenu>
                        <NavigationMenuList className=''>
                            <NavigationMenuItem className='flex justify-center items-center'>
                                <NavigationMenuLink href='/'>
                                    <img
                                        className='cursor-pointer w-[7.5rem]'
                                        src='../images/logo.png'
                                        alt=''
                                    />
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href='/catalog'>
                                    Каталог
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href='/order'>
                                    Заказы
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div>
                        {role == 'none' ? (
                            <Button
                                variant='ghost'
                                onClick={() => {
                                    navigate(`/login`);
                                }}>
                                Вход
                            </Button>
                        ) : role == 'admin' ? (
                            <div className='flex gap-[2.5rem]'>
                                <AccountCard />
                                {/* <Button
                                    variant='ghost'
                                    onClick={() => exportReport()}>
                                    Отчёт
                                </Button> */}
                                <NavigationMenuDemo />
                            </div>
                        ) : (
                            <AccountCard />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
