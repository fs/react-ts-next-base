import { TPageContext } from 'hooks/types';

export type TDocumentItem = {
  context: TPageContext;
  url: URL;
  fileName: string;
  title: string;
};
