const requests: any = {
  GET: {},
  POST: {
    '/auth/login': {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW5pZWwucHJhZG9AZWR1enouY29tIiwibmFtZSI6IkRhbmllbCBQcmFkbyJ9.yOzeX8ZvzYMwZCvW3HbHfKsaHPvSVXiUT977dSnirHk'
    },
    '/auth/create': null,
    '/auth/send-reset': null,
    '/auth/reset-password': null,
    '/auth/change-password': null
  }
};

export default function getMockValue(method: string, url: string) {
  return new Promise<{ data: any }>(resolve => {
    setTimeout(() => resolve({ data: requests[method][url] }), 1000 + 2000 * Math.random());
  });
}
