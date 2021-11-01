import { useRef } from 'react';

import Typography from '@eduzz/houston-ui/Typography';

const RenderCounter = () => {
  const render = useRef(0);
  render.current++;

  return (
    <Typography size='x-small'>
      renders: <strong>{render.current}</strong>
    </Typography>
  );
};

export default RenderCounter;
