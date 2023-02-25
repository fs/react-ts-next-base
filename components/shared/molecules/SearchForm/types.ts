import { TMargin } from 'public/styles/config/margin';
import { TWidth } from 'public/styles/config/width';

export type TFormValues = {
  [key: string]: string;
};

export type TField = {
  name: string;
  initialValue: string;
  width?: string;
  placeholder: string;
  testId?: string;
};

export type TSearchForm = TMargin &
  TWidth & {
    placeholder?: string;
    rounded?: boolean;
    searchInputName?: string;
    customFields?: TField[];
  };

export type TFormProps = TMargin & TWidth;
