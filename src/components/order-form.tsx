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
import { useState } from 'react';

export function OrderForm({ name }: { name: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const [phone, setPhone] = useState('');
    const [quantity, setQuantity] = useState(0);

    function placeOrder() {
        if (!phone && quantity <= 0) return false;
        let status = 'processing';
        const keys = Object.keys(localStorage);

        const productKeys = keys.filter((key) => key.startsWith('product'));

        const productNumbers = productKeys.map((key) => {
            const match = key.match(/product(\d+)/);
            return match ? parseInt(match[1], 10) : 0;
        });

        const maxProductNumber =
            productNumbers.length > 0 ? Math.max(...productNumbers) : 0;

        let key = `product${maxProductNumber + 1}`;
        const order = {
            name: { name },
            quantity: { quantity },
            phone: { phone },
            status: { status },
            key: { key },
        };

        localStorage.setItem(
            `product${maxProductNumber + 1}`,
            JSON.stringify(order),
        );
        return true;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button
                variant='default'
                onClick={() => {
                    setPhone('');
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
                        <Label htmlFor='quantity' className='text-right'>
                            Количество
                        </Label>
                        <Input
                            placeholder='1'
                            type='number'
                            min='1'
                            id='quantity'
                            className='col-span-3'
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
