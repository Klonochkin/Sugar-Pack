import { useContext, useEffect, useState } from 'react';
import { CurrentPageContext } from '@/components/current-page-context.tsx';
import { AuthForm } from './components/auth-form';

interface ApiResponse {
    message: string;
}

function Control() {
    const { currentPage } = useContext(CurrentPageContext);

    return (
        <div>
            <div className='fixed w-screen top-0 left-0 h-[5rem] bg-[#141414]'>
                <div className='flex flex-row items-center justify-center h-full w-full place-content-between gap-[5rem]'>
                    <img
                        className='cursor-pointer w-[8rem]'
                        src='../images/logo.png'
                        alt=''
                    />
                    <p className='cursor-pointer'>+7 (495) 246-20-20</p>
                    <p className='cursor-pointer'>+7 (495) 536-65-10</p>
                    <p className='cursor-pointer'>info@sahara-pack.ru</p>
                </div>
            </div>
            <div className='flex gap-4 flex-col'>
                {currentPage >= 0 && currentPage <= 1 && <AuthForm />}
            </div>
        </div>
    );
}

export default function App() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/')
            .then((response) => response.json())
            .then((result: ApiResponse) => setData(result));
    }, []);
    return (
        <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            <main className='max-w-[750px] m-auto antialiased relative'>
                <Control />
            </main>
        </CurrentPageContext.Provider>
    );
}
