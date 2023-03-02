import * as dotenv from 'dotenv';

dotenv.config();

const DEV = process.env.NODE_ENV !== 'production';
const PORT = parseInt(process.env.PORT || '8080', 10);
const GRAPHQL_APP_URL = '/graphql';
const API_URL = process.env.API_URL;

export {
  DEV,
  PORT,
  API_URL,
  GRAPHQL_APP_URL,
};
