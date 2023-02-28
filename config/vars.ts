import * as dotenv from 'dotenv';

dotenv.config();

const DEV = process.env.NODE_ENV !== 'production';
const PORT = parseInt(process.env.PORT || '8080', 10);
const GRAPHQL_APP_URL = '/graphql';
const API_URL = process.env.API_URL;
const API_KEY_MAP = process.env.API_KEY_MAP;
const DEFAULT_LATITUDE = process.env.DEFAULT_LATITUDE;
const DEFAULT_LONGITUDE = process.env.DEFAULT_LONGITUDE;

export {
  DEV,
  PORT,
  API_URL,
  GRAPHQL_APP_URL,
  API_KEY_MAP,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
};
