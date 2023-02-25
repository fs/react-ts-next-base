import React from 'react';

import useCurrentUser from 'hooks/useCurrentUser';
import { useMarkCompanyAsMain } from 'lib/apollo/hooks/actions/companies';

import userHasAccess from 'rbac/userHasAccess';
import { createCompanyRule } from 'rbac/rules';

import EmptyListMessage from 'components/shared/molecules/EmptyListMessage';
import InfinityList from 'components/shared/organisms/InfinityList';

import CompaniesListItem from '../CompaniesListItem';
import CreateCompanyButton from './CreateCompanyButton';

import { CompaniesListWrapper, List, Title } from './styled';

const CompaniesList = ({
  activeDirection,
  myCompanies,
  loading,
  onLoadMore,
  pageInfo,
  refetchCompaniesCheck,
  fetchMoreCompanies,
}) => {
  const { user } = useCurrentUser();
  const isShowCreateCompanyButton = userHasAccess(user?.role.id, createCompanyRule);
  const [markCompanyAsMain] = useMarkCompanyAsMain();

  const buttons_count = isShowCreateCompanyButton ? 1 : 0;

  const onMarkCompanyAsMain = async companyId => {
    await markCompanyAsMain({ companyId });
    const companyIds = myCompanies.filter(({ main }) => Boolean(main)).map(({ id }) => id);
    await fetchMoreCompanies({ variables: { companyIds } });
  };

  return (
    <CompaniesListWrapper data-cy="companies-list">
      <Title>Список ваших компаний</Title>

      {myCompanies.length === 0 && !isShowCreateCompanyButton ? (
        <EmptyListMessage text="У вас нет доступных компаний" />
      ) : (
        <InfinityList
          dataLength={myCompanies.length + buttons_count}
          loading={loading}
          onLoadMore={onLoadMore}
          hasNextPage={pageInfo?.hasNextPage}
          scrollThreshold={0.9}
          scrollableTarget="layout-template-content"
        >
          <List>
            {isShowCreateCompanyButton && <CreateCompanyButton direction={activeDirection} />}

            {myCompanies.map(company => {
              return (
                <CompaniesListItem
                  company={company}
                  key={company?.id}
                  onMarkCompanyAsMain={onMarkCompanyAsMain}
                  refetchCompaniesCheck={refetchCompaniesCheck}
                />
              );
            })}
          </List>
        </InfinityList>
      )}
    </CompaniesListWrapper>
  );
};

export default CompaniesList;
