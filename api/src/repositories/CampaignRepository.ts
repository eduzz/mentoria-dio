import Campaign from "../entity/Campaign";

export const listCampaigns = async (): Promise<[Campaign]> => {
    const campaigns: [Campaign] = [];

    return campaigns;
}

export const getCampaignById = async (id: number): Promise<Campaign> => {
    // Get campaigns by id
    const campaign: Campaign = {};
    return campaign;
}

export const updateCampaign = async (id: number, data: Partial<Campaign>): Promise<Campaign> => {
    const campaign: Campaign = {};
    return campaign;
}

export const createCampaign = async (data: Partial<Campaign>): Promise<Campaign> => {
    const campaign: Campaign = {};
    return campaign;
}

export const deleteCampaign = async (id: number): Promise<{id: number, message: string}> => {
    return {
        id: 1,
        message: 'Campanha removida com sucesso'
    };
}

export const getInvestiment = async (): Promise<Number> => {
    return 12345.90;
}

export const getRevenue = async (): Promise<Number> => {
    return 423432.90;
}

export const getROI = async (): Promise<Number> => {
    return 0.342434234;
}