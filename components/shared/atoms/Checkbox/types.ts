export enum EPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export type TCheckbox = {
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
