import { ArrowBigRightIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';

function Card({
    name,
    quantity,
    image,
    path,
}: {
    name: string;
    quantity: string;
    image: string;
    path: string;
}) {
    const navigate = useNavigate();
    // border-orange-400 border-[2px]
    return (
        <>
            <div
                onClick={() => navigate(`/catalog/${path}`)}
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

export function Catalog() {
    const direction = [
        {
            name: 'Типовая упаковка',
            quantity: '8шт',
            image: 'cardImage1.jpg',
            path: 'tipovaya-upakovka',
        },
        {
            name: 'Пищевая упаковка',
            quantity: '7шт',
            image: 'cardImage2.jpg',
            path: 'pishhevaya-upakovka',
        },
        {
            name: 'Блистерная упаковка',
            quantity: '11шт',
            image: 'cardImage3.jpg',
            path: 'blisternaya-upakovka',
        },
        {
            name: 'Упаковка для фруктов',
            quantity: '1шт',
            image: 'cardImage4.jpg',
            path: 'upakovka-dlya-fruktov-i-yagod',
        },
    ];
    return (
        <>
            <div className='max-w-[750px] m-auto antialiased mt-[7rem] mb-[7rem]'>
                <p className='text-xl font-semibold mb-[2rem]'>Каталог</p>
                <div className='grid grid-flow-row auto-cols-max gap-10 md:grid-cols-2 lg:grid-cols-3'>
                    {direction.map((i) => (
                        <Card
                            name={i.name}
                            quantity={i.quantity}
                            image={i.image}
                            path={i.path}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
