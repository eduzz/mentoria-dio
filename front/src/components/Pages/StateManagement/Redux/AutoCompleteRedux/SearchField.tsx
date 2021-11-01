import { memo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchOutline from '@eduzz/houston-icons/SearchOutline';
import TextField from '@eduzz/houston-ui/Forms/Text';

import RenderCounter from '../../RenderCounter';

import { autoCompleteSlice } from '@/store/slices/autoComplete';

const SearchField = () => {
  const search = useSelector(state => state.autoComplete.search);
  const dispatch = useDispatch();

  return (
    <>
      <TextField
        placeholder='Pesquisar'
        value={search}
        onChange={search => dispatch(autoCompleteSlice.actions.set(search))}
        endAdornment={<SearchOutline />}
      />
      <RenderCounter />
    </>
  );
};

export default memo(SearchField);
