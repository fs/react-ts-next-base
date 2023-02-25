import React, { useMemo } from 'react';
import useRouter from 'hooks/useRouter';

import Tabs from 'components/shared/molecules/Tabs';
import { Wrapper } from './styled';
import { documentsTypes, documentsTitles } from '../../constants';

const DocumentsTabs = ({ query }) => {
  const { pushRoute } = useRouter();

  const tabs = useMemo(
    () => [
      {
        id: documentsTypes.ALL,
        name: documentsTitles.ALL,
        action: () =>
          pushRoute({
            query: {
              ...query,
              type: documentsTypes.ALL,
            },
          }),
      },
      {
        id: documentsTypes.IN_TRANSIT,
        name: documentsTitles.IN_TRANSIT,
        action: () =>
          pushRoute({
            query: {
              ...query,
              type: documentsTypes.IN_TRANSIT,
            },
          }),
      },
      {
        id: documentsTypes.DELIVERED,
        name: documentsTitles.DELIVERED,
        action: () =>
          pushRoute({
            query: {
              ...query,
              type: documentsTypes.DELIVERED,
            },
          }),
      },
    ],
    [query],
  );

  return (
    <Wrapper>
      <Tabs tabs={tabs} activeId={query.type} query={query} />
    </Wrapper>
  );
};

export default DocumentsTabs;
