import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Ghost, Mail, MessageCircleMore, Phone } from 'lucide-react';
import { Button } from './ui/button';

function AdvantCard({
    img,
    title,
    subtitle,
}: {
    img: string;
    title: string;
    subtitle: string;
}) {
    return (
        <>
            <div className='flex flex-col gap-5'>
                <img width='100px' src={img} />
                <p className='font-bold'>{title}</p>
                <p>{subtitle}</p>
            </div>
        </>
    );
}

export function LandingPage() {
    return (
        <>
            <div className='w-screen bg-[url(../images/119.jpg)] bg-left bg-cover h-[35rem] relative'>
                <div className='before:absolute before:w-full before:h-full before:bg-black before:opacity-[50%]' />
            </div>
            <div className='flex flex-col gap-5 max-w-[750px] m-auto antialiased mt-[4rem] mb-[7rem]'>
                <p className='text-3xl relative'>
                    <div className='before:absolute before:-left-4 before:top-0 before:h-full before:bg-[#d28e5f] before:w-[4px]' />
                    Лучшие упаковки здесь
                </p>
                <p>
                    ООО «Сахара Пак» – производитель пластиковой упаковки с
                    более чем 20-летним опытом работы. В ассортименте компании
                    представлены наиболее востребованные её типы:
                </p>
                <ul className='list-disc ml-5 mt-5'>
                    <li>
                        блистерная упаковка (подходящая для пищевых и непищевых
                        товаров самых разных размеров и формы);
                    </li>
                    <li>
                        пищевая упаковка (обеспечивающая сохранение вкуса,
                        аромата и свежести ягод, фруктов, зелени, а также
                        применяемая для полуфабрикатов, кондитерских изделий и
                        мороженого);
                    </li>
                    <li>
                        промоупаковка с нанесением (идеальный вариант, при
                        котором брендирование делает упаковку эффективным
                        рекламоносителем)
                    </li>
                </ul>
                <p>
                    и многое другое. Также в ассортименте ООО «Сахара Пак»
                    представлены разные типы плёнки ПЭТ, находящей применение
                    при упаковке, транспортировке, складировании товаров, а
                    также в производстве.
                </p>
                {}
                <p className='text-3xl relative mt-5'>
                    <div className='before:absolute before:-left-4 before:top-0 before:h-full before:bg-[#d28e5f] before:w-[4px]' />
                    Преимущества сотрудничества с заводом пластиковой упаковки
                </p>
                <p>
                    ООО «Сахара Пак» – производитель, отвечающий за качество
                    своей продукции, соблюдение всех условий договоров и сроков.
                    Клиенты организации могут быть уверены, что получат товар и
                    сервис высшего уровня.
                </p>
                <ul className='list-disc ml-5 mt-5'>
                    <li>
                        Производство пластиковой упаковки полного цикла – работы
                        над созданием пластиковой упаковки от разработки макета
                        на основании пожеланий заказчика до выпуска необходимого
                        тиража точно в срок.
                    </li>
                    <li>
                        Только качественные материалы, современное и точное
                        оборудование от ведущих производителей отрасли. Всё
                        сырьё проходит контроль качества и имеет Сертификаты
                        соответствия.
                    </li>
                    <li>
                        Разнообразие сырья: плёнки ПЭТ, ПЭФТ, ПС, ВОРР, ПВХ
                        разных технических характеристик и оттенков, с
                        брендированием упаковки или без него.
                    </li>
                    <li>
                        Контроль качества – вся продукция подвергается строгому
                        внутреннему контролю качества на всех этапах
                        производства.
                    </li>
                    <li>
                        Индивидуальный подход – специалисты предлагают
                        оптимальные решения по объёмам и стоимости партий,
                        материалам, форме и оформлению упаковки, исходя из
                        специфики бизнеса заказчиков.
                    </li>
                </ul>
                <p className='text-3xl relative mt-5'>
                    <div className='before:absolute before:-left-4 before:top-0 before:h-full before:bg-[#d28e5f] before:w-[4px]' />
                    Наши преимущества
                </p>
                <div className='grid grid-flow-row auto-cols-max gap-10 md:grid-cols-2 lg:grid-cols-3'>
                    <AdvantCard
                        img='../images/exchange.png'
                        title='Производство полного цикла'
                        subtitle='От создания макета до изготовления тиража'
                    />
                    <AdvantCard
                        img='../images/clipb.png'
                        title='Контроль качества'
                        subtitle='Постоянный строгий контроль качества оказания услуг на всех этапах'
                    />
                    <AdvantCard
                        img='../images/individ.png'
                        title='Индивидуальный подход'
                        subtitle='Индивидуальный подход к каждому клиенту'
                    />
                </div>
            </div>
            <div className=' relative before:absolute before:w-full before:h-full before:bg-[url(../images/bg2_1903x620_eeb.jpg)] before:-z-10 before:opacity-30'>
                <div className='max-w-[750px] m-auto antialiased mt-[7rem] mb-[7rem] flex flex-row justify-around items-center'>
                    <div className='w-[50%] flex flex-col gap-5'>
                        <div>
                            <p className='text-4xl font-bold'>
                                Не знаете с чего начать?
                            </p>
                            <p className='text-4xl text-[#d28e5f] font-bold'>
                                Напишите нам!
                            </p>
                        </div>
                        <div>
                            <p>
                                Специалисты готовы помогать Вам на каждом этапе
                                развития, что крайне выгодно в первую очередь с
                                экономической точки зрения.
                            </p>
                        </div>
                    </div>
                    <div className='w-[50%]'>
                        <form className='flex flex-col gap-5'>
                            <div className='flex flex-row items-center gap-5'>
                                <Label htmlFor='name' className='text-right'>
                                    <Ghost />
                                </Label>
                                <Input
                                    id='name'
                                    placeholder='Ваше имя*'
                                    type='text'
                                    className='col-span-3'
                                />
                            </div>
                            <div className='flex flex-row items-center gap-5'>
                                <Label htmlFor='email' className='text-right'>
                                    <Mail />
                                </Label>
                                <Input
                                    id='email'
                                    placeholder='Ваша почта*'
                                    type='email'
                                    className='col-span-3'
                                />
                            </div>
                            <div className='flex flex-row items-center gap-5'>
                                <Label htmlFor='tel' className='text-right'>
                                    <Phone />
                                </Label>
                                <Input
                                    id='tel'
                                    placeholder='Ваш телефон*'
                                    type='tel'
                                    className='col-span-3'
                                />
                            </div>
                            <div className='flex flex-row items-center gap-5'>
                                <Label htmlFor='message' className='text-right'>
                                    <MessageCircleMore />
                                </Label>
                                <Input
                                    id='message'
                                    placeholder='Ваше сообщение*'
                                    type='text'
                                    className='col-span-3'
                                />
                            </div>
                            <Button
                                variant='outline'
                                className='bg-[#d28e5f] flex flex-row justify-center items-center'>
                                <p className='text-white text-xl font-bold'>
                                    Отправить сообщение
                                </p>
                            </Button>
                            <div className='text-[13px] text-gray-400'>
                                <span>
                                    Нажимая кнопку “Отправить сообщение”, вы
                                    соглашаетесь с условиями пользовательского
                                    соглашения
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
