import { CurrentUserInfoFragment } from "graphql/fragments/__generated__/currentUserInfo.generated";
import type { useSignOut } from 'lib/apollo/hooks/actions/auth';

export type THeader = {
  user?: CurrentUserInfoFragment | null;
  signOut: ReturnType<typeof useSignOut>[0];
}

export type LinkConfig = {
  testId?: string;
  text: string;
  url: string;
};

export type ActionsConfig = {
  testId?: string;
  text: string;
  onClick: (arg?: { everywhere?: boolean }) => Promise<void>; // TODO: expect any function here
};

export type TUserNavigation = {
  user?: CurrentUserInfoFragment | null;
  links?: LinkConfig[];
  actions?: ActionsConfig[];
}

export type TUserNavigationList = {
  links?: LinkConfig[];
  actions?: ActionsConfig[];
}