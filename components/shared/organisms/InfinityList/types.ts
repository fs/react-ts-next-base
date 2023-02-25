import React from 'react';
import { TWidth } from 'public/styles/config/width';

export type TInfinityList = TWidth & {
  dataLength: number;
  loading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
  scrollableTarget: string;
  titleEmptyMessage?: string;
  descriptionEmptyMessage?: string;
};
