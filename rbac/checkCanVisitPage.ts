import { getCurrentUser } from 'lib/apollo/cache/getCurrentUser';

import { getVisitRuleFromPattern } from './rules';
import checkAccess from './checkAccess';
import { TCheckCanVisitPage } from './types';

const checkCanVisitPage = ({ pathname, apolloClient }: TCheckCanVisitPage) => {
  const user = getCurrentUser({ apolloClient });

  const visitRule = getVisitRuleFromPattern(pathname);

  return checkAccess(user?.systemRole || 'UNAUTHORIZED', visitRule);
};

export default checkCanVisitPage;
