// import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { ArrowBigRightIcon } from 'lucide-react';

function Card({ name, image }: { name: string; image: string }) {
    // const navigate = useNavigate();
    //border-orange-400 border-[2px]
    return (
        <>
            <div
                // onClick={() => navigate(`/catalog/${path}`)}
                className='relative border w-[15rem] h-[15rem] flex flex-col justify-between p-5 before:content-[""] before:bg-gray-700 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:opacity-50 text-center cursor-pointer'
                style={{ backgroundImage: `url('../images/${image}')` }}>
                <div className='flex flex-col items-center z-[1] font-semibold text-xl gap-1'>
                    <p>{name}</p>
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

export function TipovayaUpakovka() {
    const direction = [
        {
            name: 'Типовая упаковка 1',
            image: 'cardImage1.jpg',
        },
    ];
    return (
        <>
            <div className='max-w-[750px] m-auto antialiased mt-[7rem] mb-[7rem]'>
                <p className='text-xl font-semibold mb-[2rem]'>
                    Типовая упаковка
                </p>
                <div className='grid grid-flow-row auto-cols-max gap-10 md:grid-cols-2 lg:grid-cols-3'>
                    {direction.map((i) => (
                        <Card name={i.name} image={i.image} />
                    ))}
                </div>
            </div>
        </>
    );
}
