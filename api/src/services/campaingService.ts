import * as CampaignRepository from "../repositories/CampaignRepository"
import ICreateCampaignResult from "./interfaces/ICreateCampaignResult";
import IDeleteCampaignResult from "./interfaces/IDeleteCampaignResult";
import IGetCampaignResult from "./interfaces/IGetCampaignResult";
import IGelAllCampaignsResult from "./interfaces/IGetCampaignResult";
import IUpdateCampaignResult from "./interfaces/IUpdateCampaignResult";

export const getAllCampaigns = async (): Promise<[IGelAllCampaignsResult]> => {
    const campaigns: [IGelAllCampaignsResult] = await CampaignRepository.listCampaigns();
    return campaigns;
}

export const getCampaign = async (id: number): Promise<IGetCampaignResult> => {
    const campaign: IGetCampaignResult = await CampaignRepository.getCampaignById(id);
    return campaign;
}

export const createCampaign = async (data: any): Promise<ICreateCampaignResult> => {
    const campaign: ICreateCampaignResult = await CampaignRepository.createCampaign(data)
    return campaign;
}

export const updateCampaign = async (id: number, data: any): Promise<IUpdateCampaignResult> => {
    const campaign: IUpdateCampaignResult = await CampaignRepository.updateCampaign(id, data);
    return campaign;
}

export const deleteCampaign = async (id: number): Promise<IDeleteCampaignResult> => {
    const result = await CampaignRepository.deleteCampaign(id);
    return result;
}

export const getInvestiment = async (): Promise<Number> => {
    const result: Number = await CampaignRepository.getInvestiment();
    return result;
}

export const getRevenue = async (): Promise<Number> => {
    const result: Number = await CampaignRepository.getRevenue();
    return result;
}

export const getROI = async (): Promise<Number> => {
    const result: Number = await CampaignRepository.getROI();
    return result;
}