import { useContext, useEffect, useState } from 'react';
import { DropdownMenuRadio } from './drop-down-menu';
import { CurrentPageContext } from './current-page-context';

interface Item {
    id: string;
    name: string;
    quantity: string;
    phone: string;
    status: string;
}

export function ListOrder() {
    const [orders, setOrders] = useState<Item[]>([]);
    const context = useContext(CurrentPageContext);
    const { role } = context;
    function getOrders() {
        fetch('http://localhost:8000/api/get-order/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result: Item[]) => {
                setOrders(result);
                console.log(result);
            });
    }

    useEffect(() => {
        if (role != 'none') getOrders();
        console.log(role);
    }, [role]);

    return (
        <>
            <div className='max-w-[750px] m-auto antialiased  mt-[7rem] mb-[7rem]'>
                {role != 'none' ? (
                    <>
                        <p className='text-xl font-semibold mb-[2rem]'>
                            Список заказов
                        </p>
                        <div>
                            <div className='grid grid-cols-5 text-center text-xl font-semibold mb-5 items-center'>
                                <p>Название</p> <p>Количество</p> <p>Номер</p>
                                <p>Состояние</p>
                                <p>Действия</p>
                            </div>
                            {orders.length > 0 ? (
                                <>
                                    {orders.map((i) => (
                                        <div
                                            className='grid grid-cols-5 text-center mb-5 items-center'
                                            key={i.id}>
                                            <div>{i.name}</div>
                                            <div>{i.quantity}</div>
                                            <div>{i.phone}</div>
                                            <div>
                                                {i?.status ? i.status : 'no'}
                                            </div>
                                            <DropdownMenuRadio
                                                id={i.id}
                                                name={i.name}
                                                getOrders={() => {
                                                    getOrders();
                                                }}
                                                status={i?.status}
                                            />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div>Корзина пока пуста</div>
                            )}
                        </div>
                    </>
                ) : (
                    <div>
                        Корзина доступна только авторизированным пользователям
                        <a href='/login'>
                            . <u className='text-blue-300'>Войти</u>
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}
