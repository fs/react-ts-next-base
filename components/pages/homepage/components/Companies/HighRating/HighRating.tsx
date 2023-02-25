import React from 'react';
import useRouter from 'hooks/useRouter';

import { parseSearchQuery } from 'helpers';
import { COMPANIES_RATING } from 'config/routes';
import { useCompanies } from 'lib/apollo/hooks/state/companies';

import { CompanyOrderEnum, CompanyStatusEnum, CompanyDirectionEnum } from 'graphql/types';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import EmptyMessage from 'components/shared/molecules/EmptyMessage';
import SearchForm from 'components/shared/molecules/SearchForm';
import CompanyCard from 'components/shared/molecules/CompanyCard';

import { CompanyItemWrapper, HighRatingCompaniesWrapper } from '../styled';
import { CompaniesWrapper, ContentWrapper } from './styled';

const HighRating = () => {
  const { query } = useRouter();

  const queryObject = {
    searchQuery: parseSearchQuery(query.ratingSearchQuery),
    statuses: [CompanyStatusEnum.Verified],
    directions: [CompanyDirectionEnum.Seller],
    orderBy: CompanyOrderEnum.Rating,
    first: 3,
  };
  const { companies, loading } = useCompanies(queryObject);

  return (
    <HighRatingCompaniesWrapper>
      <SearchForm placeholder="Название компании или ИНН" searchInputName="ratingSearchQuery" />
      <ContentWrapper>
        {loading ? (
          <Loader />
        ) : companies?.length ? (
          <CompaniesWrapper>
            {companies.map(company => (
              <CompanyItemWrapper key={company.id}>
                <CompanyCard company={company} />
              </CompanyItemWrapper>
            ))}
          </CompaniesWrapper>
        ) : (
          <EmptyMessage
            title="По вашему запросу ничего не найдено"
            description="Попробуйте изменить формулировку"
          />
        )}
      </ContentWrapper>
      <Breadcrumbs
        variant="secondary"
        text="Смотреть рейтинги всех компаний"
        url={COMPANIES_RATING}
        position="right"
      />
    </HighRatingCompaniesWrapper>
  );
};

export default HighRating;
