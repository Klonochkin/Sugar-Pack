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

export function CostForm({ name }: { name: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const [quantity, setQuantity] = useState(0);

    const [amountMatetials, setAmountMatetials] = useState(1);

    const context = useContext(CurrentPageContext);
    const { phone } = context;

    function placeOrder() {
        if (!phone) return false;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <button
                className='relative w-full flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                onClick={() => {
                    setQuantity(0);
                    setIsOpen((isOpen) => !isOpen);
                }}>
                Изготовление
            </button>
            <DialogContent className='sm:max-w-[425px] overflow-auto max-h-[75%]'>
                <DialogHeader>
                    <DialogTitle>На изготовление {name} потрачено:</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    {Array.from({ length: amountMatetials }, (_, index) => (
                        <div key={index} className='flex flex-col gap-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label
                                    htmlFor='material'
                                    className='text-right'>
                                    Материал
                                </Label>
                                <Input
                                    placeholder='ПЭТ'
                                    type='text'
                                    id='material'
                                    className='col-span-3'
                                    onChange={(e) =>
                                        setQuantity(parseInt(e.target.value))
                                    }
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label
                                    htmlFor='quantity'
                                    className='text-right'>
                                    Количество
                                </Label>
                                <Input
                                    placeholder='1000'
                                    type='number'
                                    id='quantity'
                                    min='1'
                                    className='col-span-3'
                                    onChange={(e) =>
                                        setQuantity(parseInt(e.target.value))
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    {amountMatetials > 1 ? (
                        <Button
                            onClick={() => {
                                setAmountMatetials(amountMatetials - 1);
                            }}>
                            -
                        </Button>
                    ) : (
                        <></>
                    )}
                    <Button
                        onClick={() => {
                            setAmountMatetials(amountMatetials + 1);
                        }}>
                        +
                    </Button>
                    <DialogTrigger asChild>
                        <Button type='button' onClick={placeOrder}>
                            Сохранить
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
