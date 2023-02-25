import React from 'react';
import Link from 'next/link';

import { numberFormat } from 'helpers';
import { CONTRACT, DASHBOARD_COMPANY_PENDING_ACCOUNT_OPERATIONS } from 'config/routes';

import { useAccountOperations } from 'lib/apollo/hooks/state/accountOperations';
import { ACCOUNT_OPERATION_STATUS } from 'config/constants/accountOperations';

import Icon from 'components/shared/atoms/Icon';
import Loader from 'components/shared/atoms/Loader';
import Tooltip from 'components/shared/atoms/Tooltip';
import ActionLink from 'components/shared/atoms/ActionLink';

import ModalWithdrawal from '../ModalWithdrawal';
import AccountOperationsList from '../AccountOperationsList';

import {
  Wrapper,
  Header,
  Title,
  QuestionWrapper,
  Row,
  Code,
  AccountAmount,
  Deal,
  Balance,
  ActionButtons,
  Subtitle,
} from './styled';

const tooltipContent = (
  <>
    Условный аналитический счет не является расчетным счетом.{' '}
    <Link href={`${CONTRACT}#analytical-account`} target="_blank" rel="noreferrer">
      Подробнее
    </Link>
  </>
);

const AnalyticalAccountDetails = ({ company, account }) => {
  const { balance, pendingAmount } = account;

  const { accountOperations, loading } = useAccountOperations({
    companyId: company.id,
    statuses: [ACCOUNT_OPERATION_STATUS.PENDING],
    first: 4,
  });

  return (
    <Wrapper>
      <Header>
        <Title>
          Аналитический счет
          <QuestionWrapper>
            <Tooltip text={tooltipContent} interactive delayHide={200}>
              <Icon name="question" $color="greyA4" $size={21} />
            </Tooltip>
          </QuestionWrapper>
        </Title>
        <Code>{`№ ${company.id}`}</Code>
        <Row>
          <AccountAmount>
            В сделке: <Deal>{pendingAmount ? numberFormat(pendingAmount) : 0} руб.</Deal>
          </AccountAmount>
          <AccountAmount>
            Баланс: <Balance>{balance ? numberFormat(balance) : 0} руб.</Balance>
          </AccountAmount>
        </Row>
      </Header>

      <ActionButtons>
        <ModalWithdrawal company={company} balance={balance} />
      </ActionButtons>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Subtitle>
            Замороженные средства:
            <QuestionWrapper>
              <Tooltip text="Средства, участвующие в сделках и транзакции в процессе пополнения/вывода средств">
                <Icon name="question" $color="greyA4" $size={21} />
              </Tooltip>
            </QuestionWrapper>
          </Subtitle>

          {accountOperations.length <= 0 ? (
            <div>Нет замороженных средств</div>
          ) : (
            <AccountOperationsList accountOperations={accountOperations} company={company} />
          )}

          {accountOperations.length >= 0 && (
            <ActionLink
              label="Показать все"
              size={16}
              href={{
                pathname: DASHBOARD_COMPANY_PENDING_ACCOUNT_OPERATIONS,
                query: { companyId: company.id },
              }}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default AnalyticalAccountDetails;
