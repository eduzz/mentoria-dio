import { memo, MouseEvent } from 'react';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Toast from '@eduzz/houston-ui/Toast';
import Typography from '@eduzz/houston-ui/Typography';

import authService from '@/services/auth';

interface IProps extends IStyledProp {
  onCancel: (e: MouseEvent<HTMLElement>) => void;
  onComplete: () => void;
}

const LoginRecoveryAccess: React.FC<IProps> = ({ onComplete, onCancel, className }) => {
  const form = useForm({
    initialValues: { email: '' },
    validationSchema: yup => yup.object().shape({ email: yup.string().required().email() }),
    async onSubmit(model) {
      try {
        await authService.sendResetPassword(model.email);
        Toast.info('Foi enviado um link para seu email para podermos recuperar seu acesso.');
        onComplete();
        form.reset();
      } catch (err) {
        Toast.error('Não foi possível recuperar a senha.');
      }
    }
  });

  return (
    <Form context={form} className={className}>
      <Typography size='large' fontWeight='bold' className='title'>
        Esqueci minha senha
      </Typography>
      <Typography className='subtitle'>Insira seu e-mail cadastrado para recuperar sua senha</Typography>

      <TextField label='Email' type='email' name='email' disabled={form.isSubmitting} />

      <Button disabled={form.isSubmitting} loading={form.isSubmitting} type='submit' fullWidth>
        Confirmar Email
      </Button>

      <Typography className='link' onClick={onCancel}>
        Já possui uma conta? <span>Clique aqui</span>
      </Typography>
    </Form>
  );
};

export default styled(memo(LoginRecoveryAccess))``;
