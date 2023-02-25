import React from 'react';

import { ADMIN_COMPANY } from 'config/routes';

import InfinityList from 'components/shared/organisms/InfinityList';
import AdminCompanyInfo from 'components/shared/molecules/AdminCompanyInfo';

import { CompanyItem } from './styled';

const Companies = ({ customerCompanies, loading, pageInfo, onLoadMore }) => {
  return (
    <InfinityList
      onLoadMore={onLoadMore}
      loading={loading}
      hasNextPage={pageInfo?.hasNextPage}
      dataLength={customerCompanies.length}
      scrollableTarget="admin-template-content"
      $width="75rem"
    >
      {customerCompanies.map(company => (
        <CompanyItem key={company?.id}>
          <AdminCompanyInfo company={company} route={ADMIN_COMPANY} showTime={false} />
        </CompanyItem>
      ))}
    </InfinityList>
  );
};

export default Companies;
