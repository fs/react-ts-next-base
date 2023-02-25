import React from 'react';

import { AccountOperationOriginTypeEnum, AccountOperationTypeEnum } from 'graphql/types';
import { numberFormat } from 'helpers';

import { accountOperationsDictionary } from 'config/constants/accountOperations';
import ModalOrderDetails from '../ModalOrderDetails';

import {
  AccountOperationsListWrapper,
  AccountOperation,
  OperationAmount,
  OperationDetails,
} from './styled';

export const AccountOperationsList = ({ accountOperations, company }) => {
  return (
    <AccountOperationsListWrapper>
      {accountOperations.map(({ id, amount, operationType, subject, originId, originType }) => {
        const isIncrease = operationType === AccountOperationTypeEnum.Increase;
        const isOriginOrder = originType === AccountOperationOriginTypeEnum.Order;
        const sign = isIncrease ? '+' : '-';
        return (
          <AccountOperation key={id} data-testid="account-operation">
            <OperationAmount color={isIncrease ? 'green' : 'blue'}>
              {`${sign} ${numberFormat(amount)} руб.`}
            </OperationAmount>
            {isOriginOrder && <ModalOrderDetails orderId={originId} company={company} />}
            <OperationDetails>{accountOperationsDictionary[subject]}</OperationDetails>
          </AccountOperation>
        );
      })}
    </AccountOperationsListWrapper>
  );
};

export default AccountOperationsList;
