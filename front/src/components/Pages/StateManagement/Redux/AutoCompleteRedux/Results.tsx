import { memo } from 'react';

import { useSelector } from 'react-redux';

import Typography from '@eduzz/houston-ui/Typography';

import RenderCounter from '../../RenderCounter';

const Results = () => {
  const search = useSelector(state => state.autoComplete.search);

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
