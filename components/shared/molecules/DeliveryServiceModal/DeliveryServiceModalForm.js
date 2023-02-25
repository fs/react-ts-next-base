import React, { useMemo } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import useCurrentUser from 'hooks/useCurrentUser';

import { useUserDeliveryMethods } from 'lib/apollo/hooks/state/deliveryMethods';

import Button from 'components/shared/atoms/Button';
import Radio from 'components/shared/atoms/Radio';
import Loader from 'components/shared/atoms/Loader';

import { deliveryMethods as deliveryMethodsName } from 'config/constants/delivery';
import SelectCourier from './components/SelectCourier';
import SelectDeliveryPoint from './components/SelectDeliveryPoint';
import SelectSelfPickup from './components/SelectSelfPickup';

import {
  FormWrapper,
  Title,
  RadioDeliveryMethodsWrapper,
  ActionsWrapper,
  Description,
} from './styled';
import SelectUnavailable from './components/SelectUnavailable';

const DeliveryServiceModalForm = ({
  form,
  deliveryValues,
  variantId,
  deliveryMethodsRadio,
  product,
}) => {
  const { user, isGuest } = useCurrentUser();

  const { companyLocation, productFreeDeliveries, productPaidDeliveries } = product;
  const { initialValues, validationSchema, onSubmit } = form;
  const { quantity, address } = deliveryValues;

  const companyName = `${user?.mainCompany?.legalForm?.shortName || ''} "${
    user?.mainCompany?.officialName || ''
  }"`;

  const deliveryField = isGuest ? 'cityId' : 'companyLocationId';
  const deliveryMethodsQuery = {
    variantId,
    quantity,
    [deliveryField]: address?.id,
  };

  const { userDeliveryMethods, loadingUserDeliveryMethods } = useUserDeliveryMethods({
    deliveryMethodsQuery,
    isGuestUser: isGuest,
  });

  const clearFields = setFieldValue => {
    setFieldValue('service', null);
    setFieldValue('deliveryPoint', null);
    setFieldValue('pickupDate', undefined);
  };

  const deliveryRadio = useMemo(() => {
    return deliveryMethodsRadio.map(radio => {
      const disabled = Array.isArray(userDeliveryMethods[radio.type])
        ? userDeliveryMethods[radio.type].every(({ available }) => !available)
        : !userDeliveryMethods[radio.type]?.available;
      return { ...radio, disabled, tooltip: disabled ? radio.tooltip : null };
    });
  }, [userDeliveryMethods]);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, values, setFieldValue }) => (
        <FormikForm>
          <FormWrapper>
            {loadingUserDeliveryMethods ? (
              <div>
                <Loader />
              </div>
            ) : (
              <div>
                <Title>Выберите способ доставки</Title>
                <RadioDeliveryMethodsWrapper>
                  <Radio
                    options={deliveryRadio}
                    name="deliveryMethod"
                    direction="row"
                    setFieldValue={setFieldValue}
                    onChange={() => clearFields(setFieldValue)}
                    selected={values.deliveryMethod}
                  />
                </RadioDeliveryMethodsWrapper>

                {values.deliveryMethod === deliveryMethodsName.COURIER && (
                  <SelectCourier
                    location={address}
                    values={values}
                    setFieldValue={setFieldValue}
                    courierList={userDeliveryMethods.courier}
                  />
                )}
                {values.deliveryMethod === deliveryMethodsName.DELIVERY_POINT && (
                  <SelectDeliveryPoint
                    values={values}
                    setFieldValue={setFieldValue}
                    servicesList={userDeliveryMethods.deliveryPoint}
                  />
                )}
                {values.deliveryMethod === deliveryMethodsName.PICKUP && (
                  <SelectSelfPickup
                    companyLocation={companyLocation}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                )}

                {values.deliveryMethod === deliveryMethodsName.UNAVAILABLE && (
                  <SelectUnavailable
                    productDeliveries={{ productFreeDeliveries, productPaidDeliveries }}
                  />
                )}
              </div>
            )}

            <ActionsWrapper>
              {user?.mainCompany && (
                <Description>
                  Напоминаем! Вы покупаете от компании {companyName}. Если это ошибка,
                  <br /> смените компанию в Личном кабинете или в боковом меню шапки сайта.
                </Description>
              )}
              {values.deliveryMethod !== deliveryMethodsName.UNAVAILABLE && (
                <Button
                  label="Подтвердить"
                  variant="confirm"
                  type="submit"
                  $ml="auto"
                  disabled={
                    isSubmitting ||
                    (values.deliveryMethod === deliveryMethodsName.PICKUP && !values.pickupDate) ||
                    (values.deliveryMethod === deliveryMethodsName.DELIVERY_POINT &&
                      !values.deliveryPoint)
                  }
                  isLoading={isSubmitting}
                  testId="change-delivery-service-submit-button"
                />
              )}
            </ActionsWrapper>
          </FormWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};

export default DeliveryServiceModalForm;
