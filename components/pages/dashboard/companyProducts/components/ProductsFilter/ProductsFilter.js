import React, { useMemo } from 'react';
import useRouter from 'hooks/useRouter';

import Tabs from 'components/shared/molecules/Tabs';
import { Wrapper } from './styled';
import { productTitles, productTypes } from '../../constants';

const ProductsFilter = ({ query }) => {
  const { pushRoute } = useRouter();

  const tabs = useMemo(
    () => [
      {
        id: productTypes.ACTIVE,
        name: productTitles.ACTIVE,
        action: () =>
          pushRoute({
            query: {
              ...query,
              type: productTypes.ACTIVE,
            },
          }),
      },
      {
        id: productTypes.DRAFT,
        name: productTitles.DRAFT,
        action: () =>
          pushRoute({
            query: {
              ...query,
              type: productTypes.DRAFT,
            },
          }),
      },
      {
        id: productTypes.TEMPLATE,
        name: productTitles.TEMPLATE,
        action: () =>
          pushRoute({
            query: {
              ...query,
              type: productTypes.TEMPLATE,
            },
          }),
      },
      {
        id: productTypes.DELETED,
        name: productTitles.DELETED,
        action: () =>
          pushRoute({
            query: {
              ...query,
              type: productTypes.DELETED,
            },
          }),
      },
    ],
    [query.companyId],
  );

  return (
    <Wrapper>
      <Tabs tabs={tabs} activeId={query.type} />
    </Wrapper>
  );
};

export default ProductsFilter;
