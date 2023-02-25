import React from 'react';

import { DisputeProposalFragment } from 'graphql/fragments/__generated__/disputeProposalInfo.generated';
import { CompanyInfoFragment } from 'graphql/fragments/__generated__/companyInfo.generated';

import { DisputeProposalReturnPayerEnum } from 'graphql/types';
import { DisputeAcceptedWrapper, Header, Body } from './styled';

type TDisputeAcceptedProposal = {
  acceptedProposal: DisputeProposalFragment;
  orderId: string;
  disputeCompany: CompanyInfoFragment | null;
};

const DisputeAcceptedProposal = ({
  acceptedProposal,
  orderId,
  disputeCompany,
}: TDisputeAcceptedProposal) => {
  const { returnPayer, returnQuantity, productReturnAmount, deliveryReturnAmount } =
    acceptedProposal;

  return (
    <DisputeAcceptedWrapper>
      <Header>Решение по спору</Header>
      <Body>
        {disputeCompany ? (
          <div data-testid="proposal-accepted-title">
            Решение по спору с компанией {disputeCompany.legalForm.shortName} “
            {disputeCompany.officialName}” по заказу <strong>№{orderId}</strong> принято.
          </div>
        ) : (
          <div>
            Решение по спору по заказу <strong>№{orderId}</strong> принято.
          </div>
        )}
        <div>Результаты решения по спору:</div>
        <div>
          Возврат средств за товар: <strong>{productReturnAmount} руб.</strong> <br />
          Количество возвращаемого товара: <strong>{returnQuantity} шт.</strong> <br />
          Доставка товара:
          <strong>
            {returnPayer === DisputeProposalReturnPayerEnum.Buyer
              ? ' за счет покупателя'
              : ' за счет продавца'}
          </strong>
          <br />
          Возврат средств за доставку: <strong>{deliveryReturnAmount} руб.</strong>
        </div>
      </Body>
    </DisputeAcceptedWrapper>
  );
};

export default DisputeAcceptedProposal;
