import React, { useMemo } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import useRouter from 'hooks/useRouter';

import { useResolveDispute } from 'lib/apollo/hooks/actions/dispute';

import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';
import { DisputeProposalFragment } from 'graphql/fragments/__generated__/disputeProposalInfo.generated';
import { CustomerOrdersQueryResult } from 'graphql/queries/__generated__/customerOrders.generated';
import { DisputeProposalReturnPayerEnum } from 'graphql/types';

import { numberFormat } from 'helpers';
import { DASHBOARD_COMPANY_CREATE_DISPUTE_PROPOSAL } from 'config/routes';

import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { ProposalItemWrapper, ProposalInfo, Comment, ActionsWrapper } from './styled';
import RequestDisputeHelpModal from '../RequestDisputeHelpModal';

type TProposalItem = {
  order: OrderInfoFragment;
  proposal: DisputeProposalFragment;
  isSeller: boolean;
  isSellersProposal: boolean;
  showActions: boolean;
  dispute: DisputeFragment;
  refetchOrders?: CustomerOrdersQueryResult['refetch'];
};

const ProposalItem = ({
  dispute,
  order,
  proposal,
  isSeller,
  isSellersProposal,
  showActions,
  refetchOrders,
}: TProposalItem) => {
  const { id: orderId, buyer, seller } = order;

  const companyId = buyer?.myRole ? buyer?.id : seller?.id;
  const {
    id: proposalId,
    deliveryReturnAmount,
    productReturnAmount,
    returnPayer,
    returnQuantity,
    returnRequired,
    comment: proposalComment,
  } = proposal;

  const [resolveDispute] = useResolveDispute({ onSubmit: refetchOrders });
  const declineProposalModal = useModal(SimpleModal);
  const resolveDisputeModal = useModal(SimpleModal);
  const requestDisputeHelpModal = useModal(RequestDisputeHelpModal);
  const { pushRoute } = useRouter();

  const showRequestDisputeHelpModal = async () => {
    await requestDisputeHelpModal.show({ disputeId: dispute?.id });
  };

  const showDeclineProposal = async () => {
    await declineProposalModal.show({
      onSubmit: async () => {
        pushRoute({
          pathname: DASHBOARD_COMPANY_CREATE_DISPUTE_PROPOSAL,
          query: {
            companyId,
            orderId,
          },
        });
      },
      title: 'Отклонить решение по спору',
      description: (
        <>
          Вы уверены, что хотите отклонить решение {isSeller ? 'покупателя' : 'продавца'} по спору?
          <br />
          Нажимая “Изменить решение”, вы должны будете отредактировать ваш вариант решения спора.
        </>
      ),
      acceptText: 'Изменить решение',
    });
  };

  const showResolveProposal = async () => {
    await resolveDisputeModal.show({
      variant: 'confirm',
      onSubmit: async () => {
        await resolveDispute({ proposalId });
      },
      title: 'Принять решение по спору',
      description: 'Вы уверены, что хотите принять это решение по спору?',
      subDescription: 'При нажатии “Принять решение” спор будет завершен.',
      acceptText: 'Принять решение',
    });
  };

  const showRequestHelpButton =
    dispute.canRequestSupport.value &&
    ((isSeller && isSellersProposal) || (!isSeller && !isSellersProposal));

  const actions = useMemo(() => {
    if (showRequestHelpButton)
      return (
        <Button
          testId="request-dispute-support"
          onClick={showRequestDisputeHelpModal}
          label="Нужна помощь"
          $width="8.75rem"
          size="small"
        />
      );
    if (dispute.canAcceptProposal.value)
      return (
        <>
          <Button
            label="Принять"
            variant="confirm"
            $width="8.75rem"
            size="small"
            onClick={showResolveProposal}
            testId="resolve-proposal-button"
          />
          <Button
            label="Отклонить"
            variant="change"
            $width="8.75rem"
            size="small"
            onClick={showDeclineProposal}
            testId="decline-proposal-button"
          />
        </>
      );
    return <></>;
  }, [proposal, isSeller, isSellersProposal]);

  return (
    <ProposalItemWrapper>
      <ProposalInfo>
        <div>
          Возврат средств за товар: <strong>{numberFormat(productReturnAmount)} руб.</strong>
        </div>
        <div>
          Количество возвращаемого товара:{' '}
          <strong>{returnRequired ? numberFormat(returnQuantity) : 0} шт.</strong>
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
          Возврат средств за доставку: <strong>{numberFormat(deliveryReturnAmount)} руб.</strong>
        </div>
        {!isSellersProposal && <Comment>Комментарий: {dispute.comment || '-'}</Comment>}
        {proposalComment && <Comment>Причина отклонения: {proposalComment || '-'}</Comment>}
      </ProposalInfo>

      {showActions && <ActionsWrapper>{actions}</ActionsWrapper>}
    </ProposalItemWrapper>
  );
};

export default ProposalItem;
