import { useCallback, useState } from 'react';

import CardContent from '@mui/material/CardContent';
import { useSelector } from 'react-redux';

import Button from '@eduzz/houston-ui/Button';
import Grid from '@eduzz/houston-ui/Grid';
import Typography from '@eduzz/houston-ui/Typography';

import AutoCompleteRedux from './AutoCompleteRedux';

import authService from '@/services/auth';
import { selectorIsAuthenticated } from '@/store/selectors';

const ReduxExample = () => {
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector(selectorIsAuthenticated);

  const onLogin = useCallback(async () => {
    setLoading(true);
    await authService.login('teste@eduzz.com', 'senha123');
    setLoading(false);
  }, []);

  const onLogout = useCallback(() => authService.logout(), []);

  return (
    <>
      <CardContent>
        <Typography size='medium'>Redux</Typography>
        <ul>
          <li>Recomendado para estados globais.</li>
          <li>Para componentes de “página” usamos uma única vez, nesse caso iniciar e limpar usando o useEffect.</li>
          <li>Possibilidade de simplificar os services e usar promises.</li>
        </ul>
      </CardContent>
      <CardContent>
        <Typography fontWeight='bold' marginBottom>
          👍 Exemplo Recomendado: Login e autenticação do usuário.
        </Typography>
        <Typography marginBottom>Autênticado: {isAuthenticated ? 'Sim' : 'Não'}</Typography>
        <Button onClick={onLogin} loading={loading} disabled={loading}>
          Entrar
        </Button>
        &nbsp;
        <Button onClick={onLogout} disabled={loading}>
          Sair
        </Button>
      </CardContent>

      <CardContent>
        <Typography fontWeight='bold' marginBottom>
          👎 Exemplo Não Recomendado: Componentes compartilhados que podem ser utilizados mais de uma vez.
        </Typography>
        <ul>
          <li>
            Como podem ver abaixo o conteúdo de uma instância é compartilhado com a outra, pois ambos usam o redux como
            base. Nessa caso é melhor utilizar o Context API.
          </li>
        </ul>
      </CardContent>

      <Grid.Row>
        <Grid.Column xs={true}>
          <AutoCompleteRedux />
        </Grid.Column>
        <Grid.Column xs={true}>
          <AutoCompleteRedux />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default ReduxExample;
