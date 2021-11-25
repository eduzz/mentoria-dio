import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { validateRequest } from './validators/validateRequest';
import { validateToken } from './validators/validateToken';
import AuthController from './controllers/AuthController';
import CampaignController from './controllers/campaignController';
import { postLoginValidator } from './validators/postLoginValidator';
import { postUserValidator } from './validators/postUserValidator';
import { postCampaignValidator } from './validators/postCampaignValidator';
import { putCampaignValidator } from './validators/putCampaignValidator';
import { postSendResetValidator } from './validators/postSendResetValidator';
import { postResetPasswordValidator } from './validators/postResetPasswordValidator';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes for login
app.post('/auth/create', validateRequest(postUserValidator), AuthController.createUser);
app.post('/auth/login', validateRequest(postLoginValidator), AuthController.login);

app.post('/auth/send-reset', validateRequest(postSendResetValidator), AuthController.sendReset);
app.post('/auth/reset-password', validateRequest(postResetPasswordValidator), AuthController.resetPassword);
//app.post('/auth/change-password', validateRequest(postLoginValidator), AuthController.changePassword);

// Routes protected by token
app.use(validateToken);

app.get('/campaigns', CampaignController.getAllCampaigns);
app.post('/campaigns', validateRequest(postCampaignValidator), CampaignController.saveCampaign);
app.delete('/campaign/:id', CampaignController.deleteCampaign);

// For Cards
app.get('/campaigns/graphs/investment', CampaignController.getInvestiment);
app.get('/campaigns/graphs/revenues', CampaignController.getRevenue);
app.get('/campaigns/graphs/roi', CampaignController.getROI);

// Error Handling
app.use((error: any, req: Request, res: Response, _: NextFunction) => {
    const httpCode = error.statusCode || error?.response?.status || 500;
    if (error.toJSON) {
        error = error.toJSON();
    }
    return res.status(httpCode).json(error);
});

app.listen(8000, () => {
    console.log('Servidor ouvindo na porta 8000...')
});
