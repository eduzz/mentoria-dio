import { useCallback } from 'react';

import usePromisePaginated from '@eduzz/houston-hooks/usePromisePaginated';
import AddIcon from '@eduzz/houston-icons/Add';
import Button from '@eduzz/houston-ui/Button';
import Grid from '@eduzz/houston-ui/Grid';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Table from '@eduzz/houston-ui/Table';
import Typography from '@eduzz/houston-ui/Typography';

import CampaignsCards from './Cards';
import ListItem from './ListItem';

import Toolbar from '@/components/Layout/Toolbar';
import { ICampaign } from '@/interfaces/models/campaign';
import campaignService from '@/services/campaign';

const CampaignsPage: React.FC<IStyledProp> = ({ className }) => {
  const { params, isLoading, total, result, error, retry, handleSort, handleChangePage, handleChangePerPage } =
    usePromisePaginated(
      {
        initialParams: {
          term: '',
          page: 1,
          perPage: 10,
          sort: { field: 'beginDate', direction: 'desc' }
        },
        onChangeParams: params => campaignService.list(params)
      },
      []
    );

  const handleCreate = useCallback(() => null, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEdit = useCallback((current: ICampaign) => null, []);

  return (
    <div className={className}>
      <Toolbar />

      <CampaignsCards />

      <div className='header'>
        <Grid.Row alignItems='center'>
          <Grid.Column xs={12} sm={true}>
            <Typography size='x-large' fontWeight='bold'>
              Campanhas
            </Typography>
            <Typography> Gerencie suas campanhas</Typography>
          </Grid.Column>

          <Grid.Column xs={12} sm={'auto'}>
            <Button fullWidth variant='contained' onClick={handleCreate} startIcon={<AddIcon />}>
              Cadastrar Nova Campanha
            </Button>
          </Grid.Column>
        </Grid.Row>
      </div>

      <Table loading={isLoading} sort={params.sort} mobileWidth={900} onSort={handleSort}>
        <Table.Header>
          <Table.Column width={40}>Fonte</Table.Column>
          <Table.Column>Campanha</Table.Column>
          <Table.Column width={130} align='right'>
            Investimento
          </Table.Column>
          <Table.Column width={130} align='right'>
            Faturamento
          </Table.Column>
          <Table.Column width={120} sortableField='beginDate'>
            Início
          </Table.Column>
          <Table.Column width={120} sortableField='endDate'>
            Término
          </Table.Column>
          <Table.Column width={90} align='right'>
            ROI
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {!error && <Table.Empty count={total} />}
          <Table.Error error={error} />
          {result.map((data, index) => (
            <ListItem key={data.id} data={data} index={index} onEdit={handleEdit} onDeleteComplete={retry} />
          ))}
        </Table.Body>
        <Table.Pagination
          total={total}
          page={params.page}
          perPage={params.perPage}
          onChangePage={handleChangePage}
          onChangePerPage={handleChangePerPage}
        />
      </Table>
    </div>
  );
};

export default styled(CampaignsPage)`
  & > .header {
    margin: ${({ theme }) => theme.spacing(8)} 0;
  }
`;
