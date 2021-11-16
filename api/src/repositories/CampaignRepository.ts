import { EntityRepository, getManager, QueryBuilder, Repository, SelectQueryBuilder } from "typeorm";
import {Campaign} from "../entity/Campaign";
import { NotFoundError } from "../exceptions/NotFoundException";
import IPaginationFilter from "../services/interfaces/IPaginationFilter";

@EntityRepository(Campaign)
export class CampaignRepository extends Repository<Campaign>{

    public listCampaigns = async (userId: number, filter: Partial<IPaginationFilter>): Promise<Campaign[]> => {
        const queryBuilder: SelectQueryBuilder<Campaign> = this.createQueryBuilder();
        const all: Campaign[] = await queryBuilder
            .select()
            .take(filter.perPage)
            .skip((filter.page-1)*filter.perPage)
            .orderBy(filter.sort.field, filter.sort.direction)
            .where({ user_id: userId })
            .getMany();
        return all;
    }

    public async getCampaignById(id: number): Promise<Campaign> {
        return await this.findOne(id);
    }

    public async updateCampaign(id: number, data: Partial<Campaign>): Promise<Campaign> {
        const campaign = await this.findOne(id);

        if (!campaign) throw new NotFoundError('Campanha não encontrada');

        campaign.beginDate = data.beginDate;
        campaign.endDate = data.endDate;
        campaign.investment = data.investment;
        campaign.revenues = data.revenues;
        campaign.link = data.link;
        campaign.name = data.name;
        campaign.source_id = 1;
        
        return await this.save(campaign);
    }

    public createCampaign = async (data: Partial<Campaign>): Promise<Campaign> => {
        const campaign = this.create();
        campaign.beginDate = data.beginDate;
        campaign.endDate = data.endDate;
        campaign.investment = data.investment;
        campaign.link = data.link;
        campaign.name = data.name;
        campaign.source_id = 1;
        campaign.user_id = data.user_id;
        return this.save(campaign);
    }

    public async deleteCampaign(id: number): Promise<any> {
        return await this.delete(id);
    }

    public async getInvestiment(userId: number): Promise<number> {
        const manager = getManager();
        const rawData = await manager.query(`
            SELECT sum(investment) as investiment 
              FROM campaign
            WHERE user_id = ?`, [userId]);
        const row = rawData[0]; 
        console.log(row.investiment);
        return Number(row.investiment);
    }

    public async getRevenue(userId: number): Promise<number> {
        const manager = getManager();
        const rawData = await manager.query(`
            SELECT sum(revenues) as revenues 
              FROM campaign
              WHERE user_id = ?`, [userId]);
        const row = rawData[0];          
        return Number(row.revenues);
    }
}
