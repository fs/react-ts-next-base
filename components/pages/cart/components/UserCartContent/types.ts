import { CurrentUserInfoFragment } from 'graphql/fragments/__generated__/currentUserInfo.generated';

export type TUserCartContent = {
  mainCompanyId: string;
  user: CurrentUserInfoFragment;
};
