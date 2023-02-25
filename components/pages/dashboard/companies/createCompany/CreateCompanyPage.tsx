import React from 'react';
import useRouter from 'hooks/useRouter';
import { ParsedUrlQuery } from 'querystring';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { findAvailableValue } from 'helpers/types';
import { CompanyDirectionEnum } from 'graphql/types';

import Tabs from 'components/shared/molecules/Tabs';
import DashboardTemplate from 'components/shared/templates/DashboardTemplate';

import { TNextPage } from 'lib/apollo/types';
import CreateCompanyForm from '../components/CreateCompanyForm';

const names = {
  SELLER: 'Личный кабинет продавца',
  BUYER: 'Личный кабинет покупателя',
};

const parseQuery = (query: ParsedUrlQuery) => {
  const direction =
    findAvailableValue(query.direction, Object.values(CompanyDirectionEnum)) ||
    CompanyDirectionEnum.Seller;
  return {
    direction,
    isFirst: query.isFirst,
  };
};

export const CreateCompanyPage: TNextPage = ({ query }) => {
  const { direction, isFirst } = parseQuery(query);
  const { pushRoute } = useRouter();

  const TABS = [
    {
      id: CompanyDirectionEnum.Seller,
      name: names.SELLER,
      action: () =>
        pushRoute({
          query: {
            direction: CompanyDirectionEnum.Seller,
          },
        }),
    },
    {
      id: CompanyDirectionEnum.Buyer,
      name: names.BUYER,
      action: () =>
        pushRoute({
          query: {
            direction: CompanyDirectionEnum.Buyer,
          },
        }),
    },
  ];

  return (
    <DashboardTemplate testId="create-company-page" query={query} showBreadcrumbs>
      {!isFirst && <Tabs tabs={TABS} activeId={direction} />}
      <CreateCompanyForm direction={direction} isFirst={isFirst} />
    </DashboardTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(CreateCompanyPage))));
