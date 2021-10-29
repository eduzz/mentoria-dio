import { IPaginationParams, IPaginationResponse } from '@eduzz/houston-hooks/usePromisePaginated';

import apiService from './api';

import { ICampaign } from '@/interfaces/models/campaign';

export class CampaignService {
  public list(params: IPaginationParams): Promise<IPaginationResponse<ICampaign>> {
    return apiService.get('/campaigns', params);
  }
}

const campaignService = new CampaignService();
export default campaignService;
