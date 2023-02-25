import React from 'react';
import useRouter from 'hooks/useRouter';

import { DASHBOARD_COMPANY_CREATE_PRODUCT, PRODUCT } from 'config/routes';
import { StatusEnum } from 'graphql/types';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import {
  FavoriteButton,
  RemoveProductButton,
  RenewProductButton,
  RestoreProductButton,
  UseTemplateButton,
} from './Buttons';
import { parseQuery, TActionButtons } from './types';
import { CompanyButtonsWrapper, CatalogButtonsWrapper } from './styled';

const ActionButtons = ({
  product,
  variant,
  view,
  isUserBuyer,
  isFavoriteModalShown,
  refetchProducts,
}: TActionButtons) => {
  const { favorite, id: productId, deleted, template, status, draft, name } = product;
  const productName = name || '';

  const { query } = useRouter();
  const { companyId } = parseQuery(query);

  const companyActions = () => {
    if (deleted) {
      return <RestoreProductButton productId={productId} companyId={companyId} />;
    }
    if (template) {
      return (
        <>
          <RemoveProductButton id={productId} name={productName} isTemplate={template} />
          <Button
            variant="change"
            iconType="only"
            icon={<Icon name="pencil" $color="white" $size={18} />}
            testId="edit-product-button"
            $width="100%"
            href={{ pathname: DASHBOARD_COMPANY_CREATE_PRODUCT, query: { companyId, productId } }}
          />
          <UseTemplateButton productId={productId} companyId={companyId} />
        </>
      );
    }
    if (status === StatusEnum.OutOfStock) {
      return (
        <>
          <RemoveProductButton id={productId} name={productName} isDraft={draft} />
          <RenewProductButton productId={productId} companyId={companyId} onlyRedirect={draft} />
        </>
      );
    }
    if (draft) {
      return (
        <>
          <RemoveProductButton id={productId} name={productName} isDraft={draft} />
          <Button
            label="Редактировать"
            testId="edit-product-button"
            $width="100%"
            href={{ pathname: DASHBOARD_COMPANY_CREATE_PRODUCT, query: { companyId, productId } }}
          />
        </>
      );
    }

    return <RemoveProductButton id={productId} name={productName} />;
  };

  const catalogActions = () => {
    return (
      <>
        <Button variant="confirm" iconType="only" icon={<Icon name="info" $color="white" />} />
        {isUserBuyer && (
          <FavoriteButton
            favorite={favorite}
            productId={productId}
            isFavoriteModalShown={isFavoriteModalShown}
            refetchProducts={refetchProducts}
          />
        )}
        <Button
          label="Купить"
          testId="buy-product-button"
          $width={view === 'row' ? '8rem ' : '100%'}
          href={{ pathname: PRODUCT, query: { productId } }}
        />
      </>
    );
  };

  if (variant === 'company') {
    return (
      <CompanyButtonsWrapper data-testid="product-actions-wrapper" view={view}>
        {companyActions()}
      </CompanyButtonsWrapper>
    );
  }
  if (variant === 'catalog') {
    return (
      <CatalogButtonsWrapper view={view} data-testid="product-actions-wrapper">
        {catalogActions()}
      </CatalogButtonsWrapper>
    );
  }
  return <></>;
};

export default ActionButtons;
