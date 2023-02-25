import React from 'react';
import useRouter from 'hooks/useRouter';

import { DASHBOARD_COMPANY_INFO, DASHBOARD_COMPANY_CREATE_PRODUCT_DRAFT } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Loader from 'components/shared/atoms/Loader';

import ProductCard from 'components/shared/organisms/ProductCard';
import InfinityList from 'components/shared/organisms/InfinityList';
import EmptyMessage from 'components/shared/molecules/EmptyMessage';
import EmptyListMessage from 'components/shared/molecules/EmptyListMessage';
import EmptyListMessageWithMoveButton from 'components/shared/molecules/EmptyListMessageWithMoveButton';

import { ContentWrapper, ProductsListWrapper, CreateDraftWrapper, ButtonText } from './styled';
import { productTypes } from '../../constants';

const emptyMessageText = {
  [productTypes.TEMPLATE]: 'Вы еще не создали ни одного шаблона товара',
  [productTypes.DRAFT]: 'Вы еще не создали ни одного черновика товара',
  [productTypes.DELETED]: 'Вы еще не удалили ни одного товара',
  [productTypes.ACTIVE]: 'Нет товаров',
};

const ProductsList = ({
  products,
  loading,
  companyId,
  isCompanyFullFilled,
  query,
  searchQuery,
  pageInfo,
  onLoadMore,
  refetchProducts,
}) => {
  const { pushRoute } = useRouter();
  const { type, productStatuses } = query;

  const isTypeActive = type === productTypes.ACTIVE;
  const isTypeDraft = type === productTypes.DRAFT;
  const isEmpty = !products?.length;

  const noProducts = !loading && isEmpty && isCompanyFullFilled;
  const hasProducts = !loading && !isEmpty && isCompanyFullFilled;

  const onCreateProductDraft = async () => {
    pushRoute({ pathname: DASHBOARD_COMPANY_CREATE_PRODUCT_DRAFT, query: { companyId } });
  };

  const moveToCompany = () => {
    pushRoute({ pathname: DASHBOARD_COMPANY_INFO, query: { companyId } });
  };

  return (
    <ContentWrapper>
      {loading && <Loader />}

      {!loading && !isCompanyFullFilled && (
        <EmptyListMessageWithMoveButton onHandleClick={moveToCompany} />
      )}

      {noProducts &&
        (searchQuery || productStatuses ? (
          <EmptyMessage
            title="По вашему запросу ничего не найдено"
            description="Попробуйте изменить формулировку"
          />
        ) : (
          <EmptyListMessage
            withCreateProductButton={isTypeActive}
            onCreateProductDraft={isTypeActive ? onCreateProductDraft : () => {}}
            text={emptyMessageText[type]}
          />
        ))}

      {hasProducts && (
        <InfinityList
          dataLength={products.length}
          loading={loading}
          hasNextPage={pageInfo?.hasNextPage}
          onLoadMore={onLoadMore}
          scrollableTarget="layout-template-content"
        >
          <ProductsListWrapper data-cy="products-list" isEmpty={isEmpty}>
            {(isTypeActive || isTypeDraft) && (
              <CreateDraftWrapper>
                <Button
                  shape="extra-rounded"
                  $width="100%"
                  testId="create-product-button"
                  href={{ pathname: DASHBOARD_COMPANY_CREATE_PRODUCT_DRAFT, query: { companyId } }}
                >
                  <Icon name="product-add" $size={42} $color="white" />
                  <ButtonText>
                    Добавить <br />
                    новый товар
                  </ButtonText>
                </Button>
              </CreateDraftWrapper>
            )}

            {products.map(product => (
              <ProductCard
                product={product}
                key={product.id}
                variant="company"
                view="tile"
                refetchProducts={refetchProducts}
                $width="16.5rem"
              />
            ))}
          </ProductsListWrapper>
        </InfinityList>
      )}
    </ContentWrapper>
  );
};

export default ProductsList;
