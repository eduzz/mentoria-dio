import { memo, useMemo } from 'react';

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

import authService from '@/services/auth';

interface IProps extends IStyledProp {
  opened: boolean;
  onComplete: () => void;
}

interface IModel {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordDialog: React.FC<IProps> = ({ opened, onComplete, className }) => {
  const form = useForm<IModel>({
    validationSchema: yup =>
      yup.object().shape({
        currentPassword: yup.string().required(),
        newPassword: yup.string().required().min(5).max(25),
        confirmPassword: yup
          .string()
          .required()
          .oneOf([yup.ref('newPassword'), null], 'Não confere')
      }),
    async onSubmit(model) {
      await authService.changePassword(model.currentPassword, model.newPassword);
      Toast.success('Senha alterada com sucesso!');
    }
  });

  const TransitionProps = useMemo(() => ({ onExited: () => form.reset() }), [form]);

  return (
    <Dialog open={opened} TransitionProps={TransitionProps} className={className}>
      {form.isSubmitting && <LinearProgress color='primary' />}

      <Form context={form}>
        <DialogTitle>Trocar Senha</DialogTitle>

        <DialogContent className='content'>
          <TextField label='Senha Atual' type='password' name='currentPassword' />
          <TextField label='Nova senha' type='password' name='newPassword' />
          <TextField label='Repita a senha' type='password' name='confirmPassword' />
        </DialogContent>

        <DialogActions>
          <Button disabled={form.isSubmitting} variant='text' onClick={onComplete}>
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

export default styled(memo(ChangePasswordDialog))`
  & .content {
    width: 400px;
    max-width: calc(95vw - 50px);
  }
`;
