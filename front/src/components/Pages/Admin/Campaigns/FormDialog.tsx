import { useCallback, memo } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Toast from '@eduzz/houston-ui/Toast';

import IUser from '@/interfaces/models/user';
import userService from '@/services/user';

interface IProps extends IStyledProp {
  opened: boolean;
  user?: IUser;
  onComplete: (user: IUser) => void;
  onCancel: () => void;
}

const FormDialog: React.FC<IProps> = ({ opened, user, onComplete, onCancel, className }) => {
  const form = useForm<IUser>({
    validationSchema: yup =>
      yup.object().shape({
        name: yup.string().required().min(3).max(250),
        email: yup.string().required().email().max(250),
        roles: yup.array().required().min(1)
      }),
    async onSubmit(model) {
      const user = await userService.save(model);
      Toast.success(`${user.name} foi salvo${model.id ? '' : ', um email foi enviado com a senha'}`);
      onComplete(user);
    }
  });

  const handleEnter = useCallback(() => {
    form.setValues(user ?? {}, false);
  }, [form, user]);

  const handleExited = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <Dialog open={opened} disableEscapeKeyDown TransitionProps={{ onEnter: handleEnter, onExited: handleExited }}>
      {form.isSubmitting && <LinearProgress color='primary' />}

      <Form context={form} className={className}>
        <DialogTitle>{form.values.id ? 'Editar' : 'Novo'} Usuário</DialogTitle>
        <DialogContent className='content'>
          <TextField label='Nome' name='name' />
          <TextField label='Email' name='email' type='email' />
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={onCancel}>
            Cancelar
          </Button>
          <Button type='submit' disabled={form.isSubmitting}>
            Salvar
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default styled(memo(FormDialog))`
  & .content {
    width: 600;
    max-width: calc(95vw - 50px);
  }
`;
