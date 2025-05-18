import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useContext } from 'react';
import { CurrentPageContext } from './current-page-context';
interface UserInfo {
    login: string;
    email: string;
    phone: string;
    role: string;
}

export function AccountCard() {
    const context = useContext(CurrentPageContext);
    const { login, email, phone, role, setRole, setLogin, setEmail, setPhone } =
        context;
    function logout() {
        fetch('http://localhost:8000/api/signOut/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                fetch('http://localhost:8000/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((result: UserInfo[]) => {
                        if (role != result[0].role) {
                            setRole(result[0].role);
                            if (result[0].role != 'none') {
                                setLogin(result[0].login);
                                setEmail(result[0].email);
                                setPhone(result[0].phone);
                            }
                        }
                        console.log(result[0].login);
                    });
            }
            response.json();
        });
    }
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
                        <Button
                            variant='ghost'
                            onClick={() => {
                                logout();
                            }}>
                            Выйти
                        </Button>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
