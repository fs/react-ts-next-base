import { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response } from 'express';

import { TToken } from 'lib/apollo/types';

import jwtKeys from '../../config/jwt.json';

const { REFRESH_TOKEN_KEY } = jwtKeys;

export const parseJWT = (token: TToken): { exp: number | null } => {
  try {
    if (!token) throw new Error('no exist token');
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

export const setRefreshToken = ({
  refreshToken,
  res,
  req,
}: {
  refreshToken: string;
  res: Response | NextApiResponse;
  req: Request | NextApiRequest;
}) => {
  const jwt = parseJWT(refreshToken);
  if (!jwt.exp) {
    return;
  }
  const expires = new Date(jwt.exp * 1000).toUTCString();

  const attributes = [
    `${REFRESH_TOKEN_KEY}=${refreshToken}`,
    `expires=${expires}`,
    'path=/',
    'httpOnly',
    'SameSite=Lax',
  ];

  if (req && 'secure' in req) attributes.push('Secure');

  res.setHeader('Set-Cookie', attributes.join(';'));
};

export const deleteRefreshToken = ({ res }: { res: Response | NextApiResponse }) => {
  res.setHeader('Set-Cookie', [`${REFRESH_TOKEN_KEY}=; max-age=0; path=/; httpOnly;`]);
};
