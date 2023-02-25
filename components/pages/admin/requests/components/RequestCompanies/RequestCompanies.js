import React from 'react';

import { ADMIN_REQUEST } from 'config/routes';

import InfinityList from 'components/shared/organisms/InfinityList';
import AdminCompanyInfo from 'components/shared/molecules/AdminCompanyInfo';

import { NOT_VERIFIED } from 'config/constants/status';

import { RequestCompaniesWrapper, CompanyItem } from './styled';

const RequestCompanies = ({ customerCompanies, loading, pageInfo, onLoadMore }) => {
  return (
    <InfinityList
      onLoadMore={onLoadMore}
      loading={loading}
      hasNextPage={pageInfo?.hasNextPage}
      dataLength={customerCompanies.length}
      scrollableTarget="admin-template-content"
      $width="75rem"
    >
      <RequestCompaniesWrapper>
        {customerCompanies.map(company => {
          const showTime = company.status === NOT_VERIFIED;
          return (
            <CompanyItem key={company?.id}>
              <AdminCompanyInfo company={company} route={ADMIN_REQUEST} showTime={showTime} />
            </CompanyItem>
          );
        })}
      </RequestCompaniesWrapper>
    </InfinityList>
  );
};

export default RequestCompanies;
