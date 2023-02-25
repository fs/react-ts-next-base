import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import debounce from 'lodash/debounce';
import { useModal } from '@ebay/nice-modal-react';
import { Formik, Form as FormikForm } from 'formik';

import { useCities } from 'lib/apollo/hooks/state/cities';

import Button from 'components/shared/atoms/Button';
import Input from 'components/shared/atoms/Input/Input';
import RejectComment from 'components/shared/atoms/RejectComment';
import AsyncSelect from 'components/shared/atoms/Selects/AsyncSelect';
import Map from 'components/shared/molecules/Map';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { postcodeRegularExp, phoneRegularExp } from 'config/constants/regularExpressions';
import { INVALID_FORMAT, REQUIRED_FIELD } from 'config/constants/errorsText';

import { phoneFormatter } from 'helpers';
import { REJECTED } from 'config/constants/status';
import LicensesList from './LicensesList';

import {
  Wrapper,
  Title,
  Row,
  Col,
  FormActions,
  MapWrapper,
  ErrorWrapper,
  RejectionReasonWrapper,
} from './styled';

const MapLocationModal = ({
  setIsShowMapModal,
  onAddAddress,
  location,
  customTitle,
  licenseTitle,
  withLicensesInfo = false,
}) => {
  const { city: initialCity, rejectionReason, status: locationStatus } = location || {};
  const [address, setAddress] = useState(location?.address ? { formatted: location?.address } : '');
  const [selectedCity, setSelectedCity] = useState(
    initialCity ? { value: initialCity?.id, label: initialCity?.name } : undefined,
  );

  const isRejected = locationStatus === REJECTED;

  const fetchCities = useCities();
  const onEditAddressModal = useModal(SimpleModal);

  const onChangeLocationCity = (option, setFieldValue) => {
    const { value, label } = option || {};
    setFieldValue('address', '');
    setAddress('');
    setSelectedCity(value ? { value, label } : '');
  };

  const handleAddress = debounce(value => setAddress({ formatted: value }), 300);
  const onChangeAddress = value => handleAddress(value);

  const onSubmit = async (values, { setSubmitting }) => {
    const {
      cityId,
      address: addressValue,
      postcode,
      phoneNumber,
      comment,
      companyLicenses,
    } = values;
    const submitValues = {
      cityId,
      address: addressValue,
      postcode,
      phoneNumber: phoneNumber || null,
      comment,
      companyLicenses: companyLicenses
        ? companyLicenses.map(({ initial, id, number, companyLicensePhotos, destroy }) => {
            const licensePhotos = companyLicensePhotos.map(({ image }) =>
              image.url ? { imageRemoteUrl: image.url } : { image },
            );
            return initial
              ? {
                  id,
                  number,
                  companyLicensePhotos: licensePhotos,
                  destroy: !!destroy,
                }
              : { number, companyLicensePhotos: licensePhotos };
          })
        : [],
      companyLocationId: location?.id,
    };

    setSubmitting(true);

    if (onAddAddress) await onAddAddress(submitValues);

    setSubmitting(false);
    setIsShowMapModal(false);
  };

  const onCancel = () => {
    setIsShowMapModal(false);
  };

  const addressField = [
    {
      type: 'select',
      name: 'cityId',
      selectedValue: selectedCity,
      onChange: onChangeLocationCity,
      initialValue: initialCity ? initialCity?.id : undefined,
      title: 'Город',
      placeholder: 'Город',
      fetchFn: fetchCities,
      width: '35%',
    },
    {
      type: 'text',
      name: 'address',
      title: 'Впишите адрес',
      placeholder: 'Впишите адрес',
      width: '50%',
      onChange: onChangeAddress,
    },
    {
      type: 'text',
      name: 'postcode',
      title: 'Индекс',
      placeholder: 'Индекс',
      width: '6rem',
    },
  ];

  const initialValues = {
    cityId: initialCity ? initialCity.id : '',
    address: location?.address || '',
    phoneNumber: phoneFormatter(location?.phoneNumber) || '+7',
    postcode: location?.postcode || '',
    comment: location?.comment || '',
  };

  const validationFields = {
    cityId: Yup.string().required(REQUIRED_FIELD).nullable(),
    address: Yup.string().required(REQUIRED_FIELD).nullable(),
    postcode: Yup.string()
      .required(REQUIRED_FIELD)
      .matches(postcodeRegularExp, INVALID_FORMAT)
      .nullable(),
    phoneNumber: Yup.string()
      .required(REQUIRED_FIELD)
      .matches(phoneRegularExp, INVALID_FORMAT)
      .nullable(),
    comment: Yup.string().nullable(),
  };

  if (withLicensesInfo) {
    initialValues.companyLicenses = location?.companyLicenses?.length
      ? location?.companyLicenses.map(({ companyLicensePhotos, number, id: licenseId }) => ({
          companyLicensePhotos: companyLicensePhotos.map(({ id, imageUrl }) => ({
            image: { id, url: imageUrl },
          })),
          number,
          id: licenseId,
          initial: true,
        }))
      : [];
  }

  const validationSchema = Yup.object().shape(validationFields);

  useEffect(() => {
    if (address) {
      const fetchData = async () => {
        const mapCityName = address?.Components?.find(({ kind }) => kind === 'locality')?.name;
        if (mapCityName) {
          const { nodes } = await fetchCities({ name: mapCityName });
          if (nodes?.length) {
            const city = nodes.find(({ name }) => name === mapCityName);
            setSelectedCity(city ? { value: city.id, label: city.name } : '');
          } else {
            setSelectedCity('');
          }
        }
      };
      fetchData();
    }
  }, [address]);

  const onSubmitEdit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    await onEditAddressModal.show({
      onSubmit: async () => {
        await onSubmit(values, { setSubmitting });
      },
      title: 'Редактирование адреса',
      description:
        'Нажимая “Подтвердить”, вы отправляете отредактированный адрес на повторную проверку. ',
    });
  };

  return (
    <Wrapper>
      <Title data-testid="company-location-modal-title" data-cy="company-location-modal-title">
        {customTitle || 'Выберите адрес'}
      </Title>

      {rejectionReason && (
        <RejectionReasonWrapper>
          <RejectComment comment={rejectionReason} />
        </RejectionReasonWrapper>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={isRejected ? onSubmitEdit : onSubmit}
      >
        {({ isSubmitting, status, values, setFieldValue }) => (
          <FormikForm>
            <Row>
              {addressField.map((field, index) => {
                const { type, name, onChange, placeholder, fetchFn, width, title } = field;
                return (
                  <Col width={width} key={index}>
                    {type === 'select' ? (
                      <AsyncSelect
                        name={name}
                        testId={`company-location-${name}`}
                        onChange={event => onChange(event, setFieldValue)}
                        initialValue={
                          initialCity
                            ? { value: initialCity?.id, label: initialCity?.name }
                            : undefined
                        }
                        title={title}
                        placeholder={placeholder}
                        fetchFn={fetchFn}
                      />
                    ) : (
                      <Input
                        type={type}
                        name={name}
                        title={title}
                        placeholder={placeholder}
                        testId={`company-location-${name}`}
                        onChange={({ target: { value } }) => {
                          if (onChange) onChange(value);
                          setFieldValue(name, value);
                        }}
                      />
                    )}
                  </Col>
                );
              })}
            </Row>

            <MapWrapper>
              <Map
                city={selectedCity?.label}
                address={address?.formatted ? address.formatted : selectedCity?.label || ''}
                postcode={location?.postcode || ''}
                setFieldValue={setFieldValue}
                setAddress={setAddress}
              />
            </MapWrapper>

            <Row>
              <Col>
                <Input
                  type="text"
                  name="phoneNumber"
                  title="Впишите номер для связи"
                  placeholder="Впишите номер для связи"
                  testId="company-location-phoneNumber"
                />
              </Col>
            </Row>
            <Row>
              <Input
                type="textarea"
                as="textarea"
                name="comment"
                title="Комментарий к адресу, чтобы вас было проще найти службе доставки"
                placeholder="Комментарий к адресу, чтобы вас было проще найти службе доставки"
                testId="company-location-comment"
              />
            </Row>

            {withLicensesInfo && (
              <LicensesList values={values} title={licenseTitle} setFieldValue={setFieldValue} />
            )}

            <FormActions>
              <Button
                label="Отменить"
                variant="hollow"
                onClick={onCancel}
                testId="company-location-close-button"
              />
              {isRejected ? (
                <Button
                  label="Отправить на проверку"
                  testId="company-location-submit-button"
                  disabled={isSubmitting}
                  type="submit"
                  $ml={8}
                />
              ) : (
                <Button
                  label="Подтвердить"
                  variant="confirm"
                  type="submit"
                  testId="company-location-submit-button"
                  disabled={isSubmitting}
                  $ml={8}
                />
              )}
            </FormActions>

            {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
          </FormikForm>
        )}
      </Formik>
    </Wrapper>
  );
};

export default MapLocationModal;
