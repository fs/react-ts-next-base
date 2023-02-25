import React, { useMemo } from 'react';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import withRoutesRules from 'lib/roles/withRoutesRules';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import Sorter from 'components/shared/atoms/Sorter';
import SearchForm from 'components/shared/molecules/SearchForm';
import AdminTemplate from 'components/shared/templates/AdminTemplate';

import AdminCompaniesReviews from './components/AdminCompaniesReviews';
import AdminProductReviews from './components/AdminProductReviews';
import { SearchWrapper } from './styled';
import { companyOptions, productOptions, REVIEW_TYPE } from './constants';

export const AdminReviewsPage = ({ query }) => {
  const { tab, searchQuery, sortOrder } = query;
  const currentTabName = tab || REVIEW_TYPE.COMPANIES;
  const { pushRoute } = useRouter();

  const onChangeTab = selectedTab => {
    pushRoute({
      query: {
        tab: selectedTab,
      },
    });
  };

  const TABS = [
    {
      id: REVIEW_TYPE.COMPANIES,
      name: 'О компаниях',
      action: () => onChangeTab(REVIEW_TYPE.COMPANIES),
    },
    {
      id: REVIEW_TYPE.PRODUCT,
      name: 'О товарах',
      action: () => onChangeTab(REVIEW_TYPE.PRODUCT),
    },
  ];

  const currentTab = useMemo(() => {
    switch (currentTabName) {
      case REVIEW_TYPE.PRODUCT:
        return <AdminProductReviews searchQuery={searchQuery} sortOrder={sortOrder} />;
      case REVIEW_TYPE.COMPANIES:
        return <AdminCompaniesReviews searchQuery={searchQuery} sortOrder={sortOrder} />;
      default:
        return <></>;
    }
  }, [query]);

  const sorterOptions = currentTabName === REVIEW_TYPE.COMPANIES ? companyOptions : productOptions;

  return (
    <AdminTemplate title="Отзывы" tabs={TABS} activeId={currentTabName} testId="admin-users-page">
      <SearchWrapper>
        <SearchForm $width="43rem" $mr={10} rounded />
        <Sorter options={sorterOptions} variant="light" $width="12rem" />
      </SearchWrapper>
      {currentTab}
    </AdminTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(AdminReviewsPage))));
