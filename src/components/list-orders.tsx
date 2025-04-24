import { useEffect, useState } from 'react';
import { DropdownMenuRadio } from './drop-down-menu';

interface Name {
    name: string;
}

interface Quantity {
    quantity: number;
}

interface Phone {
    phone: string;
}
interface Key {
    key: string;
}

interface Item {
    name: Name;
    quantity: Quantity;
    phone: Phone;
    status: string;
    key: Key;
}

export function ListOrder() {
    const [orders, setOrders] = useState<Item[]>([]);

    function getOrders() {
        const allOrders: Item[] = [];
        const keys = Object.keys(localStorage);

        keys.forEach((key) => {
            if (key.startsWith('product')) {
                const storedOrders = localStorage.getItem(key);
                if (storedOrders) allOrders.push(JSON.parse(storedOrders));
            }
        });
        console.log(allOrders);
        setOrders(allOrders);
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <>
            <div className='mt-[7rem] mb-[7rem]'>
                <p className='text-xl font-semibold mb-[2rem]'>
                    Список заказов
                </p>
                <div>
                    <div className='grid grid-cols-5 text-center text-xl font-semibold mb-5 items-center'>
                        <p>Название</p> <p>Количество</p> <p>Номер</p>
                        <p>Состояние</p>
                        <p>Действия</p>
                    </div>
                    {orders.map((i) => (
                        <div className='grid grid-cols-5 text-center mb-5 items-center'>
                            <div>{i.name.name}</div>
                            <div>{i.quantity.quantity}</div>
                            <div>{i.phone.phone}</div>
                            <div>{i?.status ? i.status : 'no'}</div>
                            <DropdownMenuRadio
                                getOrders={() => {
                                    getOrders();
                                }}
                                name={i.key.key}
                                status={i?.status}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
