import React, { useMemo } from 'react';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import { SELLER, BUYER } from 'config/constants/directions';
import { getStatus } from 'config/constants/status';

import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import Tabs from 'components/shared/molecules/Tabs';
import ErrorPage from 'pages/_error';

import Loader from 'components/shared/atoms/Loader';
import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';
import CompanyReviewsList from 'components/shared/molecules/CompanyReviewsList';
import ProductReviewsList from './components/ProductReviewsList';
import { ReviewsListWrapper } from './styled';

const tabs = {
  COMPANY: 'COMPANY',
  PRODUCTS: 'PRODUCTS',
};

export const CompanyReviewsPage = ({ query }) => {
  const { companyId } = query;
  const { pushRoute } = useRouter();
  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;
  const isSeller = company?.direction === SELLER;

  const names = {
    COMPANY: isSeller ? 'Отзывы о моей компании' : 'Мои отзывы о компаниях',
    PRODUCTS: isSeller ? 'Отзывы о моих товарах' : 'Мои отзывы о заказанных товарах',
  };

  const isCompanyVerified = getStatus(company?.status);
  const emptyListText = useMemo(() => {
    const isCompanyTab = !query?.type || query?.type === tabs.COMPANY;
    switch (company?.direction) {
      case SELLER:
        return isCompanyTab
          ? 'У вашей компании еще нет отзывов'
          : 'У ваших товаров еще нет отзывов';
      case BUYER:
        return isCompanyTab
          ? 'Вы сможете оставить отзыв о компаниях когда получите первый заказ'
          : 'Вы сможете оставить отзыв о товарах когда получите первый заказ';
      default:
        return '';
    }
  }, [query]);

  const TABS = [
    {
      id: tabs.COMPANY,
      name: names.COMPANY,
      content: (
        <ReviewsListWrapper>
          <CompanyReviewsList
            isSeller={isSeller}
            companyId={companyId}
            emptyListText={emptyListText}
            scrollableTarget="layout-template-content"
          />
        </ReviewsListWrapper>
      ),
      action: () =>
        pushRoute({
          query: { ...query, type: tabs.COMPANY },
        }),
    },
    {
      id: tabs.PRODUCTS,
      name: names.PRODUCTS,
      content: (
        <ProductReviewsList
          isSeller={isSeller}
          companyId={companyId}
          emptyListText={emptyListText}
        />
      ),
      action: () =>
        pushRoute({
          query: { ...query, type: tabs.PRODUCTS },
        }),
    },
  ];

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  return (
    <CompanyTemplate testId="company-reviews-page" company={company}>
      {!loading ? (
        <>
          {isCompanyVerified ? (
            <>
              <Tabs tabs={TABS} activeId={query?.type || tabs.COMPANY} />
            </>
          ) : (
            <EmptyMessageCheckingCompany />
          )}
        </>
      ) : (
        <Loader testId="company-orders-loader" />
      )}
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(CompanyReviewsPage))));
