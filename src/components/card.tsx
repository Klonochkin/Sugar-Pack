import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useContext } from 'react';
import { CurrentPageContext } from './current-page-context';

export function AccountCard() {
    const context = useContext(CurrentPageContext);
    const { login, email, phone } = context;
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant='link'>{login}</Button>
            </HoverCardTrigger>
            <HoverCardContent className='w-80'>
                <div className='flex justify-around space-x-4'>
                    <Avatar>
                        <AvatarImage src='https://github.com/vercel.png' />
                    </Avatar>
                    <div className='space-y-1'>
                        <h4 className='text-sm font-semibold'>{login}</h4>
                        <p className='text-sm'>{email}</p>
                        <p className='text-sm'>{phone}</p>
                        <Button variant='ghost'>Выйти</Button>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
