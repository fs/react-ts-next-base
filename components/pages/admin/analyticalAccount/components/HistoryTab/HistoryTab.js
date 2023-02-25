import React, { useEffect, useMemo, useState } from 'react';
import { find } from 'lodash';

import { useCustomerAccountOperations } from 'lib/apollo/hooks/state/customerAccountOperations';
import { useTransfers } from 'lib/apollo/hooks/state/transfers';
import { useCustomerOrders } from 'lib/apollo/hooks/state/customerOrders';

import { ORDER, TRANSFER } from 'config/constants/originType';

import OrderDetails from 'components/shared/organisms/OrderDetails';
import InfinityList from 'components/shared/organisms/InfinityList';

import TransferItem from '../WithdrawalTab/TransferItem';

const getIdsByType = (operations, originType) => {
  return operations
    .filter(operation => operation.originType === originType)
    .map(({ originId }) => originId);
};
const HistoryTab = ({ query }) => {
  const { searchQuery } = query;
  const [transformedOperations, setTransformedOperations] = useState([]);
  const [loadingOperations, setLoadingOperations] = useState(true);

  const { customerAccountOperations, loading, loadingMore, pageInfo, fetchMore } =
    useCustomerAccountOperations({
      statuses: ['ACCEPTED'],
      searchQuery,
      first: 12,
    });
  const { endCursor, hasNextPage } = pageInfo;

  const transferIds = getIdsByType(customerAccountOperations, TRANSFER);
  const customerOrderIds = getIdsByType(customerAccountOperations, ORDER);
  const {
    transfers,
    loading: loadingTransfers,
    fetchMore: fetchMoreTransfers,
  } = useTransfers({
    ids: transferIds,
    skip: transferIds.length === 0,
  });

  const {
    customerOrders,
    loading: loadingCustomerOrders,
    fetchMore: fetchMoreCustomerOrders,
  } = useCustomerOrders({
    ids: customerOrderIds,
    skip: customerOrderIds.length === 0,
  });

  const onLoadMore = async () => {
    if (loadingMore) return;
    if (hasNextPage) {
      const data = await fetchMore({ variables: { after: endCursor } });
      const fetchedCustomerAccountOperations =
        data?.customerAccountOperations?.edges.map(operation => operation.node) || [];

      const fetchedTransferIds = getIdsByType(fetchedCustomerAccountOperations, TRANSFER);
      const fetchedOrderIds = getIdsByType(fetchedCustomerAccountOperations, ORDER);
      if (fetchedTransferIds.length > 0) {
        fetchMoreTransfers({ variables: { ids: fetchedTransferIds } });
      }
      if (fetchedOrderIds.length > 0) {
        fetchMoreCustomerOrders({ variables: { ids: fetchedOrderIds } });
      }
    }
  };

  const getTransformedOperations = useMemo(() => {
    return customerAccountOperations.reduce((acc, operation) => {
      const existTransfer = find(transfers, ({ id }) => id === operation.originId);
      if (existTransfer) {
        return [...acc, { ...existTransfer, originType: TRANSFER }];
      }

      const existCustomerOrder = find(customerOrders, ({ id }) => id === operation.originId);
      if (existCustomerOrder) {
        return [...acc, { ...existCustomerOrder, originType: ORDER }];
      }

      return acc;
    }, []);
  }, [customerAccountOperations, transfers, customerOrders]);

  useEffect(() => {
    if (loading) setLoadingOperations(true);
    if (loadingTransfers || loadingCustomerOrders || loading) return;
    setTransformedOperations(getTransformedOperations);
    setLoadingOperations(false);
  }, [loadingTransfers, loadingCustomerOrders, loading]);

  return (
    <InfinityList
      onLoadMore={onLoadMore}
      loading={loadingOperations}
      hasNextPage={hasNextPage}
      dataLength={transformedOperations.length}
      scrollableTarget="admin-template-content"
      $width="58rem"
    >
      {transformedOperations.map(operation => {
        const { originType, id } = operation;
        if (originType === TRANSFER) {
          return <TransferItem isShowLookCheck key={`${originType}${id}`} transfer={operation} />;
        }
        if (originType === ORDER) {
          return (
            <OrderDetails variant="admin_operation" key={`${originType}${id}`} order={operation} />
          );
        }
        return null;
      })}
    </InfinityList>
  );
};

export default HistoryTab;
