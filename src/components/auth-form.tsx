import { useContext } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CurrentPageContext } from '@/components/current-page-context.tsx';

export function AuthForm() {
    const context = useContext(CurrentPageContext);
    const { currentPage, setCurrentPage } = context;
    function setPage(num: number) {
        setCurrentPage(() => num);
        console.log(num);
    }

    return (
        <>
            <div className='flex items-center justify-center h-screen'>
                <form className='w-1/2'>
                    <div className='flex flex-col gap-5 br-1 border p-10 rounded-md '>
                        {currentPage === 0 && (
                            <>
                                <legend>
                                    <p className='text-2xl font-medium text-center'>
                                        Вход
                                    </p>
                                </legend>
                                <Label className='flex gap-3 flex-col'>
                                    <p className='text-xl font-normal'>Логин</p>
                                    <Input></Input>
                                </Label>
                                <Label className='flex gap-3 flex-col'>
                                    <p className='text-xl font-normal'>
                                        Пароль
                                    </p>
                                    <Input></Input>
                                </Label>
                                <div className='flex flex-row items-center'>
                                    <p>Нет аккаунта?</p>
                                    <Button
                                        variant='link'
                                        onClick={() => setPage(1)}>
                                        Зарегистрироваться
                                    </Button>
                                </div>
                                <Button
                                    onClick={() => {
                                        setPage(2);
                                    }}>
                                    Войти
                                </Button>
                            </>
                        )}
                        {currentPage === 1 && (
                            <>
                                <legend>
                                    <p className='text-2xl font-medium text-center'>
                                        Регистрация
                                    </p>
                                </legend>
                                <Label className='flex gap-3 flex-col'>
                                    <p className='text-xl font-normal'>Логин</p>
                                    <Input></Input>
                                </Label>
                                <Label className='flex gap-3 flex-col'>
                                    <p className='text-xl font-normal'>
                                        Пароль
                                    </p>
                                    <Input></Input>
                                </Label>
                                <div className='flex flex-row items-center'>
                                    <p>Есть аккаунт?</p>
                                    <Button
                                        variant='link'
                                        onClick={() => setPage(0)}>
                                        Вход
                                    </Button>
                                </div>
                                <Button
                                    onClick={() => {
                                        setPage(2);
                                    }}>
                                    Зарегистрироваться
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
