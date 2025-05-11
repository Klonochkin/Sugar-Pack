import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextType {
    currentPage: number;
    role: string;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setRole: Dispatch<SetStateAction<string>>;
}

const initialContextValue: ContextType = {
    currentPage: 0,
    role: '',
    setCurrentPage: () => {},
    setRole: () => {},
};

export const CurrentPageContext =
    createContext<ContextType>(initialContextValue);
