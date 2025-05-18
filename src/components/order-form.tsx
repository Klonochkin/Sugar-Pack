import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext, useState } from 'react';
import { CurrentPageContext } from './current-page-context';

export function OrderForm({ name }: { name: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const [quantity, setQuantity] = useState(0);

    const context = useContext(CurrentPageContext);
    const { phone } = context;

    function placeOrder() {
        if (!phone && quantity <= 0) return false;
        fetch('http://localhost:8000/api/send-order/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                quantity: quantity,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button
                variant='default'
                onClick={() => {
                    setQuantity(0);
                    setIsOpen((isOpen) => !isOpen);
                }}>
                Оформить заказ
            </Button>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Заказ на {name}</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='quantity' className='text-right'>
                            Количество
                        </Label>
                        <Input
                            placeholder='1'
                            type='number'
                            min='1'
                            id='quantity'
                            className='col-span-3'
                            autoFocus={phone ? true : false}
                            onChange={(e) =>
                                setQuantity(parseInt(e.target.value))
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button type='button' onClick={placeOrder}>
                            Заказать
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
