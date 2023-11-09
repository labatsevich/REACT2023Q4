import { ReactNode, createContext, useContext, useState } from 'react';
import { IAnime } from '../types';

type ContextType = {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  data: Array<IAnime>;
  setData: React.Dispatch<React.SetStateAction<Array<IAnime>>>;
};

const initContext: ContextType = {
  term: '',
  setTerm: () => {},
  data: [],
  setData: () => {},
};

export const AppContext = createContext<ContextType>(initContext);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [term, setTerm] = useState<string>('');
  const [data, setData] = useState<Array<IAnime>>([]);

  const value: ContextType = {
    term,
    setTerm,
    data,
    setData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error('App context should be used within AppContextProvider');
  return ctx;
}
