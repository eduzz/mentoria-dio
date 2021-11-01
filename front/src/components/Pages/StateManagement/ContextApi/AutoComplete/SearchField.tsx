import { useContext, memo } from 'react';

import SearchOutline from '@eduzz/houston-icons/SearchOutline';
import TextField from '@eduzz/houston-ui/Forms/Text';

import RenderCounter from '../../RenderCounter';
import AutoCompleteContext from './context';

const SearchField = () => {
  const { search, setSearch } = useContext(AutoCompleteContext);

  return (
    <>
      <TextField placeholder='Pesquisar' value={search} onChange={setSearch} endAdornment={<SearchOutline />} />
      <RenderCounter />
    </>
  );
};

export default memo(SearchField);
