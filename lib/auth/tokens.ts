import { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response } from 'express';

import { TToken } from 'lib/apollo/types';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../config/jwt';

export const parseJWT = (token: TToken): { exp: number | null } => {
  try {
    if (!token) {
      return {
        exp: null,
      };
    }
    // Get payload from JSON Web Token. Learn about: (https://jwt.io/introduction/)
    const payload = token.split('.')[1];

    // Convert base64 string (token payload) to utf8
    const payloadString = Buffer.from(payload, 'base64').toString();

    return JSON.parse(payloadString);
  } catch (error) {
    console.error(error);
    return {
      exp: null,
    };
  }
};

export const setTokensToCookies = ({
  refreshToken,
  accessToken,
  res,
  req,
}: {
  refreshToken: string;
  accessToken: string;
  res: Response | NextApiResponse;
  req: Request | NextApiRequest;
}) => {
  const jwtRefresh = parseJWT(refreshToken);
  const cookiesAttributes = [];
  if (jwtRefresh.exp) {
    const expiredRefresh = new Date(jwtRefresh.exp * 1000).toUTCString();

    const refreshAttributes = [
      `${REFRESH_TOKEN_KEY}=${refreshToken}`,
      `expires=${expiredRefresh}`,
      'path=/',
      'httpOnly',
      'SameSite=Lax',
    ];

    if (req && 'secure' in req) refreshAttributes.push('Secure');

    cookiesAttributes.push(refreshAttributes.join(';'));
  }

  // save token to http-only cookies for secure

  const jwtAccess = parseJWT(accessToken);
  if (jwtAccess.exp) {
    const expiredAccess = new Date(jwtAccess.exp * 1000).toUTCString();

    const accessAttributes = [
      `${ACCESS_TOKEN_KEY}=${accessToken}`,
      `expires=${expiredAccess}`,
      'path=/',
      'httpOnly',
      'SameSite=Lax',
    ];

    if (req && 'secure' in req) accessAttributes.push('Secure');

    cookiesAttributes.push(accessAttributes.join(';'));
  }

  res.setHeader('Set-Cookie', cookiesAttributes);
};

export const deleteTokensFromCookies = ({ res }: { res: Response | NextApiResponse }) => {
  res.setHeader('Set-Cookie', [
    `${REFRESH_TOKEN_KEY}=; max-age=0; path=/; httpOnly;`,
    `${ACCESS_TOKEN_KEY}=; max-age=0; path=/; httpOnly;`,
  ]);
};
