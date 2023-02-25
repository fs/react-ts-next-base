import React, { useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { parseSearchQuery } from 'helpers';

import withAuth from 'lib/auth/withAuth';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withRoutesRules from 'lib/roles/withRoutesRules';

import useCurrentUser from 'hooks/useCurrentUser';
import { useFavoriteProducts } from 'lib/apollo/hooks/state/favoriteProducts';

import { TNextPage } from 'lib/apollo/types';
import { EView } from 'public/styles/config/view';

import ErrorPage from 'pages/_error';
import ProductCard from 'components/shared/organisms/ProductCard';
import InfinityList from 'components/shared/organisms/InfinityList';
import ProductListBar from 'components/shared/organisms/ProductListBar';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import { PageWrapper, Header, PageContainer, ProductsWrapper } from './styled';

const parseQuery = (query: ParsedUrlQuery) => {
  return {
    searchQuery: parseSearchQuery(query.searchQuery),
  };
};

export const FavoriteProductsPage: TNextPage = ({ query }) => {
  const { searchQuery } = parseQuery(query);
  const [view, setView] = useState<EView>(EView.tile);

  const { isUserBuyer } = useCurrentUser();
  const { favoriteProducts, loading, loadingMore, error, refetch, fetchMore, pageInfo } =
    useFavoriteProducts({
      searchQuery,
      first: 12,
    });
  const { endCursor, hasNextPage } = pageInfo;

  const onLoadMore = async () => {
    if (loadingMore) return;
    if (hasNextPage) {
      await fetchMore({ variables: { after: endCursor } });
    }
  };

  const emptyMessageText = searchQuery
    ? {
        title: 'По вашему запросу ничего не найдено',
        description: 'Попробуйте изменить формулировку',
      }
    : {
        title: 'У вас еще нет избранных товаров',
        description: 'Попробуйте добавить товар в Избранное, чтобы увидеть его на этой странице',
      };

  if ((!loading && error) || !isUserBuyer) return <ErrorPage statusCode={404} />;

  return (
    <LayoutTemplate testId="favorite-products-page">
      <PageContainer>
        <PageWrapper>
          <Header>Товары, которые мне понравились</Header>
          <ProductListBar view={view} setView={setView} />
          <InfinityList
            onLoadMore={onLoadMore}
            loading={loading}
            hasNextPage={hasNextPage}
            dataLength={favoriteProducts.length}
            scrollableTarget="layout-template-content"
            titleEmptyMessage={emptyMessageText.title}
            descriptionEmptyMessage={emptyMessageText.description}
          >
            <ProductsWrapper view={view}>
              {favoriteProducts.map(product => {
                return (
                  <ProductCard
                    product={product}
                    refetchProducts={refetch}
                    isFavoriteModalShown
                    view={view}
                    key={product.id}
                  />
                );
              })}
            </ProductsWrapper>
          </InfinityList>
        </PageWrapper>
      </PageContainer>
    </LayoutTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(FavoriteProductsPage))),
);
