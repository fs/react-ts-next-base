export enum EVariant {
  DEFAULT = 'default',
  PLUS = 'plus',
}

export enum EPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export type TCheckbox = {
  variant?: `${EVariant}`;
  position?: `${EPosition}`;
  name: string;
  label?: string | JSX.Element;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  readOnly?: boolean;
};

export type TPositionProps = {
  marginLeft: string;
  marginRight: string;
  left: string;
  right: string;
};
export type TPositionConfig = {
  [innerKey in EPosition]: TPositionProps;
};
export type TSizeProps = string;

export type TStateProps = {
  backgroundImage: string | null;
  backgroundColor: string;
  borderColor: string;
};
export type TStates = 'checked' | 'unchecked';

type TStateConfig = {
  [innerKey in TStates]: TStateProps;
};

export type TVariantConfig = {
  [innerKey in EVariant]: TStateConfig;
};
