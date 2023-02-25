import { EVariant as EButtonVariant } from 'components/shared/atoms/Button/types';

import { TVariantConfig } from './types';

export const buttonConfig: TVariantConfig = {
  default: EButtonVariant.PRIMARY,
  confirm: EButtonVariant.CONFIRM,
  change: EButtonVariant.CHANGE,
  alert: EButtonVariant.ALERT,
};
