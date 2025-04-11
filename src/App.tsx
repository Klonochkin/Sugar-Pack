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
            <main className='max-w-[750px] m-auto antialiased'>
                <Control />
            </main>
        </CurrentPageContext.Provider>
    );
}
