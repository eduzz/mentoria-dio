import { memo, useEffect, useMemo, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';

import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';

const useStyle = createUseStyles(theme => ({
  loader: {
    width: 70,
    height: 70,
    color: theme.colors.secondary.light
  },
  paper: {
    boxShadow: 'none',
    outline: 'none',
    backgroundColor: 'transparent'
  }
}));

let promiseIncremeter = 0;
let callbackChange: (show: boolean) => void;

type LoaderComponent = ReturnType<typeof memo> & {
  show?: (ref: string) => void;
  hide?: (ref: string) => void;
  promise?: <T>(promise: Promise<T>) => Promise<T>;
};

const Loader: LoaderComponent = memo((props: Record<string, never>) => {
  const classes = useStyle(props);
  const [visible, setVisible] = useState(false);

  const paperProps = useMemo(() => ({ className: classes.paper }), [classes.paper]);

  useEffect(() => {
    callbackChange = show => setVisible(show);
    return () => (callbackChange = null);
  }, []);

  return (
    <Dialog open={visible || false} PaperProps={paperProps}>
      <CircularProgress className={classes.loader} size='large' color='inherit' />
    </Dialog>
  );
});

const refs: Set<string> = new Set();

Loader.show = ref => {
  refs.add(ref);
  callbackChange && callbackChange(refs.size > 0);
};

Loader.hide = ref => {
  refs.delete(ref);
  callbackChange && callbackChange(refs.size > 0);
};

Loader.promise = promise => {
  const key = `promise-${++promiseIncremeter}`;
  Loader.show(key);

  promise.finally(() => Loader.hide(key));
  return promise;
};

export default Loader;
