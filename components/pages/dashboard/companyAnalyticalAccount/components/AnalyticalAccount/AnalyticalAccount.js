import React from 'react';

import { AccountOperationStatusEnum } from 'graphql/types';
import AnalyticalAccountDetails from '../AnalyticalAccountDetails';
import AnalyticalAccountTabs from '../AnalyticalAccountTabs';
import AnalyticalAccountSearchBar from '../AnalyticalAccountSearchBar';
import OperationsList from '../OperationsList';
import { TableWrapper } from './styled';

const AnalyticalAccount = ({ query, company, account }) => {
  return (
    <>
      <AnalyticalAccountDetails company={company} account={account} />

      <AnalyticalAccountTabs query={query} />

      <TableWrapper>
        <AnalyticalAccountSearchBar query={query} />
        <OperationsList
          statuses={[AccountOperationStatusEnum.Accepted]}
          company={company}
          query={query}
        />
      </TableWrapper>
    </>
  );
};

export default AnalyticalAccount;
