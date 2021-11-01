import { memo, useCallback } from 'react';

import useObservable from '@eduzz/houston-hooks/useObservable';
import SearchOutline from '@eduzz/houston-icons/SearchOutline';
import TextField from '@eduzz/houston-ui/Forms/Text';

import RenderCounter from '../RenderCounter';
import autoCompleteService from './service';

const SearchField = () => {
  const [search] = useObservable(() => autoCompleteService.getSearch(), []);
  const setSearch = useCallback((value: string) => autoCompleteService.setSearch(value), []);

  return (
    <>
      <TextField placeholder='Pesquisar' value={search} onChange={setSearch} endAdornment={<SearchOutline />} />
      <RenderCounter />
    </>
  );
};

export default memo(SearchField);
