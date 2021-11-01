import faker from 'faker/locale/pt_BR';

import { IPaginationParams, IPaginationResponse } from '@eduzz/houston-hooks/usePromisePaginated';

import { ICampaign } from '@/interfaces/models/campaign';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const sources = {
  1: 'facebook',
  2: 'whatsapp',
  3: 'instagram'
};

let campaigns = new Array(15).fill('a').map<ICampaign>((a, index) => ({
  id: index + 1,
  name: faker.commerce.productName(),
  link: faker.internet.url(),
  investment: getRandomInt(1000, 10000),
  revenues: getRandomInt(1000, 10000),
  beginDate: faker.date.past(),
  endDate: faker.date.future(),
  roi: Math.random(),
  source: sources[getRandomInt(1, 4)]
}));

let campaignId = campaigns.length;

const requests = {
  GET: {
    '/campaigns': (params: IPaginationParams) => {
      console.log({ campaigns, params });
      let result = [...campaigns].slice((params.page - 1) * params.perPage, params.page * params.perPage);

      if (params.sort?.field) {
        result = result.sort((a, b) => {
          if (a[params.sort.field] > b[params.sort.field]) return params.sort.direction === 'asc' ? 1 : -1;
          if (a[params.sort.field] == b[params.sort.field]) return 0;
          return params.sort.direction === 'asc' ? -1 : 1;
        });
      }

      return { total: campaigns.length, result } as IPaginationResponse<ICampaign>;
    },
    '/campaigns/graphs/roi': () => Math.random(),
    '/campaigns/graphs/revenues': () => getRandomInt(16000, 20000),
    '/campaigns/graphs/investment': () => getRandomInt(10000, 15000)
  },
  POST: {
    '/auth/login': () => ({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWwucHJhZG9AZWR1enouY29tIiwibmFtZSI6IkRhbmllbCBQcmFkbyJ9.yOzeX8ZvzYMwZCvW3HbHfKsaHPvSVXiUT977dSnirHk'
    }),
    '/auth/create': () => ({}),
    '/auth/send-reset': () => ({}),
    '/auth/reset-password': () => ({}),
    '/auth/change-password': () => ({}),
    '/campaigns': (model: ICampaign) => {
      const index = campaigns.findIndex(c => c.id === model.id);

      if (!index) {
        const data = { id: ++campaignId, ...model };
        campaigns.push(data);
        return data;
      }

      campaigns[index] = { ...campaigns[index], ...model };
      return campaigns[index];
    }
  },
  DELETE: {
    '/campaigns': ({ id }: { id: number }) => {
      campaigns = campaigns.filter(c => c.id !== id);
    }
  }
};

export default function getMockValue(method: string, url: string, params: any) {
  return new Promise<{ data: any }>(resolve => {
    const mock = requests[method][url] ?? (() => null as any);
    setTimeout(() => resolve({ data: mock(params) }), 1000 + 2000 * Math.random());
  });
}
