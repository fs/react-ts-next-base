import React, { useState, useMemo } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import debounce from 'lodash/debounce';
import useRouter from 'hooks/useRouter';

import { useAuthenticateGuestUser } from 'lib/apollo/hooks/actions/authenticateGuestUser';
import { useAddProductToCart, useAddProductToGuestCart } from 'lib/apollo/hooks/actions/order';
import useNotifier from 'hooks/useNotifier';
import useCurrentUser from 'hooks/useCurrentUser';

import { CART } from 'config/routes';
import { BUYER } from 'config/constants/directions';
import { VERIFIED } from 'config/constants/status';
import { yandexMetrikaGoal } from 'helpers';
import { metrikaProductIds } from 'config/constants/metrikaProducts';

import ProductInfo from '../ProductInfo';
import ProductProperties from '../ProductProperties';
import ProductVariantInfo from '../ProductVariantInfo';
import ProductPrice from '../ProductPrice';
import ProductBuyerAddress from '../ProductBuyerAddress';
import ProductCardActions from '../ProductCardActions';

const ProductCardForm = ({ product, onSelectProperty }) => {
  const { id: productId, variants, wholesaleLot, company, status: productStatus } = product || {};

  const { pushRoute } = useRouter();
  const { user, isAdmin, isGuest, refetch } = useCurrentUser();
  const { mainCompany } = user || {};
  const [remainingVariants, setRemainingVariants] = useState(variants);
  const [deliveryMethodsQuery, setDeliveryMethodsQuery] = useState({});

  const isUserBuyer = user?.mainCompany?.direction === BUYER;
  const isProductVerified = productStatus === VERIFIED;

  const { setSuccess } = useNotifier();
  const [addProductToCart] = useAddProductToCart({ companyId: mainCompany?.id });
  const [addProductToGuestCart] = useAddProductToGuestCart({ onCompleted: refetch });

  const handleDeliveryMethodsQuery = debounce(value => {
    setDeliveryMethodsQuery(value);
  }, 300);
  const onChangeDeliveryMethodsQuery = value => {
    if (remainingVariants.length === 1) handleDeliveryMethodsQuery(value);
  };
  const [signInGuest] = useAuthenticateGuestUser();

  const onSubmit = async (
    {
      quantity,
      address,
      pickupDate = null,
      deliveryMethod,
      deliveryPoint,
      deliveryService,
      buyNow,
    },
    { setSubmitting },
  ) => {
    buyNow
      ? yandexMetrikaGoal(metrikaProductIds?.[productId]?.buyNow)
      : yandexMetrikaGoal(metrikaProductIds?.[productId]?.addToCard);

    if (!user) {
      await signInGuest();
    }
    const callAddProductToGuestCart = async () => {
      const addProductToGuestCartValues = {
        variantId: remainingVariants[0]?.id,
        quantity,
        deliveryMethod,
        deliveryService: deliveryService?.service || null,
        cityId: address?.id || null,
        deliveryPointId: deliveryPoint?.id || null,
        pickupDate,
      };

      const order = await addProductToGuestCart(addProductToGuestCartValues);
      return order;
    };

    const callAddProductToCart = async () => {
      const addProductToCartValues = {
        variantId: remainingVariants[0]?.id,
        quantity,
        deliveryMethod,
        deliveryService: deliveryService?.service || null,
        companyLocationId: address?.id || null,
        deliveryPointId: deliveryPoint?.id || null,
        pickupDate,
      };

      const order = await addProductToCart(addProductToCartValues);
      return order;
    };

    const order = isGuest ? await callAddProductToGuestCart() : await callAddProductToCart();

    setSubmitting(false);

    if (order) {
      if (buyNow) {
        const queryParams = isGuest ? {} : { sellerId: order.seller.id };
        pushRoute({ pathname: CART, query: queryParams });
      } else {
        setSuccess(`Товар “${order.product.name}” добавлен в корзину`);
      }
    }
  };

  const initialValues = {
    quantity: remainingVariants[0]?.minShipmentLot || 1,
    deliveryMethod: null,
    deliveryPoint: null,
    pickupDate: null,
    deliveryService: null,
    address: null,
  };

  const isOutOfStock = useMemo(
    () =>
      variants.every(
        ({ stock, soldQuantity, minShipmentLot }) => stock - soldQuantity < minShipmentLot,
      ),
    [variants],
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, values }) => {
        return (
          <FormikForm>
            <ProductInfo product={product} isUserBuyer={isUserBuyer} />

            <ProductProperties
              variants={variants}
              onSelectProperty={onSelectProperty}
              remainingVariants={remainingVariants}
              setRemainingVariants={setRemainingVariants}
              setFieldValue={setFieldValue}
            />

            <ProductVariantInfo remainingVariants={remainingVariants} />

            {!isOutOfStock && (
              <ProductPrice
                remainingVariants={remainingVariants}
                wholesaleLot={wholesaleLot}
                values={values}
                isSubmitting={isSubmitting}
                onChangeDeliveryMethodsQuery={onChangeDeliveryMethodsQuery}
              />
            )}

            {isProductVerified && !isAdmin && !company?.myRole && !isOutOfStock && (
              <ProductBuyerAddress
                product={product}
                remainingVariants={remainingVariants}
                user={user}
                setFieldValue={setFieldValue}
                values={values}
                onChangeDeliveryMethodsQuery={onChangeDeliveryMethodsQuery}
                deliveryMethodsQuery={deliveryMethodsQuery}
              />
            )}

            {!isAdmin && (
              <ProductCardActions product={product} remainingVariants={remainingVariants} />
            )}
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default ProductCardForm;
