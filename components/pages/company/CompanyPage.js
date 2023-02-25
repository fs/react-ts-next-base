import React from 'react';
import useRouter from 'hooks/useRouter';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useCompanies } from 'lib/apollo/hooks/state/companies';

import { BLACKLISTED, VERIFIED } from 'config/constants/status';
import { CompanyDirectionEnum } from 'graphql/types';

import ErrorPage from 'pages/_error';
import Loader from 'components/shared/atoms/Loader';
import Tabs from 'components/shared/molecules/Tabs';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import CompanyMainInfo from './components/CompanyMainInfo';
import CompanyProducts from './components/CompanyProducts';
import CompanyReviews from './components/CompanyReviews';

import { PageContainer, Wrapper, Content, ReviewTitle } from './styled';

const config = {
  reviews: 'reviews',
  products: 'products',
};

export const CompanyPage = ({ query }) => {
  const { companyId, products } = query;
  const { pushRoute } = useRouter();

  const { companies, loading } = useCompanies({
    companyIds: [companyId],
    statuses: [VERIFIED, BLACKLISTED],
    directions: [CompanyDirectionEnum.Seller],
  });
  const [company] = companies;

  const TABS = [
    {
      id: config.reviews,
      name: 'Отзывы о продавце',
      content: <CompanyReviews company={company} />,
      action: () => pushRoute({ query: { companyId, [config.reviews]: true } }),
    },
    {
      id: config.products,
      name: 'Товары продавца',
      content: <CompanyProducts company={company} query={query} />,
      action: () => pushRoute({ query: { companyId, [config.products]: true } }),
    },
  ];

  const activeTab = products ? config.products : config.reviews;

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  return (
    <LayoutTemplate testId="company-page">
      <PageContainer>
        <Wrapper>
          <Content>
            {loading ? (
              <Loader testId="company-page-loader" />
            ) : (
              <>
                <CompanyMainInfo company={company} />
                {company.status === BLACKLISTED ? (
                  <>
                    <ReviewTitle>Отзывы о продавце</ReviewTitle>
                    <CompanyReviews company={company} />
                  </>
                ) : (
                  <Tabs tabs={TABS} activeId={activeTab} />
                )}
              </>
            )}
          </Content>
        </Wrapper>
      </PageContainer>
    </LayoutTemplate>
  );
};

export default withGetDataFromTree(withAuth(withRoutesRules(CompanyPage)));
