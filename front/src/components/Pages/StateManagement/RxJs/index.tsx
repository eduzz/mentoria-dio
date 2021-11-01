import { useCallback, useState } from 'react';

import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

import useObservable from '@eduzz/houston-hooks/useObservable';
import useObservableCallback from '@eduzz/houston-hooks/useObservableCallback';
import Button from '@eduzz/houston-ui/Button';
import Typography from '@eduzz/houston-ui/Typography';

import RenderCounter from '../RenderCounter';
import Results from './Results';
import SearchField from './SearchField';
import autoCompleteService from './service';

const RxJs = () => {
  const [outsideCounter, setOutsideCounter] = useState(0);

  const [counter] = useObservable(() => autoCompleteService.getCounter(), []);

  const [addCounter] = useObservableCallback(() => autoCompleteService.addCounter(), []);
  const addOutsideCounter = useCallback(() => setOutsideCounter(counter => ++counter), []);

  return (
    <>
      <CardContent>
        <Typography size='medium'>RxJs</Typography>
        <ul>
          <li>Usar conforme a necessidade e conhecimento.</li>
          <li>Ótimo para observar e reagir a mudança de estados complexas.</li>
          <li>Brilha com o operadores.</li>
        </ul>
      </CardContent>

      <CardContent>
        <Typography>
          Nesse exemplo abaixo, foi adicionado uma validação de no mínino 3 caracteres e um delay de 2s,{' '}
          <strong>
            mas cuidado! ele tem o mesmo comportamento do redux, de compartilhar os estados entre as instâncias.
          </strong>
        </Typography>
      </CardContent>

      <CardContent>
        <RenderCounter />
      </CardContent>

      <Divider />

      <CardContent>
        <SearchField />
      </CardContent>

      <Divider />

      <CardContent>
        <Results />
      </CardContent>

      <Divider />

      <CardContent>
        <Button onClick={addCounter}>Add Counter: {counter}</Button>&nbsp;
        <Button onClick={addOutsideCounter}>Add Outside: {outsideCounter}</Button>
      </CardContent>
    </>
  );
};

export default RxJs;
