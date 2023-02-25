import React from 'react';
import useRouter from 'hooks/useRouter';
import { parseSearchQuery } from 'helpers';

import { CompanyStatusEnum } from 'graphql/types';
import { COMPANIES_BLACK_LIST } from 'config/routes';

import { useCompanies } from 'lib/apollo/hooks/state/companies';

import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import SearchForm from 'components/shared/molecules/SearchForm';
import EmptyMessage from 'components/shared/molecules/EmptyMessage';

import BlackListCompanyCard from '../BlackListCompanyCard';
import { BlackListCompaniesWrapper, CompanyItemWrapper } from '../styled';
import { CompaniesWrapper, ContentWrapper, LoaderWrapper } from './styled';

const Blacklist = () => {
  const { query } = useRouter();

  const queryObject = {
    searchQuery: parseSearchQuery(query.blackListSearchQuery),
    statuses: [CompanyStatusEnum.Blacklisted],
    first: 3,
  };

  const { companies, loading } = useCompanies(queryObject);

  return (
    <BlackListCompaniesWrapper>
      <SearchForm placeholder="Название компании или ИНН" searchInputName="blackListSearchQuery" />
      <ContentWrapper>
        {loading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : companies?.length ? (
          <CompaniesWrapper>
            {companies.map(company => (
              <CompanyItemWrapper key={company?.id}>
                <BlackListCompanyCard company={company} />
              </CompanyItemWrapper>
            ))}
          </CompaniesWrapper>
        ) : (
          <EmptyMessage
            title="По вашему запросу ничего не найдено"
            description="Попробуйте изменить формулировку"
            showImage={false}
          />
        )}
      </ContentWrapper>
      <Breadcrumbs
        url={COMPANIES_BLACK_LIST}
        text="Смотреть все компании в черном списке"
        position="right"
        variant="secondary"
      />
    </BlackListCompaniesWrapper>
  );
};

export default Blacklist;
