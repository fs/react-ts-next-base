import { MultiValue, SingleValue } from 'react-select';
import { ActivityEvent } from 'graphql/types';

export type TActivityOption = {
  value: ActivityEvent;
  label: string;
};

export type TAvtivitySizeOption = {
  value: number;
  label: string;
};

export type TEventChange = (
  value: MultiValue<TActivityOption> | SingleValue<TActivityOption> | null,
) => void;
export type TSizeChange = (
  value: MultiValue<TAvtivitySizeOption> | SingleValue<TAvtivitySizeOption> | null,
) => void;
