import React from 'react';
import useRouter from 'hooks/useRouter';

import { useAccount } from 'lib/apollo/hooks/state/account';
import {
  DASHBOARD_COMPANY_ANALYTICAL_ACCOUNT,
  DASHBOARD_COMPANY_PENDING_ACCOUNT_OPERATIONS,
} from 'config/routes';

import { numberFormat } from 'helpers';

import { useCompanySidebar } from 'lib/apollo/hooks/state/clientSideState';

import { StyledMenuLink } from '../styled';
import { FinancesWrapper, FinancesToggler, Items } from './styled';

const Finances = ({ company }) => {
  const { id: companyId } = company;

  const { pathname } = useRouter();

  const isAnalyticalAccount = [
    DASHBOARD_COMPANY_ANALYTICAL_ACCOUNT,
    DASHBOARD_COMPANY_PENDING_ACCOUNT_OPERATIONS,
  ].includes(pathname);

  const { account } = useAccount({ companyId });
  const { balance, pendingAmount } = account;
  const { companySidebar, toggleIsShowFinances } = useCompanySidebar();

  return (
    <FinancesWrapper>
      <div>
        <FinancesToggler onClick={toggleIsShowFinances} isOpen={companySidebar?.isShowFinances} />
        <StyledMenuLink
          $isActive={isAnalyticalAccount}
          href={{ pathname: DASHBOARD_COMPANY_ANALYTICAL_ACCOUNT, query: { companyId } }}
          passHref
        >
          Аналитический счет
        </StyledMenuLink>
      </div>
      {companySidebar?.isShowFinances && (
        <Items>
          <div>Баланс: {numberFormat(balance)} руб.</div>
          <div>В сделке: {numberFormat(pendingAmount)} руб.</div>
        </Items>
      )}
    </FinancesWrapper>
  );
};

export default Finances;
