import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { ArrowBigLeftIcon } from 'lucide-react';
import { OrderForm } from './order-form';

interface Data {
    id: string;
    name: string;
    image: string;
}

export function Order() {
    const navigate = useNavigate();
    const [data, setData] = useState<Data[] | null>(null);
    const location = useLocation();
    location;
    const path = location.pathname.split('/');
    const id = path[path.length - 1];

    useEffect(() => {
        fetch(`http://localhost:8000/api/get-product/${id}`)
            .then((response) => response.json())
            .then((result: Data[]) => {
                setData(result);
                console.log(result);
                console.log(result[0].image);
            });
    }, []);

    return (
        <>
            <div className='max-w-[750px] m-auto antialiased mt-[7rem] mb-[7rem]'>
                <Button
                    variant='ghost'
                    onClick={() => {
                        navigate(-1);
                    }}>
                    <ArrowBigLeftIcon /> Назад
                </Button>
                <div className='flex flex-row justify-between bg-[#3a3a3a] p-5 gap-5'>
                    <div className='w-[50%]'>
                        <img
                            src={`../images/${data ? data[0].image : ''}`}
                            alt=''
                        />
                    </div>
                    <div className='flex flex-col gap-5 w-[50%] items-start'>
                        <p className='text-white text-3xl font-bold'>
                            {data ? data[0].name : ''}
                        </p>
                        <OrderForm name={data ? data[0].name : ''} />
                    </div>
                </div>
                <div className='flex flex-row justify-between mt-5 cursor-pointer'>
                    <div className='flex flex-row gap-5'>
                        <p>Описание</p>
                        <p>Характеристики</p>
                    </div>
                    <div>? Задать вопрос</div>
                </div>
            </div>
        </>
    );
}
