import { Mail, MessageSquareMoreIcon, Phone } from 'lucide-react';

export function Footer() {
    return (
        <>
            <footer className='flex flex-row justify-around p-10 border-t-slate-600 border-t-[1px]'>
                <div className='flex flex-col gap-2'>
                    <a href='/'>
                        <img className=' w-[7.5rem]' src='../images/logo.png' />
                    </a>
                    <div className='flex flex-row gap-5'>
                        <Phone />
                        <p className='cursor-pointer'>+7 (495) 246-20-20</p>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <Phone />
                        <p className='cursor-pointer'>+7 (495) 536-65-10</p>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <Mail />
                        <p className='cursor-pointer'>info@sahara-pack.ru</p>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <MessageSquareMoreIcon />
                        <p className='cursor-pointer'>Обратная связь</p>
                    </div>
                    <div></div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='font-bold'>Основное меню</p>
                    <a href=''>О нас</a>
                    <a href=''>Пленка ПЭТ</a>
                    <a href=''>Металлообработка</a>
                    <a href=''>Новинки</a>
                    <a href=''>Новости</a>
                    <a href=''>Фотогалерея</a>
                    <a href=''>Контакты</a>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='font-bold'>Каталог</p>
                    <a href=''>Типовая упаковка</a>
                    <a href=''>Пищевая упаковка</a>
                    <a href=''>Блистерная упаковка</a>
                    <a href=''>Упаковка для фруктов и ягод</a>
                    <a href=''>Промоупаковка</a>
                    <a href=''>Упаковка разного назначения</a>
                </div>
            </footer>
        </>
    );
}
