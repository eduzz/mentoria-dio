import { memo } from 'react';

import { useContextSelector } from 'use-context-selector';

import SearchOutline from '@eduzz/houston-icons/SearchOutline';
import TextField from '@eduzz/houston-ui/Forms/Text';

import RenderCounter from '../../RenderCounter';
import AutoCompleteContext from './context';

const SearchField = () => {
  const search = useContextSelector(AutoCompleteContext, context => context.search);
  const setSearch = useContextSelector(AutoCompleteContext, context => context.setSearch);

  return (
    <>
      <TextField placeholder='Pesquisar' value={search} onChange={setSearch} endAdornment={<SearchOutline />} />
      <RenderCounter />
    </>
  );
};

export default memo(SearchField);
