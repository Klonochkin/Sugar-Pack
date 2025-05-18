import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext, useState } from 'react';
import { CurrentPageContext } from './current-page-context';

export function CostForm({
    name,
    id,
    setPosition,
    disabled,
}: {
    name: string;
    id: string;
    setPosition: (value: string) => void;
    disabled: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const [quantity, setQuantity] = useState([0]);
    const [material, setMaterial] = useState(['']);

    const [amountMatetials, setAmountMatetials] = useState(1);

    const context = useContext(CurrentPageContext);
    const { phone } = context;

    function placeOrder() {
        if (!phone) return false;
        let foundQuantity = quantity.find((element) => element == 0);
        let foundMaterial = material.find((element) => element == '');
        if (foundQuantity == undefined && foundMaterial == undefined) {
            const data = new FormData();
            Array.from(quantity, (value, index) => {
                data.append('quantity' + index, String(value));
            });
            Array.from(material, (value, index) => {
                data.append('material' + index, value);
            });
            data.append('orderId', id);
            data.append('count', String(material.length));
            console.log(id);
            for (let [key, value] of data) {
                console.log(`${key} — ${value}`);
            }
            fetch(`http://localhost:8000/api/send-material/`, {
                method: 'POST',
                credentials: 'include',
                body: data,
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    setIsOpen((isOpen) => !isOpen);
                    setPosition('making');
                });
        }
    }
    function updateQuantity(index: number, value: number) {
        setQuantity((prevQuantity) =>
            prevQuantity.map((item, i) => (i === index ? value : item)),
        );
    }
    function updateMaterial(index: number, value: string) {
        setMaterial((prevQuantity) =>
            prevQuantity.map((item, i) => (i === index ? value : item)),
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <button
                className='relative w-full flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50'
                onClick={() => {
                    setQuantity([0]);
                    setMaterial(['']);
                    setIsOpen((isOpen) => !isOpen);
                }}
                disabled={disabled}>
                Подготовка сырья
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
                                    onChange={
                                        (e) =>
                                            updateMaterial(
                                                index,
                                                e.target.value,
                                            )
                                        // setQuantity([
                                        //     ...quantity,
                                        //     parseInt(e.target.value),
                                        // ])
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
                                    onChange={
                                        (e) =>
                                            updateQuantity(
                                                index,
                                                parseInt(e.target.value),
                                            )
                                        // setQuantity([
                                        //     ...quantity,
                                        //     parseInt(e.target.value),
                                        // ])
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
                                // let a = quantity.pop();
                                // console.log(a);
                                setQuantity(
                                    quantity.filter(
                                        (_, id) => id != quantity.length - 1,
                                    ),
                                );
                                setMaterial(
                                    material.filter(
                                        (_, id) => id != material.length - 1,
                                    ),
                                );
                            }}>
                            -
                        </Button>
                    ) : (
                        <></>
                    )}
                    <Button
                        onClick={() => {
                            let foundQuantity = quantity.find(
                                (element) => element == 0,
                            );
                            let foundMaterial = material.find(
                                (element) => element == '',
                            );
                            if (
                                foundQuantity == undefined &&
                                foundMaterial == undefined
                            ) {
                                setAmountMatetials(amountMatetials + 1);
                                setQuantity([...quantity, 0]);
                                setMaterial([...material, '']);
                            }
                        }}>
                        +
                    </Button>
                    {/* <DialogTrigger asChild> */}
                    <Button type='button' onClick={placeOrder}>
                        Сохранить
                    </Button>
                    {/* </DialogTrigger> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
