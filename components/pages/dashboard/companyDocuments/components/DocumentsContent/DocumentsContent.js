import React from 'react';
import useRouter from 'hooks/useRouter';

import { useOrders } from 'lib/apollo/hooks/state/orders';
import { PLACED } from 'config/constants/checkoutStatus';

import SearchDate from 'components/shared/molecules/SearchDate';
import SearchForm from 'components/shared/molecules/SearchForm';
import InfinityList from 'components/shared/organisms/InfinityList';
import OrderDetails from 'components/shared/organisms/OrderDetails';

import DocumentsTabs from '../DocumentsTabs';
import { documentsTypes } from '../../constants';
import { ContentWrapper, Title, SearchWrapper, SearchDateWrapper } from './styled';

const DocumentsContent = ({ query }) => {
  const { type, orderId, startDate, endDate } = query;
  const executionStatuses = type === documentsTypes.ALL ? undefined : type;

  const { pushRoute } = useRouter();
  const { loading, orders, loadingMore, pageInfo, fetchMore } = useOrders({
    ...query,
    placedDate: { startDate, endDate },
    executionStatuses,
    checkoutStatus: PLACED,
    first: 12,
  });

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  const isSearchEmpty = !(orderId || startDate || endDate);
  const emptyMessageText = isSearchEmpty
    ? {
        title: 'Ой!',
        description: 'У вас пока нет ни одного заказа.',
      }
    : {
        title: 'По вашему запросу ничего не найдено',
        description: 'Попробуйте изменить формулировку или воспользуйтесь нашими фильтрами',
      };

  const setSearchDates = ({ startDate: startValue, endDate: endValue }) => {
    pushRoute({
      query: {
        ...query,
        startDate: startValue ? startValue.split('T')[0] : undefined,
        endDate: endValue ? endValue.split('T')[0] : undefined,
      },
    });
  };

  return (
    <>
      <Title> Документы к заказам </Title>
      <DocumentsTabs query={query} />
      <ContentWrapper>
        <SearchWrapper>
          <SearchForm placeholder="Поиск по номеру заказа" searchInputName="orderId" />
          <SearchDateWrapper>
            <SearchDate query={query} onSubmit={setSearchDates} />
          </SearchDateWrapper>
        </SearchWrapper>

        <InfinityList
          onLoadMore={onLoadMore}
          loading={loading}
          hasNextPage={pageInfo?.hasNextPage}
          dataLength={orders.length}
          scrollableTarget="layout-template-content"
          titleEmptyMessage={emptyMessageText.title}
          descriptionEmptyMessage={emptyMessageText.description}
        >
          {orders.map(order => (
            <OrderDetails variant="documents" order={order} key={order.id} />
          ))}
        </InfinityList>
      </ContentWrapper>
    </>
  );
};

export default DocumentsContent;
