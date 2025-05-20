import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext, useState } from 'react';
import { CurrentPageContext } from './current-page-context';

interface Response {
    message: string;
}

export function Feedback({ id }: { id: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const context = useContext(CurrentPageContext);
    const { login, email, phone } = context;

    const [name, setName] = useState(login);
    const [phoneInput, setPhoneInput] = useState(phone);
    const [message, setMessage] = useState('');
    const [emailInput, setEmailInput] = useState(email);

    function sendFeedback() {
        if (name && phoneInput && message && emailInput) {
            setIsOpen(!isOpen);
            fetch(`http://localhost:8000/api/send-feedback/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    email: emailInput,
                    phone: phoneInput,
                    message: message,
                }),
            })
                .then((response) => response.json())
                .then((result: Response) => {
                    console.log(result.message);
                });
        }
        console.log(name);
        console.log(phoneInput);
        console.log(message);
        console.log(emailInput);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button
                variant='ghost'
                onClick={() => {
                    setName(login);
                    setPhoneInput(phone);
                    setMessage('');
                    setEmailInput(email);
                    setIsOpen((isOpen) => !isOpen);
                    console.log(login);
                }}>
                ? Задать вопрос
            </Button>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Обратная связь</DialogTitle>
                    <DialogDescription>
                        Заполните форму ниже и мы вам ответим!
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                            Имя
                        </Label>
                        <Input
                            id='name'
                            placeholder='Иван'
                            type='text'
                            className='col-span-3'
                            value={login}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='email' className='text-right'>
                            Email
                        </Label>
                        <Input
                            id='email'
                            placeholder='example@test.ru'
                            type='email'
                            className='col-span-3'
                            value={email}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='phone' className='text-right'>
                            Номер телефона
                        </Label>
                        <Input
                            id='phone'
                            placeholder='+79000000000'
                            type='tel'
                            className='col-span-3'
                            value={phone}
                            onChange={(e) => setPhoneInput(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='message' className='text-right'>
                            Ваше сообщение
                        </Label>
                        <Input
                            type='text'
                            id='message'
                            className='col-span-3'
                            autoFocus={login != '' ? true : false}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type='button' onClick={sendFeedback}>
                        Отправить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
