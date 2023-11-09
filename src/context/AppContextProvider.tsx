import { ReactNode, createContext, useContext, useState } from 'react';
import { IAnime } from '../types';

type ContextType = {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  data: Array<IAnime>;
  setData: React.Dispatch<React.SetStateAction<Array<IAnime>>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const initContext: ContextType = {
  term: '',
  setTerm: () => {},
  data: [],
  setData: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
};

export const AppContext = createContext<ContextType>(initContext);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [term, setTerm] = useState<string>('');
  const [data, setData] = useState<Array<IAnime>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const value: ContextType = {
    term,
    setTerm,
    data,
    setData,
    currentPage,
    setCurrentPage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error('App context should be used within AppContextProvider');
  return ctx;
}
