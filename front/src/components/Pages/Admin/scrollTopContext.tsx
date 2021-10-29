import { createContext, useContext } from 'react';

export const ScrollTopContext = createContext<() => void>(() => null);

export default function useScrollTop() {
  return useContext(ScrollTopContext);
}
