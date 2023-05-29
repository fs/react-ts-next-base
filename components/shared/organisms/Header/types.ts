import type { useSignOut } from 'lib/apollo/hooks/actions/auth';

import { CurrentUserFragment } from 'graphql/fragments/__generated__/currentUserInfo.generated';

export type THeader = {
  user?: CurrentUserFragment | null;
  signOut: ReturnType<typeof useSignOut>[0];
};

export type LinkConfig = {
  testId?: string;
  text: string;
  url: string;
};

export type ActionsConfig = {
  testId?: string;
  text: string;
  onClick: () => Promise<void>;
};

export type TUserNavigation = {
  user?: CurrentUserFragment | null;
  links?: LinkConfig[];
  actions?: ActionsConfig[];
};

export type TUserNavigationList = {
  links?: LinkConfig[];
  actions?: ActionsConfig[];
};
