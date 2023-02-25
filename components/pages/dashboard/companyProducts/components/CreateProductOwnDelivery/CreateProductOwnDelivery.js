import React, { useState } from 'react';
import * as Yup from 'yup';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import uniqueId from 'lodash/uniqueId';
import omit from 'lodash/omit';

import { useSubmitProductDeliveryStep } from 'lib/apollo/hooks/actions/product';

import { REQUIRED_FIELD } from 'config/constants/errorsText';
import { ProductDraftStepEnum } from 'graphql/types';
import CreateProductOwnDeliveryForm from './CreateProductOwnDeliveryForm';

import {
  freeDeliveriesValidationSchema,
  paidDeliveriesValidationSchema,
  getFreeFields,
  getPaidFields,
} from './fields';

import { Title } from '../_shared/styled';

const FREE = 'free';
const PAID = 'paid';

const METHODS = {
  FREE: { name: FREE, deliveries: 'productFreeDeliveries' },
  PAID: { name: PAID, deliveries: 'productPaidDeliveries' },
};

const defaultFreeDeliveryFields = {
  cityId: '',
  minCost: '',
  minDays: '',
  maxDays: '',
};
const defaultPaidDeliveryFields = {
  cityId: '',
  price: '',
  minWeight: '',
  maxWeight: '',
  minDays: '',
  maxDays: '',
};

const radio = [
  { label: 'да', value: true },
  { label: 'нет', value: false },
];

const pickup = {
  label: 'Запретить самовывоз',
  description:
    'При выборе этого параметра вы не разрешаете покупателю забирать товар из вашего магазина самостоятельно',
  name: 'disablePickup',
};

const deliveryMethods = [
  {
    method: FREE,
    subtitle: 'Установить бесплатную доставку?',
    description: (
      <span>
        Доставка подразумевает, что вы самостоятельно доставите товар покупателю, а не отдадите в
        сторонние службы доставки <br />
        (Например: СДЭК, Деловые линии)
      </span>
    ),
  },
  {
    method: PAID,
    subtitle: 'Установить платную доставку?',
    description: (
      <span>
        Доставка подразумевает, что вы самостоятельно доставите товар в сторонние службы доставки{' '}
        <br />
        (Например: СДЭК, Деловые линии)
      </span>
    ),
  },
];

const CreateProductOwnDelivery = ({ product, onSubmitStep, readOnly = false }) => {
  const {
    id: productId,
    productFreeDeliveries: productFreeDeliveriesInitial,
    productPaidDeliveries: productPaidDeliveriesInitial,
    disablePickup: initialPickup,
    draftStep,
  } = product;

  const isCurrentStep = draftStep === ProductDraftStepEnum.DeliveryConditions;

  const [freeDeliveriesRadio, setFreeDeliveriesRadio] = useState(
    !!productFreeDeliveriesInitial.length || isCurrentStep,
  );
  const [paidDeliveriesRadio, setPaidDeliveriesRadio] = useState(
    !!productPaidDeliveriesInitial.length || isCurrentStep,
  );

  const initialCities = {
    free: productFreeDeliveriesInitial.map(({ city }) => ({ value: city.id, label: city.name })),
    paid: productPaidDeliveriesInitial.map(({ city }) => ({ value: city.id, label: city.name })),
  };

  const [submitProductDeliveryStep] = useSubmitProductDeliveryStep();

  const fieldsRadio = [
    {
      name: `${FREE}Radio`,
      initialValue: !!productFreeDeliveriesInitial.length || isCurrentStep,
      validationSchema: Yup.boolean().required(REQUIRED_FIELD).nullable(),
    },
    {
      name: `${PAID}Radio`,
      initialValue: !!productPaidDeliveriesInitial.length || isCurrentStep,
      validationSchema: Yup.boolean().required(REQUIRED_FIELD).nullable(),
    },
  ];

  const onSubmit = async (
    { productFreeDeliveries, productPaidDeliveries, freeRadio, paidRadio, disablePickup },
    { setSubmitting },
  ) => {
    if (readOnly) {
      onSubmitStep(ProductDraftStepEnum.Prices);
      return;
    }
    const [freeValues, paidValues] = [productFreeDeliveries, productPaidDeliveries].map(method =>
      method.map(city => omit(city, ['id'])),
    );

    const submitValues = {
      productId,
      disablePickup,
      productFreeDeliveries: freeRadio ? freeValues : [],
      productPaidDeliveries: paidRadio ? paidValues : [],
    };

    setSubmitting(true);

    const productUpdated = await submitProductDeliveryStep(submitValues);

    setSubmitting(false);
    if (productUpdated) onSubmitStep(ProductDraftStepEnum.Prices);
  };

  const onAddDeliveryCity = ({ method, push }) => {
    push(
      method === FREE
        ? { id: uniqueId(), ...defaultFreeDeliveryFields }
        : { id: uniqueId(), ...defaultPaidDeliveryFields },
    );
  };

  const onChangeRadio = (value, method) => {
    if (method === FREE) {
      setFreeDeliveriesRadio(value);
    } else if (method === PAID) setPaidDeliveriesRadio(value);
  };

  const freeDeliveriesInitialValues = productFreeDeliveriesInitial.map(delivery => {
    return getFreeFields(delivery).reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.initialValue }),
      {},
    );
  });

  const paidDeliveriesInitialValues = productPaidDeliveriesInitial.map(delivery => {
    return getPaidFields(delivery).reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.initialValue }),
      {},
    );
  });

  const formByName = mapKeys(fieldsRadio, 'name');
  const initialValues = {
    ...mapValues(formByName, 'initialValue'),
    productFreeDeliveries: freeDeliveriesInitialValues.length
      ? freeDeliveriesInitialValues
      : [{ id: uniqueId(), ...defaultFreeDeliveryFields }],
    productPaidDeliveries: paidDeliveriesInitialValues.length
      ? paidDeliveriesInitialValues
      : [{ id: uniqueId(), ...defaultPaidDeliveryFields }],
    disablePickup: initialPickup || false,
  };
  const validationSchema = Yup.object().shape({
    ...mapValues(formByName, 'validationSchema'),
    productFreeDeliveries: freeDeliveriesRadio ? freeDeliveriesValidationSchema : undefined,
    productPaidDeliveries: paidDeliveriesRadio ? paidDeliveriesValidationSchema : undefined,
  });

  return (
    <>
      <Title data-cy="create-product-delivery-title">Шаг 5: Своя доставка</Title>
      <CreateProductOwnDeliveryForm
        readOnly={readOnly}
        pickup={pickup}
        deliveryMethods={deliveryMethods}
        radio={radio}
        onSubmit={onSubmit}
        onAddDeliveryCity={onAddDeliveryCity}
        methods={METHODS}
        initialValues={initialValues}
        validationSchema={validationSchema}
        initialCities={initialCities}
        onChangeRadio={onChangeRadio}
        draftStep={draftStep}
      />
    </>
  );
};

export default CreateProductOwnDelivery;
