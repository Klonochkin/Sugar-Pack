import { ArrowBigRightIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

export interface Data {
    id: string;
    name: string;
    quantity: string;
    image: string;
    path: string;
}

function Card({
    id,
    name,
    quantity,
    image,
}: {
    id: string;
    name: string;
    quantity: string;
    image: string;
}) {
    const navigate = useNavigate();
    return (
        <>
            <div
                onClick={() => navigate(`/catalog/${id}`)}
                className='relative w-[15rem] h-[15rem] flex flex-col justify-between p-5 before:content-[""] before:bg-gray-700 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:opacity-50 text-center cursor-pointer border-orange-400 border-[2px]'
                style={{ backgroundImage: `url('../images/${image}')` }}>
                <div className='flex flex-col items-center z-[1] font-semibold text-xl gap-1'>
                    <p>{name}</p>
                    <p>{quantity}</p>
                </div>
                <div className='flex items-center flex-col z-[1]'>
                    <Button variant='ghost'>
                        Перейти в раздел
                        <ArrowBigRightIcon />
                    </Button>
                </div>
            </div>
        </>
    );
}

export function TypeCatalog() {
    const [data, setData] = useState<Data[] | null>(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/get-type-catalog')
            .then((response) => response.json())
            .then((result: Data[]) => {
                setData(result);
                console.log(result);
                setLoad(false);
            });
    }, []);

    return (
        <>
            {load ? (
                <div></div>
            ) : (
                <div className='max-w-[750px] m-auto antialiased mt-[7rem] mb-[7rem]'>
                    <p className='text-xl font-semibold mb-[2rem]'>Каталог</p>
                    <div className='grid grid-flow-row auto-cols-max gap-10 md:grid-cols-2 lg:grid-cols-3'>
                        {data && data?.length > 0 ? (
                            data.map((i) => (
                                <Card
                                    key={i.id}
                                    id={i.id}
                                    name={i.name}
                                    quantity={i.quantity}
                                    image={i.image}
                                />
                            ))
                        ) : (
                            <div>
                                Каталог пока что пуст. Приносим свои извинения
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
