import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { validateRequest } from './validators/validateRequest';
import { validateToken } from './validators/validateToken';
import * as defaultController from './controllers/defaultController';
import * as userController from './controllers/userController';
import * as campaignController from './controllers/campaignController';
import { postLoginValidator } from './validators/postLoginValidator';
import { postUserValidator } from './validators/postUserValidator';
import { postCampaignValidator } from './validators/postCampaignValidator';
import { putCampaignValidator } from './validators/putCampaignValidator';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes for login
app.post('/user', validateRequest(postUserValidator), userController.CreateUser);
app.post('/login', validateRequest(postLoginValidator), userController.Login);

// Routes protected by token
app.use(validateToken);
app.post('/profile', userController.Profile);

app.get('/campaigns', campaignController.getAllCampaigns);
app.post('/campaign', validateRequest(postCampaignValidator), campaignController.createCampaign);
app.put('/campaign/:id', validateRequest(putCampaignValidator), campaignController.updateCampaign);
app.delete('/campaign/:id', campaignController.deleteCampaign);

app.get('/campaigns/graphs/investment', campaignController.getInvestiment);
app.get('/campaigns/graphs/revenues', campaignController.getRevenue);
app.get('/campaigns/graphs/roi', campaignController.getROI);

// Error Handling
app.use(defaultController.ErrorHandling)

app.listen(8000, () => {
    console.log('Servidor ouvindo na porta 8000...')
});
