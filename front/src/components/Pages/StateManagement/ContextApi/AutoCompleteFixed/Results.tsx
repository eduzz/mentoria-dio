import { memo } from 'react';

import { useContextSelector } from 'use-context-selector';

import Typography from '@eduzz/houston-ui/Typography';

import RenderCounter from '../../RenderCounter';
import AutoCompleteContext from './context';

const Results = () => {
  const search = useContextSelector(AutoCompleteContext, context => context.search);

  return (
    <>
      <Typography>
        Você está procurando por: <strong>{search}</strong>
      </Typography>
      <RenderCounter />
    </>
  );
};

export default memo(Results);
