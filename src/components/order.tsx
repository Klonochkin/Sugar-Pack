import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { ArrowBigLeftIcon } from 'lucide-react';
import { OrderForm } from './order-form';
import { Feedback } from './feedback';

interface Data {
    id: string;
    name: string;
    image: string;
    description: string;
}
interface Feature {
    nameFeature: string;
    discFeature: string;
}

export function Order() {
    const navigate = useNavigate();
    const [data, setData] = useState<Data[] | null>(null);
    const [feature, setFeature] = useState<Feature[] | null>(null);
    const [isDescription, setIsDescription] = useState(true);
    const location = useLocation();
    location;
    const path = location.pathname.split('/');
    const id = path[path.length - 1];

    useEffect(() => {
        fetch(`http://localhost:8000/api/get-product/${id}`)
            .then((response) => response.json())
            .then((result: Data[]) => {
                setData(result);
            });
        fetch(`http://localhost:8000/api/get-feature/${id}`)
            .then((response) => response.json())
            .then((result: Feature[]) => {
                setFeature(result);
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
                        <Button
                            variant='ghost'
                            onClick={() => setIsDescription(true)}>
                            Описание
                        </Button>
                        <Button
                            variant='ghost'
                            onClick={() => setIsDescription(false)}>
                            Характеристики
                        </Button>
                    </div>
                    <Feedback />
                </div>
                <div className='mt-5'>
                    {isDescription ? (
                        <p>
                            {data && data[0].description
                                ? data[0].description
                                : 'Описание временно отсутствует'}
                        </p>
                    ) : feature && feature?.length > 0 ? (
                        feature.map((i) => (
                            <div>
                                {i.nameFeature}: {i.discFeature}
                            </div>
                        ))
                    ) : (
                        'Характеристики временно отсутствуют'
                    )}
                </div>
            </div>
        </>
    );
}
