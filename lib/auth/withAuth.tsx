import { TNextPage } from 'lib/apollo/types';

import withAuthSyncEvents from './withAuthSyncEvents';
import withTokensUpdate from './withTokensUpdate';

// combine necessary auth HOC's
const withAuth = (Page: TNextPage) => withTokensUpdate(withAuthSyncEvents(Page));

export default withAuth;
