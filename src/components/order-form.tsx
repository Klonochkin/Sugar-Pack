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

export function OrderForm({ name }: { name: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='link'>Оформить заказ</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Заказ на {name}</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                            Номер телефона
                        </Label>
                        <Input
                            id='name'
                            placeholder='+79000000000'
                            type='tel'
                            className='col-span-3'
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='username' className='text-right'>
                            Количество
                        </Label>
                        <Input
                            placeholder='1'
                            type='number'
                            min='1'
                            id='username'
                            className='col-span-3'
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button type='button'>Заказать</Button>
                    </DialogTrigger>
                    {/* <Button type='button'>Заказать</Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
