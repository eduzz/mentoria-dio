import { useState, useCallback, memo } from 'react';

import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@eduzz/houston-ui/Button';

import RenderCounter from '../../RenderCounter';
import Results from './Results';
import SearchField from './SearchField';

import { autoCompleteSlice } from '@/store/slices/autoComplete';

const AutoComplete = () => {
  const [outsideCounter, setOutsideCounter] = useState(0);
  const dispatch = useDispatch();

  const counter = useSelector(state => state.autoComplete.counter);

  const addCounter = useCallback(() => dispatch(autoCompleteSlice.actions.addCounter()), [dispatch]);
  const addOutsideCounter = useCallback(() => setOutsideCounter(counter => ++counter), []);

  return (
    <>
      <CardContent>
        <RenderCounter />
      </CardContent>

      <Divider />

      <CardContent>
        <SearchField />
      </CardContent>

      <Divider />

      <CardContent>
        <Results />
      </CardContent>

      <Divider />

      <CardContent>
        <Button onClick={addCounter}>Add Counter: {counter}</Button>&nbsp;
        <Button onClick={addOutsideCounter}>Add Outside: {outsideCounter}</Button>
      </CardContent>
    </>
  );
};

export default memo(AutoComplete);
