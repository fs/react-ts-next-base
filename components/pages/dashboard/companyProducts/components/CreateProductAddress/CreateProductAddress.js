import React, { useState } from 'react';
import * as Yup from 'yup';

import { ProductDraftStepEnum } from 'graphql/types';
import { useCompanyLocations } from 'lib/apollo/hooks/state/companyLocations';
import { usePackingMaterials } from 'lib/apollo/hooks/state/packingMaterials';
import { useSubmitProductAddressStep } from 'lib/apollo/hooks/actions/product';
import { useCreateCompanyLocations } from 'lib/apollo/hooks/actions/companyLocation';

import { VERIFIED } from 'config/constants/status';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

import CreateProductAddressForm from './CreateProductAddressForm';

import { Title } from '../_shared/styled';

const CreateProductAddress = ({ companyId, product, onSubmitStep, readOnly = false }) => {
  const { id: productId, companyLocation, variants: productVariants, draftStep } = product;
  const selectedLocationValue = companyLocation
    ? { value: companyLocation.id, label: companyLocation.address }
    : '';
  const [selectedAddress, setSelectedAddress] = useState(selectedLocationValue);

  const { locations, refetch: refetchLocations } = useCompanyLocations({
    companyId,
    statuses: [VERIFIED],
  });
  const { packingMaterials } = usePackingMaterials({});

  const [createCompanyLocations] = useCreateCompanyLocations({
    companyId,
    onSubmit: refetchLocations,
  });
  const [submitProductAddressStep] = useSubmitProductAddressStep();

  const locationOptions = locations.map(({ id, address }) => ({ value: id, label: address }));

  const address = {
    title: 'Выберите адрес',
    type: 'select',
    name: 'address',
    options: locationOptions,
    initialValue: companyLocation ? companyLocation.id : '',
    placeholder: 'Выберите адрес',
    onChange: val => setSelectedAddress(val),
    width: '100%',
    validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
  };

  const getFields = (variant = {}) => {
    const { id, length, width, height, netWeight, grossWeight, packingMaterial } = variant;

    return [
      {
        type: 'hidden',
        name: 'id',
        initialValue: id || '',
        value: id,
        width: '0%',
      },
      {
        type: 'number',
        name: 'length',
        title: 'Длина, см',
        placeholder: 'Длина, см',
        initialValue: length || '',
        value: length,
        decimalScale: 1,
        suffix: ' см.',
        width: '32%',
        validationSchema: Yup.number()
          .moreThan(0, 'Укажите больше 0')
          .required(REQUIRED_FIELD)
          .nullable(),
      },
      {
        type: 'number',
        name: 'width',
        title: 'Ширина, см',
        placeholder: 'Ширина, см',
        initialValue: width || '',
        decimalScale: 1,
        suffix: ' см.',
        width: '32%',
        validationSchema: Yup.number()
          .moreThan(0, 'Укажите больше 0')
          .required(REQUIRED_FIELD)
          .nullable(),
      },
      {
        type: 'number',
        name: 'height',
        title: 'Высота, см',
        placeholder: 'Высота, см',
        initialValue: height || '',
        decimalScale: 1,
        suffix: ' см.',
        width: '32%',
        validationSchema: Yup.number()
          .moreThan(0, 'Укажите больше 0')
          .required(REQUIRED_FIELD)
          .nullable(),
      },
      {
        type: 'number',
        name: 'netWeight',
        title: 'Вес нетто, г',
        placeholder: 'Вес нетто, г',
        initialValue: netWeight || '',
        suffix: ' г.',
        width: '32%',
        validationSchema: Yup.number()
          .moreThan(0, 'Укажите больше 0')
          .required(REQUIRED_FIELD)
          .nullable(),
      },
      {
        type: 'number',
        name: 'grossWeight',
        title: 'Вес брутто, г',
        placeholder: 'Вес брутто, г',
        initialValue: grossWeight || '',
        suffix: ' г.',
        width: '32%',
        validationSchema: Yup.number()
          .moreThan(0, 'Укажите больше 0')
          .required(REQUIRED_FIELD)
          .nullable(),
      },
      {
        type: 'select',
        name: 'packingMaterialId',
        title: 'Материал упаковки',
        placeholder: 'Материал упаковки',
        initialValue: packingMaterial ? packingMaterial.id : '',
        width: '32%',
        options: packingMaterials,
        validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
      },
    ];
  };
  const fields = getFields();

  const productVariantsInitialValues = productVariants.map(variant => {
    return getFields(variant).reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.initialValue }),
      {},
    );
  });

  const productValidationSchema = Yup.array().of(
    Yup.object().shape({
      ...fields.reduce(
        (obj, item) => Object.assign(obj, { [item.name]: item.validationSchema }),
        {},
      ),
    }),
  );

  const initialValues = {
    variants: productVariantsInitialValues,
    address: address.initialValue,
  };

  const validationSchema = Yup.object().shape({
    variants: productValidationSchema,
    address: address.validationSchema,
  });

  const onSubmit = async (values, { setSubmitting }) => {
    if (readOnly) {
      onSubmitStep(ProductDraftStepEnum.DeliveryConditions);
      return;
    }

    const { variants, address: companyLocationId } = values;
    setSubmitting(true);

    try {
      const productUpdated = await submitProductAddressStep({
        productId,
        companyLocationId,
        variants,
      });

      if (productUpdated) onSubmitStep(ProductDraftStepEnum.DeliveryConditions);
    } catch {
      setSubmitting(false);
    }
  };

  const onAddNewAddress = async ({
    cityId,
    address: licenseAddress,
    postcode,
    phoneNumber,
    comment,
  }) => {
    const result = await createCompanyLocations({
      companyLocations: [
        {
          cityId,
          address: licenseAddress,
          postcode,
          phoneNumber,
          comment,
          companyLicenses: [],
        },
      ],
    });

    if (result) {
      const { id, address: label } = result;
      setSelectedAddress({ id, label });
    }
  };

  return (
    <>
      <Title data-cy="create-product-address-title">Шаг 3: Адрес и параметры упаковки</Title>

      <CreateProductAddressForm
        readOnly={readOnly}
        onSubmit={onSubmit}
        onAddNewAddress={onAddNewAddress}
        address={address}
        productVariants={productVariants}
        initialValues={initialValues}
        validationSchema={validationSchema}
        fields={fields}
        selectedAddress={selectedAddress}
        draftStep={draftStep}
      />
    </>
  );
};

export default CreateProductAddress;
