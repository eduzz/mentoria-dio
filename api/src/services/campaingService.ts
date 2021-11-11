import { getCustomRepository } from "typeorm";
import {Campaign} from "../entity/Campaign";
import {CampaignRepository} from "../repositories/CampaignRepository"
import IPaginationFilter from "./interfaces/IPaginationFilter";
import IListResult from "./interfaces/IListResult";

class CampaignService {

    constructor(private readonly campaignRepository: CampaignRepository) {}

    public getAllCampaigns = async (filter: Partial<IPaginationFilter>): Promise<IListResult<Campaign>> => {
        const campaigns: Campaign[] = await this.campaignRepository.listCampaigns(filter);
        return {
            total: campaigns.length,
            result: campaigns
        };
    }

    public getCampaign = async (id: number): Promise<Campaign> => {
        const campaign: Campaign = await this.campaignRepository.getCampaignById(id);
        return campaign;
    }

    public saveCampaign = async (data: any): Promise<Campaign> => {
        const { id } = data;
        const campaign = (!id) ? 
                            await this.createCampaign(data) : 
                            await this.updateCampaign(data.id, data);
        return campaign;
    }

    public createCampaign = async (data: any): Promise<Campaign> => {
        const campaign: Campaign = await this.campaignRepository.createCampaign(data)
        return campaign;
    }

    public updateCampaign = async (id: number, data: any): Promise<Campaign> => {
        const campaign: Campaign = await this.campaignRepository.updateCampaign(id, data);
        return campaign;
    }

    public deleteCampaign = async (id: number): Promise<IDeleteCampaignResult> => {
        const result = await this.campaignRepository.deleteCampaign(id);
        return result;
    }

    public getInvestiment = async (): Promise<number> => {
        const result: number = await this.campaignRepository.getInvestiment();
        return result;
    }

    public getRevenue = async (): Promise<number> => {
        const result: number = await this.campaignRepository.getRevenue();
        return result;
    }

    public getROI = async (): Promise<number> => {
        const revenue: number = await this.campaignRepository.getRevenue();
        const investiment: number = await this.campaignRepository.getInvestiment();
        return revenue > 0 ? Number(investiment / revenue) : 0;
    }
}

export default new CampaignService(getCustomRepository(CampaignRepository));
