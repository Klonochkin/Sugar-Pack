import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextType {
    currentPage: number;
    login: string;
    email: string;
    phone: string;
    role: string;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setLogin: Dispatch<SetStateAction<string>>;
    setEmail: Dispatch<SetStateAction<string>>;
    setPhone: Dispatch<SetStateAction<string>>;
    setRole: Dispatch<SetStateAction<string>>;
}

const initialContextValue: ContextType = {
    currentPage: 0,
    login: '',
    email: '',
    phone: '',
    role: '',
    setCurrentPage: () => {},
    setLogin: () => {},
    setEmail: () => {},
    setPhone: () => {},
    setRole: () => {},
};

export const CurrentPageContext =
    createContext<ContextType>(initialContextValue);
