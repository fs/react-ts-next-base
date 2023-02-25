import { ReactNode } from 'react';
import { Config } from 'react-popper-tooltip';

import { TMargin } from 'public/styles/config/margin';
import { TWidth } from 'public/styles/config/width';

export type TTooltip = Config &
  TMargin &
  TWidth & {
    text: string | ReactNode;
    active?: boolean;
    children: ReactNode;
  };
