import { useContext, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CurrentPageContext } from '@/components/current-page-context.tsx';
import { useNavigate } from 'react-router';

interface UserInfo {
    login: string;
    email: string;
    phone: string;
    role: string;
}

export function AuthForm() {
    const context = useContext(CurrentPageContext);
    const { currentPage, setCurrentPage } = context;
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    function setPage(num: number) {
        setCurrentPage(() => num);
    }

    function submit() {
        console.log('submit');
        if (currentPage === 1) {
            console.log(login, password);
            if (login && password) {
                fetch('http://localhost:8000/api/signIn/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        login: login,
                        password: password,
                    }),
                }).then((response) => {
                    if (response.ok) {
                        navigate('/');
                    }
                    response.json();
                });
            }
        } else if (currentPage === 0) {
            if (login && email && password && phone) {
                fetch('http://localhost:8000/api/signUp/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        login: login,
                        email: email,
                        password: password,
                        phone: phone,
                    }),
                })
                    .then((response) => response.json())
                    .then((result: UserInfo) => {
                        console.log(result);
                        setPage(1);
                    });
            }
        }
    }

    return (
        <>
            <div className='flex items-center justify-center h-screen'>
                <form className='w-[450px]'>
                    <div className='flex flex-col gap-5 br-1 border p-10 rounded-md '>
                        {currentPage === 0 && (
                            <>
                                <legend>
                                    <p className='text-2xl font-medium text-center'>
                                        Регистрация
                                    </p>
                                </legend>
                                <Label className='flex gap-3 flex-col'>
                                    <p className='text-xl font-normal'>Логин</p>
                                    <Input
                                        id='login'
                                        type='text'
                                        className='col-span-3'
                                        onChange={(e) =>
                                            setLogin(e.target.value)
                                        }
                                    />
                                </Label>
                                <Label className='flex gap-3 flex-col'>
                                    <p className='text-xl font-normal'>Email</p>
                                    <Input
                                        id='email'
                                        type='email'
                                        className='col-span-3'
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Label>
                                <Label className='flex gap-3 flex-col'>
                                    <p className='text-xl font-normal'>
                                        Телефон
                                    </p>
                                    <Input
                                        id='tel'
                                        type='tel'
                                        className='col-span-3'
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </Label>
                                <Label className='flex gap-3 flex-col'>
                                    <p className='text-xl font-normal'>
                                        Пароль
                                    </p>
                                    <Input
                                        id='password'
                                        type='password'
                                        className='col-span-3'
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Label>
                                <div className='flex flex-row items-center'>
                                    <p>Есть аккаунт?</p>
                                    <Button
                                        variant='link'
                                        onClick={() => setPage(1)}>
                                        Войти
                                    </Button>
                                </div>
                                <Button
                                    type='button'
                                    onClick={() => {
                                        submit();
                                    }}>
                                    Зарегистрироваться
                                </Button>
                            </>
                        )}
                        {currentPage === 1 && (
                            <>
                                <legend>
                                    <p className='text-2xl font-medium text-center'>
                                        Вход
                                    </p>
                                </legend>
                                <Label className='flex gap-3 flex-col'>
                                    <p className='text-xl font-normal'>
                                        Логин или email
                                    </p>
                                    <Input
                                        id='login'
                                        type='text'
                                        className='col-span-3'
                                        onChange={(e) =>
                                            setLogin(e.target.value)
                                        }
                                    />
                                </Label>
                                <Label className='flex gap-3 flex-col'>
                                    <p className='text-xl font-normal'>
                                        Пароль
                                    </p>
                                    <Input
                                        id='password'
                                        type='password'
                                        className='col-span-3'
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Label>
                                <div className='flex flex-row items-center'>
                                    <p>Нет аккакунта?</p>
                                    <Button
                                        variant='link'
                                        onClick={() => setPage(0)}>
                                        Зарегистрироваться
                                    </Button>
                                </div>
                                <Button
                                    type='button'
                                    onClick={() => {
                                        submit();
                                    }}>
                                    Войти
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
