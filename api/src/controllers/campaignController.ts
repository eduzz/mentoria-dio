import { Request, Response } from 'express';
import {Campaign} from '../entity/Campaign';
import CampaignService from '../services/CampaingService';
import IPaginationFilter from '../services/interfaces/IPaginationFilter';
import IListResult from '../services/interfaces/IListResult';

class CampaignController {

    constructor(private readonly campaignService: typeof CampaignService){}

    private sanitizeFilter = (req: Request): IPaginationFilter => {
        const {page, perPage, sort} = req.query;
        const { field, direction } = JSON.parse(sort.toString());
        const filter: IPaginationFilter = {
            page: Number(page), 
            perPage: Number(perPage), 
            sort: {
                field, 
                direction: direction.toUpperCase()
            }
        };
        const mapSortFilterFields = [
            {incoming: "beginDate", to: "begin_date"},
            {incoming: "endDate", to: "end_date"}
        ];
        if (mapSortFilterFields.some(x => x.incoming == filter.sort.field)) {
            filter.sort.field = mapSortFilterFields.filter(map => map.incoming === filter.sort.field).pop().to
        }
        return filter;
    }

    public getAllCampaigns = async (req: Request, res: Response) => {
        const filter: IPaginationFilter = this.sanitizeFilter(req);
        const campaigns: IListResult<Campaign> = await this.campaignService.getAllCampaigns(res.locals.user_id, filter);
        return res.json(campaigns);
    }

    public getCampaign = async (req: Request, res: Response) => {
        const campaign = await this.campaignService.getCampaign(Number(req.params['id']));
        return res.json(campaign);
    }

    public saveCampaign = async (req: Request, res: Response) => {
        const data = {...req.body, user_id: res.locals.user_id};
        const campaign = await this.campaignService.saveCampaign(data);
        return res.json(campaign);
    }

    public updateCampaign = async (req: Request, res: Response) => {
        const id = Number(req.params['id']);
        const campaign = await this.campaignService.updateCampaign(id, req.body);
        return res.json(campaign);
    }

    public deleteCampaign = async (req: Request, res: Response) => {
        const id = Number(req.params['id']);
        const campaign = await this.campaignService.deleteCampaign(id);
        return res.json(campaign);
    }

    public getInvestiment = async (req: Request, res: Response) => {
        const total: Number = await this.campaignService.getInvestiment(res.locals.user_id);
        return res.send(total.toString());
    }

    public getRevenue = async (req: Request, res: Response) => {
        const total: Number = await this.campaignService.getRevenue(res.locals.user_id);
        return res.send(total.toString());
    }

    public getROI = async (req: Request, res: Response) => {
        const roi: number = await this.campaignService.getROI(res.locals.user_id);
        return res.send(roi.toString());
    }
}

export default new CampaignController(CampaignService);
