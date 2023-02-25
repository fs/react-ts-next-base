export enum EView {
  tile = 'tile',
  row = 'row',
}

export type TView = {
  view?: `${EView}`;
};
