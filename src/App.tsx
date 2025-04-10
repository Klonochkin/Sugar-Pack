import { useEffect, useState } from 'react';

interface ApiResponse {
    message: string;
}

export default function App() {
    const [data, setData] = useState<ApiResponse | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/')
            .then((response) => response.json())
            .then((result: ApiResponse) => setData(result));
    }, []);
    return (
        <div className='text-center'>
            Пока
            <pre>{JSON.stringify(data?.message, null, 2)}</pre>
        </div>
    );
}
