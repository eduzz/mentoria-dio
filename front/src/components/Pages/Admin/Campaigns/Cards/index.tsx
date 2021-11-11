import { memo } from 'react';

import usePromiseRefresh from '@eduzz/houston-hooks/usePromiseRefresh';
import CartOutlineIcon from '@eduzz/houston-icons/CartOutline';
import MoneyIcon from '@eduzz/houston-icons/Money';
import UpdateIcon from '@eduzz/houston-icons/Update';
import Grid from '@eduzz/houston-ui/Grid';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';

import Card from './Card';

import { formatMoney } from '@/formatters/money';
import campaignService from '@/services/campaign';

const CampaignsCards: React.FC<IStyledProp> = ({ className }) => {
  const [roi, , roiLoading, roiRefresh] = usePromiseRefresh(async () => {
    const data = await campaignService.graphRoi();
    return (Number(data) * 100).toFixed(2) + '%';
  }, []);

  const [investment, , investmentLoading, investmentRefresh] = usePromiseRefresh(async () => {
    const data = await campaignService.graphInvestment();
    return formatMoney(data);
  }, []);

  const [revenues, , revenuesLoading, revenuesRefresh] = usePromiseRefresh(async () => {
    const data = await campaignService.graphRevenues();
    return formatMoney(data);
  }, []);

  return (
    <div className={className}>
      <Grid.Row>
        <Grid.Column xs={12} md={4}>
          <Card
            title='média de roi das campanhas'
            value={roi}
            loading={roiLoading}
            onClick={roiRefresh}
            icon={UpdateIcon}
            colored
          />
        </Grid.Column>
        <Grid.Column xs={12} md={4}>
          <Card
            title='Valor total faturado'
            value={revenues}
            loading={revenuesLoading}
            onClick={revenuesRefresh}
            icon={CartOutlineIcon}
          />
        </Grid.Column>
        <Grid.Column xs={12} md={4}>
          <Card
            title='Valor total investido'
            value={investment}
            loading={investmentLoading}
            onClick={investmentRefresh}
            icon={MoneyIcon}
          />
        </Grid.Column>
      </Grid.Row>
    </div>
  );
};

export default styled(memo(CampaignsCards))`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;
