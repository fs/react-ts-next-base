import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { ProductDraftStepEnum, PointServiceEnum } from 'graphql/types';
import { INVALID_COMMENT_LENGTH, REQUIRED_FIELD } from 'config/constants/errorsText';

import { useDeliveryPoints } from 'lib/apollo/hooks/state/deliveryPoints';
import { useDellinFreightTypes } from 'lib/apollo/hooks/state/dellinFreightTypes';
import { useSubmitProductDeliveryConditionStep } from 'lib/apollo/hooks/actions/product';
import useNotifier from 'hooks/useNotifier';

import {
  shipmentMethods,
  courierServices,
  deliveryServices,
  deliveryServicesLabel,
} from 'config/constants/createProductDelivery';

import CreateProductDeliveryForm from './CreateProductDeliveryForm';

import { Title } from '../_shared/styled';

const CreateProductDelivery = ({ product, onSubmitStep, readOnly = false }) => {
  const [deliveryPointsList, setDeliveryPointsList] = useState({
    [PointServiceEnum.Sdek]: [],
    [PointServiceEnum.Dellin]: [],
  });

  const {
    variants: productVariants,
    id: productId,
    companyLocation,
    deliveryCondition: initialDeliveryCondition,
    dellinCourierAllowed: initialDellinCourierAllowed,
    sdekCourierAllowed: initialSdekCourierAllowed,
    shipmentMethod: initialShipmentMethod,
    dellinDeliveryPointId: initialDellinDeliveryPointId,
    sdekDeliveryPointId: initialSdekDeliveryPointId,
    dellinFreightTypeId: initialDellinFreightTypeId,
    draftStep,
  } = product;

  const [submitProductDeliveryConditionsStep] = useSubmitProductDeliveryConditionStep();

  const { deliveryPoints: deliveryPointsDellin, loading: loadingDellin } = useDeliveryPoints({
    service: PointServiceEnum.Dellin,
    cityId: companyLocation.city.id,
  });
  const { deliveryPoints: deliveryPointsSdek, loading: loadingSdek } = useDeliveryPoints({
    service: PointServiceEnum.Sdek,
    cityId: companyLocation.city.id,
  });
  const { dellinFreightTypes } = useDellinFreightTypes({
    active: true,
  });
  const { setError } = useNotifier();

  const dellinFreightTypesOptions = dellinFreightTypes.map(option => ({
    value: option.id,
    label: option.name,
  }));

  const initialDeliveryPoints = {
    [deliveryServices.SDEK]: initialSdekDeliveryPointId,
    [deliveryServices.DELLIN]: initialDellinDeliveryPointId,
  };

  const [diferentDeliveryCondition, setDiferentDeliveryCondition] = useState(
    !initialDeliveryCondition,
  );

  const dellinFreightTypeValidationSchema = Yup.string()
    .when(
      ['courierService', 'shipmentMethod', 'dellinDeliveryPoint'],
      (courierService, shipmentMethod, dellinDeliveryPoint, schema) => {
        const isRequiredField =
          (shipmentMethod === shipmentMethods.COURIER &&
            courierService !== courierServices.NO_DELLIN) ||
          (shipmentMethod === shipmentMethods.DELIVERY_POINT &&
            !!dellinDeliveryPoint?.deliveryPoint);

        return isRequiredField ? schema.required(REQUIRED_FIELD) : schema;
      },
    )
    .nullable();

  // validation schema for deliveryCondition fields
  const deliveryConditionValidationSchema = {
    comment: Yup.string()
      .max(300, ({ value }) => INVALID_COMMENT_LENGTH(300, value.length))
      .nullable(),
    packaging: Yup.array(),
  };

  const productVariantsValidationSchema = Yup.array().of(
    Yup.object().shape(deliveryConditionValidationSchema),
  );

  const onSubmit = async (values, { setSubmitting }) => {
    if (readOnly) {
      onSubmitStep(ProductDraftStepEnum.Delivery);
      return;
    }

    setSubmitting(true);

    const {
      deliveryConditionForVariant: deliveryConditionVariants,
      dellinFreightTypeId,
      variants,
      shipmentMethod,
      courierService,
      sdekDeliveryPoint,
      dellinDeliveryPoint,
      hazardClass,
      insuranceRequired,
      comment,
    } = values;

    const deliveryCondition = {
      hazardClass,
      insuranceRequired,
      comment,
    };

    const filteredVariants = variants.map(
      ({
        id,
        hazardClass: hazardClassValue,
        insuranceRequired: insuranceRequiredValue,
        comment: commentValue,
      }) => ({
        id,
        deliveryCondition: {
          hazardClass: hazardClassValue,
          insuranceRequired: insuranceRequiredValue,
          comment: commentValue,
        },
      }),
    );

    try {
      const productUpdated = await submitProductDeliveryConditionsStep({
        productId,
        shipmentMethod,
        sdekCourierAllowed:
          shipmentMethod === shipmentMethods.COURIER && courierService !== courierServices.NO_SDEK,
        dellinCourierAllowed:
          shipmentMethod === shipmentMethods.COURIER &&
          courierService !== courierServices.NO_DELLIN,
        sdekDeliveryPointId:
          shipmentMethod === shipmentMethods.DELIVERY_POINT
            ? sdekDeliveryPoint.deliveryPoint?.id || null
            : null,
        dellinDeliveryPointId:
          shipmentMethod === shipmentMethods.DELIVERY_POINT
            ? dellinDeliveryPoint.deliveryPoint?.id || null
            : null,
        dellinFreightTypeId,
        deliveryConditionForVariant: deliveryConditionVariants,
        deliveryCondition: diferentDeliveryCondition ? null : deliveryCondition,
        variants:
          diferentDeliveryCondition && shipmentMethod !== shipmentMethods.NONE
            ? filteredVariants
            : [],
      });

      if (productUpdated) onSubmitStep(ProductDraftStepEnum.Delivery);
    } catch (error) {
      setSubmitting(false);
      setError(error);
    }
  };

  // some of shared input models
  const radioDeliveryCondition = [
    { label: 'Одинаковые параметры для всех товаров', value: false },
    {
      label: (
        <>
          Настроить параметры упаковки для
          <br /> каждого варианта товара отдельно
        </>
      ),
      value: true,
    },
  ];

  const unavailableDeliveryPoint = Object.values(deliveryPointsList).every(
    points => !points.length,
  );
  const shipmentMethodsRadio = [
    { value: shipmentMethods.NONE, label: 'Нет необходимости в сторонней службе доставки' },
    { value: shipmentMethods.COURIER, label: 'Служба доставки заберет товар курьером' },
    {
      value: shipmentMethods.DELIVERY_POINT,
      label: (
        <>
          Я отвезу заказанный <br />
          товар в терминал
        </>
      ),
      disabled: unavailableDeliveryPoint,
      tooltip:
        unavailableDeliveryPoint &&
        'Вы не можете выбрать этот способ доставки, так как услуги доставки через терминал недоступны в вашем городе.',
    },
  ];

  const courierServicesRadio = [
    { value: courierServices.ANY_SERVICE, label: 'Сотрудничать с компаниями СДЭК и Деловые Линии' },
    { value: courierServices.NO_SDEK, label: 'Я не хочу сотрудничать с компанией СДЭК' },
    { value: courierServices.NO_DELLIN, label: 'Я не хочу сотрудничать с компанией Деловые Линии' },
  ];

  const deliveryConditionTypeFields = [
    {
      type: 'radio',
      name: 'deliveryConditionForVariant',
      options: radioDeliveryCondition,
      direction: 'row',
      onChange: setDiferentDeliveryCondition,
      validationSchema: Yup.boolean().required(REQUIRED_FIELD).nullable(),
    },
  ];

  const validationSchema = diferentDeliveryCondition
    ? Yup.object().shape({
        variants: productVariantsValidationSchema,
        dellinFreightTypeId: dellinFreightTypeValidationSchema,
      })
    : Yup.object().shape({
        ...deliveryConditionValidationSchema,
        dellinFreightTypeId: dellinFreightTypeValidationSchema,
      });

  const initialValues = {
    shipmentMethod: initialShipmentMethod || shipmentMethods.COURIER,
    courierService:
      (!initialSdekCourierAllowed && !initialDellinCourierAllowed) ||
      (initialSdekCourierAllowed && initialDellinCourierAllowed)
        ? courierServices.ANY_SERVICE
        : !initialSdekCourierAllowed
        ? courierServices.NO_SDEK
        : courierServices.NO_DELLIN,
    dellinDeliveryPoint: {
      service: deliveryServices.DELLIN,
      label: deliveryServicesLabel.DELLIN,
      deliveryPoint: null,
    },
    sdekDeliveryPoint: {
      service: deliveryServices.SDEK,
      label: deliveryServicesLabel.SDEK,
      deliveryPoint: null,
    },
    variants: productVariants.map(({ deliveryCondition, id }) => {
      const { comment, hazardClass, insuranceRequired } = deliveryCondition || {};
      return {
        id,
        comment: comment || '',
        hazardClass: hazardClass || null,
        insuranceRequired: insuranceRequired || false,
        packaging: [],
      };
    }),
    comment: initialDeliveryCondition?.comment || '',
    hazardClass: initialDeliveryCondition?.hazardClass || null,
    insuranceRequired: initialDeliveryCondition?.insuranceRequired || false,
    deliveryConditionForVariant: diferentDeliveryCondition,
    dellinFreightTypeId: initialDellinFreightTypeId || null,
    packaging: [],
  };

  useEffect(() => {
    if (!loadingDellin && !loadingSdek) {
      setDeliveryPointsList({
        [PointServiceEnum.Sdek]: deliveryPointsSdek,
        [PointServiceEnum.Dellin]: deliveryPointsDellin,
      });
    }
  }, [loadingDellin, loadingSdek]);

  return (
    <>
      <Title data-cy="create-product-delivery-condition-title">
        Шаг 4: Параметры для службы доставки
      </Title>
      <CreateProductDeliveryForm
        readOnly={readOnly}
        shipmentMethodsRadio={shipmentMethodsRadio}
        courierServicesRadio={courierServicesRadio}
        deliveryConditionTypeFields={deliveryConditionTypeFields}
        productVariants={productVariants}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        initialDeliveryPoints={initialDeliveryPoints}
        dellinFreightTypesOptions={dellinFreightTypesOptions}
        deliveryPointsList={deliveryPointsList}
        draftStep={draftStep}
      />
    </>
  );
};

export default CreateProductDelivery;
