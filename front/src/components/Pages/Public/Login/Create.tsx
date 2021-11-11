import { memo } from 'react';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import PasswordField from '@eduzz/houston-ui/Forms/Password';
import TextField from '@eduzz/houston-ui/Forms/Text';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import textCounter from '@/helpers/textCounter';
import IUser from '@/interfaces/models/user';
import authService from '@/services/auth';

interface IProps extends IStyledProp {
  onCancel: () => void;
}

const LoginForm: React.FC<IProps> = ({ onCancel, className }) => {
  const form = useForm<IUser>({
    validationSchema: yup =>
      yup.object().shape({
        name: yup.string().required().min(3).max(250),
        email: yup.string().required().email().max(250),
        password: yup.string().required().min(6)
      }),
    async onSubmit(model) {
      await authService.create(model);
    }
  });

  return (
    <Form context={form} className={className}>
      <Typography size='large' fontWeight='bold' className='title'>
        Criar conta
      </Typography>
      <Typography className='subtitle'>Não possui uma conta? Cadastre-se agora</Typography>

      <TextField name='name' label='Nome' helperText={textCounter(form.values.name, 250)} />
      <TextField name='email' label='Email' type='email' helperText={textCounter(form.values.email, 250)} />
      <PasswordField label='Senha' name='password' />

      <Button disabled={form.isSubmitting} type='submit' fullWidth>
        Cadastrar
      </Button>

      <Typography className='link' onClick={onCancel}>
        Já possui uma conta? <span>Clique aqui</span>
      </Typography>
    </Form>
  );
};

export default styled(memo(LoginForm))`
  & .resetButton {
    cursor: pointer;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    color: ${({ theme }) => theme.colors.primary.main};
    float: right;
  }
`;
