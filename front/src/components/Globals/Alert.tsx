import { memo, useCallback, useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '@eduzz/houston-ui/Button';
import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';

export interface IAlertShowParams {
  message: React.ReactNode;
  title?: string;
  confirmation?: boolean;
  okMessage?: string;
}

interface IAlertShowParamsState extends IAlertShowParams {
  onConfirm: () => void;
  onCancel: () => void;
}

type AlertComponent = ReturnType<typeof memo> & {
  show?(params: string): Promise<boolean>;
  show?(params: IAlertShowParams): Promise<boolean>;

  confirm?(params: string): Promise<boolean>;
  confirm?(params: IAlertShowParams): Promise<boolean>;
};

let lastPromise = Promise.resolve(false);
let componentCallback: (params: IAlertShowParams) => Promise<boolean>;

const useStyle = createUseStyles({
  root: { zIndex: 1600 },
  content: { minWidth: '250px' }
});

const Alert: AlertComponent = memo(() => {
  const classes = useStyle();
  const [opened, setOpened] = useState<boolean>(false);
  const [params, setParams] = useState<IAlertShowParamsState>();

  const onReceiveParams = useCallback((params: IAlertShowParams): Promise<boolean> => {
    const result = new Promise<boolean>(resolve => {
      setOpened(true);
      setParams({
        confirmation: false,
        title: null,
        ...params,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
    });

    result.then(() => setOpened(false));
    return result;
  }, []);

  useEffect(() => {
    componentCallback = onReceiveParams;
    return () => (componentCallback = null);
  }, [onReceiveParams]);

  return (
    <Dialog open={opened} keepMounted onClose={params?.onCancel} className={classes.root}>
      <DialogTitle>{params?.title ?? (params?.confirmation ? 'Confirmação' : 'Atenção')}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.content}>{params?.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {params?.confirmation && (
          <Button onClick={params?.onCancel} variant='text'>
            Cancelar
          </Button>
        )}
        <Button onClick={params?.onConfirm}>{params?.okMessage ?? 'OK'}</Button>
      </DialogActions>
    </Dialog>
  );
});

function callComponent(params: IAlertShowParams): Promise<boolean> {
  if (!componentCallback) throw new Error('Please, initialize an Alert before');

  //prevent an alert to overhide another
  return (lastPromise = lastPromise.then(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 300));
    return componentCallback(params);
  }));
}

Alert.show = (params: string | IAlertShowParams) => {
  return callComponent(typeof params === 'string' ? { message: params } : params);
};

Alert.confirm = (params: string | IAlertShowParams) => {
  return callComponent({ ...(typeof params === 'string' ? { message: params } : params), confirmation: true });
};

export default Alert;
