import { CorsOptions } from 'cors';

export default {
  cors: {
    orgin: ['http://localhost:3000', 'http://localhost:8000'],
    methods: ['GET', 'POST'],
    credentials: true,
  } as CorsOptions,
};
