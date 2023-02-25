import * as Yup from 'yup';
import { EVariant as EButtonVariant } from 'components/shared/atoms/Button/types';

enum EVariant {
  DEFAULT = 'default',
  CONFIRM = 'confirm',
  CHANGE = 'change',
  ALERT = 'alert',
}

export type TModalForm = {
  body: JSX.Element;
  initialValues: object;
  validationSchema: Yup.AnySchema;
};

export type TSimpleModal = {
  onSubmit?: (_: object) => void;
  onCancel?: () => void;
  title: string | JSX.Element;
  description: string | JSX.Element;
  subDescription?: string | JSX.Element;
  variant?: `${EVariant}`;
  roundedButton?: boolean;
  showCancel?: boolean;
  cancelText?: string;
  acceptText?: string;
  form?: TModalForm;
};

export type TVariantConfig = { [innerKey in EVariant]: EButtonVariant };
