// context/ScrollContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type ScrollContextType = {
  isScrollingTree: boolean;
  setIsScrollingTree: (value: boolean) => void;
  isHeaderVisible: boolean;
  setIsHeaderVisible: (value: boolean) => void;
};

const ScrollContext = createContext<ScrollContextType>({
  isScrollingTree: false,
  setIsScrollingTree: () => {},
  isHeaderVisible: true,
  setIsHeaderVisible: () => {},
});

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isScrollingTree, setIsScrollingTree] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  return (
    <ScrollContext.Provider
      value={{
        isScrollingTree,
        setIsScrollingTree,
        isHeaderVisible,
        setIsHeaderVisible,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export const useScrollContext = () => useContext(ScrollContext);