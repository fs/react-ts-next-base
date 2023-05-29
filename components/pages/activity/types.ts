import { MultiValue, SingleValue } from 'react-select';

import { ActivityEvent } from 'graphql/types';

export type TActivityOption = {
  value: ActivityEvent;
  label: string;
};

export type TActivitySizeOption = {
  value: number;
  label: string;
};

export type TEventChange = (
  value: MultiValue<TActivityOption> | SingleValue<TActivityOption> | null,
) => void;
export type TSizeChange = (
  value: MultiValue<TActivitySizeOption> | SingleValue<TActivitySizeOption> | null,
) => void;
