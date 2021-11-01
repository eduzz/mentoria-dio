import { memo, useContext } from 'react';

import Typography from '@eduzz/houston-ui/Typography';

import RenderCounter from '../../RenderCounter';
import AutoCompleteContext from './context';

const Results = () => {
  const { search } = useContext(AutoCompleteContext);

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
