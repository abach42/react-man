import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PageMeta } from './PageMeta';

interface PageContextProps {
  page: number;
  setPage: (page: number) => void;
  pageMeta: PageMeta | null;
  setPageMeta: (pageMeta: PageMeta) => void;
}

const PageContext = createContext<PageContextProps | undefined>(undefined);

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [page, setPage] = useState(1);
  const [pageMeta, setPageMeta] = useState<PageMeta | null>(null);

  return (
    <PageContext.Provider value={{ page, setPage, pageMeta, setPageMeta }}>
      {children}
    </PageContext.Provider>
  );
};
