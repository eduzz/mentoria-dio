import useMediaQuery from '@mui/material/useMediaQuery';

import { breakpoints } from '@eduzz/houston-ui/styles/styled';

export default function useBreakpoint() {
  const keys = [...breakpoints.keys].reverse();

  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}
