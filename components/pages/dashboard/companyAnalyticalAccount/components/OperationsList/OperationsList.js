import React, { useMemo } from 'react';

import { numberFormat, dateFormat } from 'helpers';
import {
  AccountOperationOriginTypeEnum,
  AccountOperationSubjectEnum,
  AccountOperationTypeEnum,
} from 'graphql/types';

import { useAccountOperations } from 'lib/apollo/hooks/state/accountOperations';
import InfinityList from 'components/shared/organisms/InfinityList';

import { accountOperationsDictionary } from 'config/constants/accountOperations';

import ModalOrderDetails from '../ModalOrderDetails';

import { Wrapper, HeaderCol, Subscription, Amount, Date, Table } from './styled';

const cols = [
  { label: 'Сумма', width: 10, index: 1 },
  { label: '№ Заказа', width: 11, index: 2 },
  { label: 'Наименование операции', index: 3 },
  { label: 'Дата', width: 7, index: 4 },
];

const {
  ProductPayment,
  ProductDelivery,
  AgencyFee,
  Deposit,
  Withdrawal,
  DisputeFinished,
  FinishedDisputeDelivery,
} = AccountOperationSubjectEnum;

const OperationsList = ({ company, query, statuses = [] }) => {
  const { operations, searchQuery, startDate, endDate } = query;

  const orderIds = searchQuery ? searchQuery.split(' ') : [];

  const subjects = useMemo(() => {
    switch (operations) {
      case 'ORDERS':
        return [
          ProductPayment,
          ProductDelivery,
          AgencyFee,
          DisputeFinished,
          FinishedDisputeDelivery,
        ];
      case 'HISTORY':
        return [Deposit, Withdrawal];
      default:
        return [];
    }
  }, [query]);

  const { accountOperations, loading, loadingMore, pageInfo, fetchMore } = useAccountOperations({
    companyId: company.id,
    subjects,
    orderIds,
    first: 12,
    statuses,
    acceptedDate: { startDate, endDate },
  });

  const { endCursor, hasNextPage } = pageInfo;

  const onLoadMore = async () => {
    if (loadingMore) return;
    if (hasNextPage) {
      await fetchMore({ variables: { after: endCursor } });
    }
  };

  return (
    <Wrapper>
      <InfinityList
        onLoadMore={onLoadMore}
        loading={loading}
        hasNextPage={hasNextPage}
        dataLength={accountOperations.length}
        scrollableTarget="layout-template-content"
        titleEmptyMessage="По вашему запросу ничего не найдено"
        descriptionEmptyMessage="Попробуйте изменить формулировку"
      >
        <Table>
          <thead>
            <tr>
              {cols.map(({ label, width, index }) => (
                <HeaderCol width={width} key={index}>
                  {label}
                </HeaderCol>
              ))}
            </tr>
          </thead>
          <tbody>
            {accountOperations.map(
              ({
                amount,
                operationType,
                subject,
                acceptedAt,
                originType,
                originId,
                origin,
                id,
              }) => {
                const isIncrease = operationType === AccountOperationTypeEnum.Increase;
                const isOriginOrder = originType === AccountOperationOriginTypeEnum.Order;

                const vat = isOriginOrder ? origin?.product?.vat : origin?.vat;
                const createdDate = isOriginOrder ? origin?.placedAt : origin?.createdAt;

                const orderLinkText = isOriginOrder ? (
                  <ModalOrderDetails orderId={originId} company={company} />
                ) : (
                  '-'
                );

                return (
                  <tr key={id}>
                    <Amount color={isIncrease ? 'green' : 'blue'}>
                      {isIncrease ? '+' : '-'}&nbsp;{numberFormat(amount)} руб.
                    </Amount>
                    <td>{orderLinkText}</td>
                    <td>
                      {accountOperationsDictionary[subject]}
                      <Subscription>{vat ? `НДС ${vat}%` : 'НДС не облагается'}</Subscription>
                    </td>
                    <Date>
                      <div>{dateFormat(acceptedAt || createdDate)}</div>
                    </Date>
                  </tr>
                );
              },
            )}
          </tbody>
        </Table>
      </InfinityList>
    </Wrapper>
  );
};

export default OperationsList;
