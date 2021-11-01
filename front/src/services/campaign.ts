import { IPaginationParams, IPaginationResponse } from '@eduzz/houston-hooks/usePromisePaginated';

import apiService from './api';

import { ICampaign } from '@/interfaces/models/campaign';

export class CampaignService {
  public list(params: IPaginationParams): Promise<IPaginationResponse<ICampaign>> {
    return apiService.get('/campaigns', params);
  }

  public delete(id: number): Promise<IPaginationResponse<ICampaign>> {
    return apiService.delete('/campaigns', { id });
  }

  public graphRoi(): Promise<number> {
    return apiService.get('/campaigns/graphs/roi');
  }

  public graphRevenues(): Promise<number> {
    return apiService.get('/campaigns/graphs/revenues');
  }

  public graphInvestment(): Promise<number> {
    return apiService.get('/campaigns/graphs/investment');
  }

  public save(model: Partial<ICampaign>): Promise<ICampaign> {
    return apiService.post('/campaigns', model);
  }
}

const campaignService = new CampaignService();
export default campaignService;
