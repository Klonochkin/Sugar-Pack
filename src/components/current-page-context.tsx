import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextType {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

const initialContextValue: ContextType = {
    currentPage: 0,
    setCurrentPage: () => {},
};

export const CurrentPageContext =
    createContext<ContextType>(initialContextValue);
