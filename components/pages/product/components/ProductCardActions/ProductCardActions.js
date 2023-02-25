import React, { useMemo } from 'react';
import { useFormikContext } from 'formik';
import Link from 'next/link';

import useCurrentUser from 'hooks/useCurrentUser';

import { OrderCheckoutStatusEnum, SystemRoleEnum } from 'graphql/types';
import { BUYER, SELLER } from 'config/constants/directions';
import { NOT_VERIFIED, VERIFIED } from 'config/constants/status';
import { DASHBOARD, DASHBOARD_COMPANY_CREATE_PRODUCT } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Tooltip from 'components/shared/atoms/Tooltip';
import {
  RemoveProductButton,
  RestoreProductButton,
  UseTemplateButton,
} from 'components/shared/organisms/ProductCard/components/ActionButtons/Buttons';

import { ActionButtons, ButtonWrapper, Warning } from './styled';

const getTooltipProps = ({ hasDeliveryMethod }) => {
  if (!hasDeliveryMethod) {
    return {
      text: 'Не указана служба доставки',
      active: true,
    };
  }

  return { text: '', active: false };
};
const ProductCardActions = ({ product, remainingVariants }) => {
  const { isSubmitting, setFieldValue, values } = useFormikContext();

  const { user, isGuest, isRegisteredUser } = useCurrentUser();
  const { deliveryMethod, address } = values;
  const { id: productId, template, deleted, company, status: productStatus, name } = product || {};
  const isUserBuyer = user?.mainCompany?.direction === BUYER;
  const isUserSeller = user?.mainCompany?.direction === SELLER;
  const isProductVerified = productStatus === VERIFIED;

  const hasGuestOrders = user?.guestUserOrders?.length >= 1;
  const isDisabledSubmit =
    isSubmitting || hasGuestOrders || remainingVariants.length > 1 || !deliveryMethod || !address;

  const hasReservedGuestOrders =
    user?.guestUserOrders?.filter(
      ({ order }) => order.checkoutStatus === OrderCheckoutStatusEnum.Reserved,
    ).length > 0;

  const isSeller = isProductVerified && isUserSeller;
  const isProductOwner = isProductVerified && isUserBuyer && !!company?.myRole;
  const isBuyer = isProductVerified && isUserBuyer && !company?.myRole;
  const isNotVerifiedBuyer = isBuyer && user?.mainCompany?.status === NOT_VERIFIED;
  const tooltipProps = getTooltipProps({
    hasDeliveryMethod: !!deliveryMethod,
  });

  const actions = useMemo(() => {
    if (isNotVerifiedBuyer)
      return (
        <Warning data-testid="warning-user-not-verified-buyer">
          <Icon name="exclamation-square" $size={26} $color="orange" $mr={20} />
          Ваша основная компания находится на проверке, поэтому вы не можете купить товар.
        </Warning>
      );
    if (deleted) return <RestoreProductButton productId={productId} companyId={company?.id} />;
    if (template)
      return (
        <>
          <RemoveProductButton id={productId} name={name} isTemplate={template} />
          <Button
            variant="change"
            iconType="only"
            icon={<Icon name="pencil" $color="white" $size={18} />}
            testId="edit-product-button"
            $width="100%"
            href={{
              pathname: DASHBOARD_COMPANY_CREATE_PRODUCT,
              query: { companyId: company?.id, productId },
            }}
            $ml={16}
          />
          <UseTemplateButton productId={productId} companyId={company?.id} />
        </>
      );
    if (isSeller)
      return (
        <Warning data-testid="warning-user-seller">
          <Icon name="exclamation-square" $size={26} $color="orange" $mr={20} />
          <span>
            {isUserSeller && (
              <div>
                Вы смотрите товар в режиме “Продавец”.
                <br />
              </div>
            )}
            Перейдите в компанию “Покупатель” или &nbsp;
            <Link href={{ pathname: DASHBOARD, query: { direction: BUYER } }}>
              зарегистрируйте компанию
            </Link>
            &nbsp; “Покупатель” чтобы купить товар.
          </span>
        </Warning>
      );
    if (hasGuestOrders && user.systemRole === SystemRoleEnum.Guest) {
      return (
        <Warning data-testid="warning-guest-has-guest-orders">
          <Icon name="exclamation-square" $size={26} $color="orange" $mr={20} />В вашей корзине уже
          есть товар. Авторизуйтесь и создайте компанию, чтобы покупать неограниченное количество
          товаров.
        </Warning>
      );
    }
    if (hasReservedGuestOrders && isRegisteredUser && !isUserBuyer) {
      return (
        <Warning data-testid="warning-client-has-reserved-guest-orders">
          <Icon name="exclamation-square" $size={26} $color="orange" $mr={20} />
          <div>
            <Link href={{ pathname: DASHBOARD, query: { direction: BUYER } }}>
              Создайте компанию
            </Link>
            &nbsp; “Покупателя“, чтобы покупать больше товаров
          </div>
        </Warning>
      );
    }
    if (hasGuestOrders && isRegisteredUser && !isUserBuyer) {
      return (
        <Warning data-testid="warning-client-has-guest-orders">
          <Icon name="exclamation-square" $size={26} $color="orange" $mr={20} />
          <div>
            <Link href={{ pathname: DASHBOARD, query: { direction: BUYER } }}>
              Создайте компанию
            </Link>
            &nbsp; “Покупателя“, чтобы добавлять в корзину больше 1 товара и совершать покупки
          </div>
        </Warning>
      );
    }
    if (isProductOwner)
      return (
        <Warning data-testid="warning-product-owner">
          <Icon name="exclamation-square" $size={26} $color="orange" $mr={20} />
          Этот товар принадлежит вашей компании, поэтому вы не можете его купить.
        </Warning>
      );
    if ((isBuyer || isGuest) && !hasGuestOrders) {
      return (
        <>
          <ButtonWrapper>
            <Tooltip text={tooltipProps.text} active={tooltipProps.active}>
              <Button
                label="Купить сейчас"
                variant="change"
                type="submit"
                size="large"
                $width="100%"
                isLoading={isSubmitting}
                disabled={isDisabledSubmit}
                onClick={() => setFieldValue('buyNow', true)}
                testId="product-card-buy-now-submit-button"
              />
            </Tooltip>
          </ButtonWrapper>
          <ButtonWrapper>
            <Tooltip text={tooltipProps.text} active={tooltipProps.active}>
              <Button
                label="Добавить в корзину"
                type="submit"
                size="large"
                $width="100%"
                isLoading={isSubmitting}
                disabled={isDisabledSubmit}
                onClick={() => setFieldValue('buyNow', false)}
                testId="product-card-submit-button"
              />
            </Tooltip>
          </ButtonWrapper>
        </>
      );
    }
    return <></>;
  }, [product, user, remainingVariants, deliveryMethod, address, isSubmitting]);

  return <ActionButtons>{actions}</ActionButtons>;
};

export default ProductCardActions;
