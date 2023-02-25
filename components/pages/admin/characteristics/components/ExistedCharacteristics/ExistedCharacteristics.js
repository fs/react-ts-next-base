import React from 'react';

import { useProperties } from 'lib/apollo/hooks/state/properties';

import InfinityList from 'components/shared/organisms/InfinityList';
import PropertyInfo from 'components/shared/molecules/PropertyInfo';
import SearchForm from 'components/shared/molecules/SearchForm';

import CharacteristicsSorter from '../CharacteristicsSorter';
import { ContentWrapper, PropertiesWrapper } from './styled';

const ExistedCharacteristics = ({ query }) => {
  const { searchQuery } = query;
  const categoryId = Array(4)
    .fill(null)
    .map((_, i) => query[`parentIdDepth${i}`] || null)
    .filter(Boolean)
    .slice(-1);

  const { properties, loading, loadingMore, pageInfo, fetchMore } = useProperties({
    name: searchQuery,
    categoryIds: categoryId,
    first: 12,
  });

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: pageInfo?.endCursor } });
  };

  return (
    <ContentWrapper data-testid="existed-properties-tab">
      <SearchForm placeholder="Поиск по названию" rounded />
      <CharacteristicsSorter query={query} />
      <PropertiesWrapper>
        <InfinityList
          dataLength={properties.length}
          hasNextPage={pageInfo?.hasNextPage}
          onLoadMore={onLoadMore}
          loading={loading}
          scrollableTarget="admin-template-content"
        >
          {properties.map(({ name, id }) => (
            <PropertyInfo name={name} id={id} key={id} />
          ))}
        </InfinityList>
      </PropertiesWrapper>
    </ContentWrapper>
  );
};

export default ExistedCharacteristics;
