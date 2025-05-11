'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
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

interface UserInfo {
    login: string;
    email: string;
    phone: string;
    role: string;
}

export function NavigationMenuHeader() {
    const context = useContext(CurrentPageContext);
    const { role, setRole } = context;
    const navigate = useNavigate();
    React.useEffect(() => {
        fetch('http://localhost:8000/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result: UserInfo) => {
                setRole(result.role);
            });
    }, []);

    return (
        <div className='flex flex-row items-center gap-[2.5rem]'>
            <div>
                <Button variant='ghost' className='invisible'>
                    Вход
                </Button>
            </div>
            <NavigationMenu>
                <NavigationMenuList className=''>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            href='/catalog'>
                            Каталог
                        </NavigationMenuLink>
                    </NavigationMenuItem>
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
                ) : (
                    <Button variant='ghost' className='invisible'>
                        Вход
                    </Button>
                )}
            </div>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className,
                    )}
                    {...props}>
                    <div className='text-sm font-medium leading-none'>
                        {title}
                    </div>
                    <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';
