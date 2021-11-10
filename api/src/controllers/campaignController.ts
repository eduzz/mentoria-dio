import { Request, Response } from 'express';
import * as CampaignService from '../services/campaingService';

export const getAllCampaigns = async (req: Request, res: Response) => {
    const campaigns: [{}] = await CampaignService.getAllCampaigns();
    return res.json(campaigns);
}

export const getCampaign = async (req: Request, res: Response) => {
    const campaign = await CampaignService.getCampaign(Number(req.params['id']));
    return res.json(campaign);
}

export const createCampaign = async (req: Request, res: Response) => {
    const campaign = await CampaignService.createCampaign(req.body);
    return res.json(campaign);
}

export const updateCampaign = async (req: Request, res: Response) => {
    const id = Number(req.params['id']);
    const campaign = await CampaignService.updateCampaign(id, req.body);
    return res.json(campaign);
}

export const deleteCampaign = async (req: Request, res: Response) => {
    const id = Number(req.params['id']);
    const campaign = await CampaignService.deleteCampaign(id);
    return res.json(campaign);
}

export const getInvestiment = async (req: Request, res: Response) => {
    const total: Number = await CampaignService.getInvestiment();
    return res.send(total);
}

export const getRevenue = async (req: Request, res: Response) => {
    const total: Number = await CampaignService.getRevenue();
    return res.send(total);
}

export const getROI = async (req: Request, res: Response) => {
    const roi: Number = await CampaignService.getROI();
    return res.send(roi);
}