import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import Cookie from 'universal-cookie';
import zlib from 'zlib';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../config/jwt';
import { API_URL } from '../../config/vars';
import { deleteTokensFromCookies, setTokensToCookies } from '../../lib/auth/tokens';

// Working with refresh token
const handleResponse = ({ req, res, body }: { req: Request; res: Response; body: Buffer }) => {
  const authOperationNames = [
    'signIn',
    'signUp',
    'signOut',
    'updateToken',
    'destroyAccount',
    'updateUserPassword',
    'authenticateGuestUser',
  ];

  try {
    const { data, errors } = JSON.parse(body.toString());

    if (errors) {
      throw new Error(JSON.stringify(errors));
    }
    const authOperationName = Object.keys(data).find(key => authOperationNames.includes(key));

    if (authOperationName && ['signOut', 'destroyAccount'].includes(authOperationName)) {
      deleteTokensFromCookies({ res });
    } else if (authOperationName && data[authOperationName]) {
      const { refreshToken, accessToken } = data[authOperationName];

      setTokensToCookies({ refreshToken, accessToken, req, res });
    }
  } catch (error) {
    console.error('handleResponse: ', error);
  }

  res.end(body);
};

const graphqlProxyMiddleware = createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  headers: {
    Connection: 'keep-alive',
  },
  selfHandleResponse: true,
  onProxyReq: (proxyReq, req, res) => {
    const { body } = req;
    if (!body || !Object.keys(body).length) {
      res.end();
      return;
    }

    const { operationName } = body;

    if (['updateToken'].includes(operationName)) {
      const cookie = new Cookie(req.headers.cookie);
      const refreshToken = cookie.get(REFRESH_TOKEN_KEY);

      proxyReq.setHeader('Authorization', `Bearer ${refreshToken}`);
    } else {
      const cookie = new Cookie(req.headers.cookie);
      const accessToken = cookie.get(ACCESS_TOKEN_KEY);

      proxyReq.setHeader('Authorization', `Bearer ${accessToken}`);
    }

    // send request body in correct format (after parsing body with body-parser library)
    const contentType = proxyReq.getHeader('Content-Type');

    const writeBody = bodyData => {
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    };

    if (contentType === 'application/json') {
      writeBody(JSON.stringify(body));
    }
    // TODO: what it is?
    // if (contentType === 'application/x-www-form-urlencoded') {
    //   writeBody(querystring.stringify(body));
    // }
  },
  onProxyRes: (proxyRes, req, res) => {
    const bodyChunks: Uint8Array[] = [];

    proxyRes.on('data', chunk => {
      bodyChunks.push(chunk);
    });

    proxyRes.on('end', () => {
      const body = Buffer.concat(bodyChunks);

      const contentEncoding = proxyRes.headers['content-encoding'];

      if (contentEncoding === 'gzip') {
        zlib.gunzip(body, (_, dezipped) => {
          handleResponse({ req, res, body: dezipped });
        });
      } else {
        handleResponse({ req, res, body });
      }
    });
  },
});

export default graphqlProxyMiddleware;
