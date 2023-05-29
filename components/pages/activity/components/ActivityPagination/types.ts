import { Dispatch, SetStateAction } from 'react';

import { PageInfoFragment } from 'graphql/fragments/__generated__/pageInfo.generated';

export type TActivityPagination = {
  pageInfo: PageInfoFragment;
  setBeforeCursor: Dispatch<SetStateAction<string | undefined>>;
  setAfterCursor: Dispatch<SetStateAction<string | undefined>>;
  setPageNumber: Dispatch<SetStateAction<number>>;
  pageNumber: number;
};
