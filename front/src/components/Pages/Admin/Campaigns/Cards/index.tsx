import { memo } from 'react';

import CartOutlineIcon from '@eduzz/houston-icons/CartOutline';
import MoneyIcon from '@eduzz/houston-icons/Money';
import UpdateIcon from '@eduzz/houston-icons/Update';
import Grid from '@eduzz/houston-ui/Grid';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';

import Card from './Card';

const CampaignsCards: React.FC<IStyledProp> = ({ className }) => {
  return (
    <div className={className}>
      <Grid.Row>
        <Grid.Column xs={12} md={4}>
          <Card title='média de roi das campanhas' value={'43.2%'} icon={UpdateIcon} colored />
        </Grid.Column>
        <Grid.Column xs={12} md={4}>
          <Card title='Valor total faturado' value={'R$ 56.239,65'} icon={CartOutlineIcon} />
        </Grid.Column>
        <Grid.Column xs={12} md={4}>
          <Card title='Valor total investido' value={'R$ 18.678,94'} icon={MoneyIcon} />
        </Grid.Column>
      </Grid.Row>
    </div>
  );
};

export default styled(memo(CampaignsCards))`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;
