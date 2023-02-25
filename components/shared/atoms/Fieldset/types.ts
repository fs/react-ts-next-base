import React from 'react';
import { TWidth } from 'public/styles/config/width';

export type TFieldset = TWidth & {
  legend: string;
  children: React.ReactNode;
};
