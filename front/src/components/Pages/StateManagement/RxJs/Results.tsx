import { memo } from 'react';

import useObservable from '@eduzz/houston-hooks/useObservable';
import Typography from '@eduzz/houston-ui/Typography';

import RenderCounter from '../RenderCounter';
import autoCompleteService from './service';

const Results = () => {
  const [search] = useObservable(() => autoCompleteService.getSearchResult(), []);

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
