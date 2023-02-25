import React, { useMemo } from 'react';
import Link from 'next/link';

import {
  DASHBOARD_COMPANY_PRODUCTS,
  DASHBOARD_COMPANY_ORDERS,
  DASHBOARD_COMPANY_INFO,
} from 'config/routes';
import { CompanyDirectionEnum, CompanyStatusEnum } from 'graphql/types';

import userHasAccess from 'rbac/userHasAccess';
import { destroyCompanyRule } from 'rbac/rules';

import Button from 'components/shared/atoms/Button';
import ActionLink from 'components/shared/atoms/ActionLink';
import LogoCompany from 'components/shared/atoms/LogoCompany';

import { useAccount } from 'lib/apollo/hooks/state/account';

import CompanyCheckStatus from '../CompanyCheckStatus';
import RemoveCompany from '../RemoveCompany';

import { CompaniesListItemWrapper, CompanyPhoto, CompanyInfo, Line, ButtonsWrap } from './styled';

const CompaniesListItem = ({ company, onMarkCompanyAsMain, refetchCompaniesCheck }) => {
  const {
    id: companyId,
    officialName,
    unofficialName,
    legalForm: { shortName: legalFormShortName },
    direction,
    main,
    myRole,
    lastEmployeeMembers,
    sellableProductsCount,
    status: verifiedStatus,
  } = company;

  const isVerified = verifiedStatus === CompanyStatusEnum.Verified;
  const isRejected = verifiedStatus === CompanyStatusEnum.Rejected;
  const isSeller = direction === CompanyDirectionEnum.Seller;
  const isShowRemoveCompanyButton = userHasAccess(myRole?.id, destroyCompanyRule);
  const { account } = useAccount({ companyId });
  const { balance } = account;

  const companyRoute = useMemo(() => {
    if (isRejected) return DASHBOARD_COMPANY_INFO;
    if (isSeller) return DASHBOARD_COMPANY_PRODUCTS;
    return DASHBOARD_COMPANY_ORDERS;
  }, [verifiedStatus, direction]);

  return (
    <CompaniesListItemWrapper data-cy="company-list-item">
      <CompanyCheckStatus status={verifiedStatus} />

      <CompanyPhoto isVerified={isVerified}>
        <div>
          <Link href={{ pathname: companyRoute, query: { companyId } }} passHref>
            <LogoCompany company={company} />
          </Link>
        </div>
      </CompanyPhoto>
      <CompanyInfo>
        <ActionLink
          size={16}
          label={unofficialName}
          $color="black"
          bold
          data-testid="unofficial-company-name"
          href={{ pathname: companyRoute, query: { companyId } }}
        />
        <Line />
        <span data-testid="official-company-name">
          {legalFormShortName} “{officialName}”
        </span>
        <strong>Баланс: {balance ?? 0} руб.</strong>

        {isSeller && <span>Количество товаров: {sellableProductsCount}</span>}

        <ButtonsWrap>
          <Button
            label={main ? 'Основная компания' : 'Установить как основную'}
            variant={main ? 'confirm' : 'neutral'}
            shape="rounded"
            size="small"
            $width="100%"
            $mb={12}
            onClick={() => {
              onMarkCompanyAsMain(companyId);
            }}
            disabled={main}
            data-cy="status-company"
          />

          <Button
            label={isRejected ? 'Редактировать' : 'Перейти в компанию'}
            size="small"
            $width="100%"
            $mb={12}
            testId="button-open-company"
            href={{ pathname: companyRoute, query: { companyId } }}
          />

          {isShowRemoveCompanyButton && (
            <RemoveCompany
              companyId={companyId}
              lastEmployeeMembers={lastEmployeeMembers}
              companyName={unofficialName}
              main={main}
              refetchCompaniesCheck={refetchCompaniesCheck}
            />
          )}
        </ButtonsWrap>
      </CompanyInfo>
    </CompaniesListItemWrapper>
  );
};

export default CompaniesListItem;
