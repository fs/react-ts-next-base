import { TNextPage } from 'lib/apollo/types';
import { AccessTokenManager } from 'lib/auth/withAccessTokenManager';

export type TPageContext = {
  accessTokenManager: AccessTokenManager;
  canVisit: boolean;
  apolloClient: TNextPage;
};

export type TUseFileDownload = {
  url: URL;
  fileName: string;
  ctx: TPageContext;
};

export enum actionType {
  DOWNLOAD = 'download',
  OPEN = 'open',
}
