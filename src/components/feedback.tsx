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
import { useState } from 'react';

interface Response {
    message: string;
}

export function Feedback() {
    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    function sendFeedback() {
        if (name && phone && message && email) {
            setIsOpen(!isOpen);
            fetch(`http://localhost:8000/api/send-feedback/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                }),
            })
                .then((response) => response.json())
                .then((result: Response) => {
                    console.log(result.message);
                });
        }
        console.log(name);
        console.log(phone);
        console.log(message);
        console.log(email);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button
                variant='ghost'
                onClick={() => {
                    setName('');
                    setPhone('');
                    setMessage('');
                    setEmail('');
                    setIsOpen((isOpen) => !isOpen);
                }}>
                ? Задать вопрос
            </Button>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Обратная связь</DialogTitle>
                    <DialogDescription>
                        Заполните форму ниже и мы перезвоним!
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPhone(e.target.value)}
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
