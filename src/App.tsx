import { useState } from 'react';
import { CurrentPageContext } from '@/components/current-page-context.tsx';
import { AuthForm } from './components/auth-form';
import { TypeCatalog } from './components/type-catalog';
import { ListOrder } from './components/list-orders';
import { Routes, Route } from 'react-router';
import { NavigationMenuHeader } from './components/header-navigation';
import { LandingPage } from './components/landing-page';
import { Footer } from './components/footer';
import { ProductCatalog } from './components/product-catalog';
import { Order } from './components/order';

function Control() {
    return (
        <div>
            <div className='fixed w-screen top-0 left-0 h-[5rem] bg-[#141414] z-[2]'>
                <div className='flex flex-row items-center justify-center h-full w-full place-content-between gap-[2.5rem]'>
                    <NavigationMenuHeader />
                </div>
            </div>
            <div className='flex gap-4 flex-col min-h-[100vh]'>
                <Routes>
                    <Route path='/' element={<LandingPage />}></Route>
                    <Route path='/login' element={<AuthForm />}></Route>
                    <Route path='/catalog' element={<TypeCatalog />}></Route>
                    <Route path='/order' element={<ListOrder />}></Route>
                    <Route
                        path='/catalog/*'
                        element={<ProductCatalog />}></Route>
                    <Route path='/order/*' element={<Order />}></Route>
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default function App() {
    const [currentPage, setCurrentPage] = useState(0);
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('user');

    return (
        <CurrentPageContext.Provider
            value={{
                currentPage,
                login,
                email,
                phone,
                role,
                setLogin,
                setEmail,
                setPhone,
                setCurrentPage,
                setRole,
            }}>
            <main className='relative overflow-x-hidden'>
                <Control />
            </main>
        </CurrentPageContext.Provider>
    );
}
