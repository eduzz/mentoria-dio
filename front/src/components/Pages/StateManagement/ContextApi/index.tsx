import CardContent from '@mui/material/CardContent';

import Grid from '@eduzz/houston-ui/Grid';
import Typography from '@eduzz/houston-ui/Typography';

import AutoComplete from './AutoComplete';
import AutoCompleteFixed from './AutoCompleteFixed';

const ContextApi = () => {
  return (
    <>
      <CardContent>
        <Typography size='medium'>Context API</Typography>
        <ul>
          <li>Recomendado para estados de contexto de componentes usados mais de uma vez.</li>
          <li>Tomar cuidado com performance: </li>
          <ul>
            <li>Usar useMemo no valor do contexto.</li>
            <li>User useContextSelector para diminuir renders.</li>
          </ul>
        </ul>
      </CardContent>

      <CardContent>
        <Typography>Não Otimizado:</Typography>
      </CardContent>

      <AutoComplete />

      <CardContent>
        <Typography>Otimizado (como podem ver uma instância não influência na outra):</Typography>
      </CardContent>

      <Grid.Row>
        <Grid.Column xs={true}>
          <AutoCompleteFixed />
        </Grid.Column>
        <Grid.Column xs={true}>
          <AutoCompleteFixed />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default ContextApi;
