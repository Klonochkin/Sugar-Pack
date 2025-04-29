'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useContext } from 'react';
import { CurrentPageContext } from './current-page-context';

export function NavigationMenuDemo() {
    const context = useContext(CurrentPageContext);
    const { setCurrentPage } = context;
    function setPage(num: number) {
        setCurrentPage(() => num);
        console.log(num);
    }
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger></NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className='gap-3 p-4 md:w-[200px] lg:w-[300px]'>
                            <ListItem
                                onClick={() => setPage(2)}
                                title='Каталог'></ListItem>
                            <ListItem
                                onClick={() => setPage(3)}
                                title='Заказы'></ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
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
