import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowBigLeftIcon, ArrowBigRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

interface Data {
    id: string;
    name: string;
    image: string;
}

function Card({
    id,
    name,
    image,
}: {
    id: string;
    name: string;
    image: string;
}) {
    const navigate = useNavigate();
    return (
        <>
            <div
                onClick={() => navigate(`/order/${id}`)}
                className='relative bg-cover bg-center w-[15rem] h-[15rem] flex flex-col justify-between p-5 before:content-[""] before:bg-gray-700 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:opacity-50 text-center cursor-pointer border-orange-400 border-[2px]'
                style={{ backgroundImage: `url('../images/${image}')` }}>
                <div className='flex flex-col items-center z-[1] font-semibold text-xl gap-1'>
                    <p>{name}</p>
                </div>
                <div className='flex items-center flex-col z-[1]'>
                    <Button variant='ghost'>
                        Подробнее
                        <ArrowBigRightIcon />
                    </Button>
                </div>
            </div>
        </>
    );
}
export function ProductCatalog() {
    const navigate = useNavigate();
    const [data, setData] = useState<Data[] | null>(null);
    const [load, setLoad] = useState(true);
    const location = useLocation();
    location;
    const path = location.pathname.split('/');
    const id = path[path.length - 1];

    useEffect(() => {
        fetch(`http://localhost:8000/api/get-product-catalog/${id}`)
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
                    <Button
                        variant='ghost'
                        className='mb-[2rem]'
                        onClick={() => {
                            navigate(-1);
                        }}>
                        <ArrowBigLeftIcon /> Назад
                    </Button>
                    {/* <p className='text-xl font-semibold mb-[2rem]'></p> */}
                    <div className='grid grid-flow-row auto-cols-max gap-10 md:grid-cols-2 lg:grid-cols-3'>
                        {data && data.length > 0 ? (
                            data.map((i) => (
                                <Card
                                    key={i.id}
                                    id={i.id}
                                    name={i.name}
                                    image={i.image}
                                />
                            ))
                        ) : (
                            <div>Товар временно отсутствует</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
