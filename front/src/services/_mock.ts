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

const campaigns = new Array(15).fill('a').map<ICampaign>((a, index) => ({
  id: index,
  name: faker.commerce.productName(),
  investment: getRandomInt(1000, 10000),
  revenues: getRandomInt(1000, 10000),
  beginDate: faker.date.past(),
  endDate: faker.date.future(),
  roi: Math.random(),
  source: sources[getRandomInt(1, 4)]
}));

const requests = {
  GET: {
    '/campaigns': (params: IPaginationParams) => {
      console.log('olá!');
      let result = [...campaigns].slice((params.page - 1) * params.perPage, params.page * params.perPage);

      if (params.sort?.field) {
        result = result.sort((a, b) => {
          if (a[params.sort.field] > b[params.sort.field]) return params.sort.direction === 'asc' ? 1 : -1;
          if (a[params.sort.field] == b[params.sort.field]) return 0;
          return params.sort.direction === 'asc' ? -1 : 1;
        });
      }

      return { total: campaigns.length, result } as IPaginationResponse<ICampaign>;
    }
  },
  POST: {
    '/auth/login': () => ({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWwucHJhZG9AZWR1enouY29tIiwibmFtZSI6IkRhbmllbCBQcmFkbyJ9.yOzeX8ZvzYMwZCvW3HbHfKsaHPvSVXiUT977dSnirHk'
    }),
    '/auth/create': () => ({}),
    '/auth/send-reset': () => ({}),
    '/auth/reset-password': () => ({}),
    '/auth/change-password': () => ({})
  }
};

export default function getMockValue(method: string, url: string, params: any) {
  return new Promise<{ data: any }>(resolve => {
    console.log({ method, url });
    const mock = requests[method][url] ?? (() => null as any);
    setTimeout(() => resolve({ data: mock(params) }), 1000 + 2000 * Math.random());
  });
}
