import React from 'react';

import { DisputeProposalFragment } from 'graphql/fragments/__generated__/disputeProposalInfo.generated';
import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';
import { DisputeProposalOriginatorEnum, DisputeProposalReturnPayerEnum } from 'graphql/types';
import { dateAndTimeFormat, numberFormat } from 'helpers';

import InfinityList from 'components/shared/organisms/InfinityList';

import {
  DisputeHistoryListWrapper,
  DisputeHistoryItem,
  Header,
  ProposalInfo,
  Comment,
} from './styled';

type TDisputeHistoryList = {
  disputeProposals: DisputeProposalFragment[];
  comment: DisputeFragment['comment'];
  onLoadMore: () => Promise<void>;
  loading: boolean;
  hasNextPage: boolean;
};

const DisputeHistoryList = ({
  disputeProposals,
  comment,
  onLoadMore,
  loading,
  hasNextPage,
}: TDisputeHistoryList) => {
  return (
    <InfinityList
      onLoadMore={onLoadMore}
      loading={loading}
      hasNextPage={hasNextPage}
      dataLength={disputeProposals.length}
      scrollableTarget="layout-template-content"
    >
      <DisputeHistoryListWrapper>
        {disputeProposals.map(
          (
            {
              createdAt,
              productReturnAmount,
              deliveryReturnAmount,
              returnRequired,
              returnQuantity,
              returnPayer,
              comment: proposalComment,
              originator,
            },
            index,
          ) => (
            <DisputeHistoryItem key={index} data-testid="dispute-history-item">
              <Header>
                {originator === DisputeProposalOriginatorEnum.Seller
                  ? 'Решение продавца'
                  : 'Решение покупателя'}{' '}
                №{Math.ceil((index + 1) / 2)} от {dateAndTimeFormat(createdAt)}
              </Header>
              <ProposalInfo>
                <div>
                  Возврат средств за товар:{' '}
                  <strong>{numberFormat(productReturnAmount)} руб.</strong>
                </div>
                <div>
                  Количество возвращаемого товара:{' '}
                  <strong>
                    {returnRequired && returnQuantity ? numberFormat(returnQuantity) : 0} шт.
                  </strong>
                </div>
                <div>
                  Доставка товара:{' '}
                  <strong>
                    {returnRequired
                      ? returnPayer === DisputeProposalReturnPayerEnum.Buyer
                        ? 'за счет покупателя'
                        : 'за счет продавца'
                      : 'не нужна'}
                  </strong>
                </div>
                <div>
                  Возврат средств за доставку:{' '}
                  <strong>{numberFormat(deliveryReturnAmount)} руб.</strong>
                </div>
                {index === 0 && <Comment>Комментарий: {comment || '-'}</Comment>}
                {proposalComment && <Comment>Причина отклонения: {proposalComment || '-'}</Comment>}
              </ProposalInfo>
            </DisputeHistoryItem>
          ),
        )}
      </DisputeHistoryListWrapper>
    </InfinityList>
  );
};

export default DisputeHistoryList;
