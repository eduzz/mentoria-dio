import { useCallback, useEffect, useState } from 'react';

import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import PasswordField from '@eduzz/houston-ui/Forms/Password';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import decodeJWTToken from '@/helpers/jwt';
import IResetPasswordToken from '@/interfaces/tokens/resetPasswordToken';
import authService from '@/services/auth';
import { selectorIsAuthenticated } from '@/store/selectors';

interface IProps extends RouteComponentProps<{ t: string }>, IStyledProp {}

const NewPasswordPage: React.FC<IProps> = ({ history, location, className }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>();
  const [tokenData, setTokenData] = useState<IResetPasswordToken>();

  const isAuthenticated = useSelector(selectorIsAuthenticated);

  const form = useForm({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: yup =>
      yup.object().shape({
        password: yup.string().required().min(5).max(25),
        confirmPassword: yup
          .string()
          .required()
          .oneOf([yup.ref('password'), null], 'Não confere')
      }),
    async onSubmit(model) {
      await authService.resetPassword(token, model.password);
      await authService.login(tokenData.email, model.password);
    }
  });

  useEffect(() => {
    const token = queryString.parse(location.search).t as string;
    const tokenData = decodeJWTToken<IResetPasswordToken>(token);

    setToken(token);
    setTokenData(tokenData);
    setLoading(false);
  }, [location.search]);

  const handleBack = useCallback(() => history.push('/'), [history]);

  if (isAuthenticated) return <Redirect to='/' />;

  return (
    <div className={className}>
      {!loading && !tokenData && (
        <div>
          <Typography className='invalid-token'>Token Inválido</Typography>

          <Button type='button' fullWidth startIcon={<ChevronLeftIcon />} onClick={handleBack}>
            Voltar para o Login
          </Button>
        </div>
      )}

      {!loading && !!tokenData && (
        <Form context={form}>
          <Typography size='large' fontWeight='bold' className='title'>
            Nova Senha
          </Typography>
          <Typography className='subtitle'>Olá {tokenData?.name}, informe sua nova senha:</Typography>

          <PasswordField label='Senha' name='password' />
          <PasswordField label='Repita a senha' name='confirmPassword' />

          <Button disabled={loading || form.isSubmitting} fullWidth loading={form.isSubmitting} type='submit'>
            Salvar
          </Button>
        </Form>
      )}
    </div>
  );
};

export default styled(NewPasswordPage)`
  max-width: 400px;

  & .invalid-token {
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    text-align: center;
  }
`;
