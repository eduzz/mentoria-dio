import { createContext } from 'react';

export interface IAutoCompleteContext {
  search: string;
  counter: number;
  setSearch: (value: string) => void;
}

const AutoCompleteContext = createContext<IAutoCompleteContext>({
  search: null,
  counter: 0,
  setSearch: () => null
});

export default AutoCompleteContext;
