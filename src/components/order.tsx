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

interface Feedback {
    name: string;
    message: string;
}

export function Order() {
    const navigate = useNavigate();
    const [data, setData] = useState<Data[] | null>(null);
    const [feature, setFeature] = useState<Feature[] | null>(null);
    const [feedback, setFeedback] = useState<Feedback[] | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();
    location;
    const path = location.pathname.split('/');
    const id = path[path.length - 1];
    const [load, setLoad] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8000/api/get-product/${id}`)
            .then((response) => response.json())
            .then((result: Data[]) => {
                console.log(result);
                setData(result);
                setLoad(false);
            });
        fetch(`http://localhost:8000/api/get-feature/${id}`)
            .then((response) => response.json())
            .then((result: Feature[]) => {
                setFeature(result);
            });
        fetch(`http://localhost:8000/api/get-feedback/${id}`)
            .then((response) => response.json())
            .then((result: Feedback[]) => {
                setFeedback(result);
                console.log(result);
            });
    }, []);

    return (
        <>
            {load ? (
                <div></div>
            ) : data && data?.length > 0 ? (
                <>
                    <div className='max-w-[750px] m-auto antialiased mt-[7rem] mb-[7rem]'>
                        <Button
                            variant='ghost'
                            className='mb-[2rem]'
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
                                    onClick={() => setCurrentPage(0)}>
                                    Описание
                                </Button>
                                <Button
                                    variant='ghost'
                                    onClick={() => setCurrentPage(1)}>
                                    Характеристики
                                </Button>
                                <Button
                                    variant='ghost'
                                    onClick={() => setCurrentPage(2)}>
                                    Отзывы
                                </Button>
                                <Button
                                    variant='ghost'
                                    onClick={() => setCurrentPage(3)}>
                                    Вопросы
                                </Button>
                            </div>
                            <Feedback id={parseInt(id)} />
                        </div>
                        <div className='mt-5'>
                            {currentPage == 0 ? (
                                <p>
                                    {data && data[0].description
                                        ? data[0].description
                                        : 'Описание временно отсутствует'}
                                </p>
                            ) : currentPage == 1 ? (
                                feature && feature?.length > 0 ? (
                                    feature.map((i) => (
                                        <div>
                                            {i.nameFeature}: {i.discFeature}
                                        </div>
                                    ))
                                ) : (
                                    'Характеристики временно отсутствуют'
                                )
                            ) : currentPage == 2 ? (
                                <div>Отзывы</div>
                            ) : feedback && feedback?.length > 0 ? (
                                feedback.map((i) => (
                                    <div>
                                        {i.name}: {i.message}
                                    </div>
                                ))
                            ) : (
                                'Вопросы пока что отсутствуют'
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className='max-w-[750px] m-auto antialiased mt-[7rem] mb-[7rem]'>
                    Товар не найден
                </div>
            )}
        </>
    );
}
