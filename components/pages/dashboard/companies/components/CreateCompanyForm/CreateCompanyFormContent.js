import React, { useEffect } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import Checkbox from 'components/shared/atoms/Checkbox';
import SelectField from 'components/shared/atoms/Selects/SelectField';

import { CompanyDirectionEnum } from 'graphql/types';

import { useDadataOrganization } from 'lib/apollo/hooks/state/dadataOrganization';
import { innRegularExp } from 'config/constants/regularExpressions';
import Banner from '../Banner';
import LogoUpload from '../LogoUpload';
import AcceptFiles from '../AcceptFiles';

import {
  Wrapper,
  FormContainer,
  InputsContainer,
  InputContainer,
  ErrorWrapper,
  FormActions,
  CheckboxesWrapper,
  LinksWrapper,
  LogoUploadWrapper,
  Warning,
  ActionsWrapper,
} from './styled';
import { initFieldValues } from './constants';

const SOLE_PROPRIETOR = 'sole_proprietor';

const CreateCompanyFormContent = ({
  fields,
  checkboxes,
  onSubmit,
  isAgreementAccepted,
  isContractAccepted,
  logoField,
  companyConfirmationRecordsField,
  direction,
  legalForms,
}) => {
  const formByName = mapKeys([...fields, logoField, companyConfirmationRecordsField], 'name');
  const initialValues = mapValues(formByName, 'initialValue');
  const validationSchema = Yup.object().shape(mapValues(formByName, 'validationSchema'));
  const { orgInfo, loadDadataOrg } = useDadataOrganization();

  return (
    <Wrapper data-cy="create-company-form">
      <Banner direction={direction} />
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting, status, setFieldValue, values, handleChange, setValues }) => {
          useEffect(() => {
            if (!orgInfo) {
              return;
            }
            const legalForm = legalForms.find(
              legalFormElement =>
                legalFormElement.shortName?.toUpperCase() ===
                orgInfo.legalFormShortName?.toUpperCase(),
            );
            const {
              inn,
              name,
              shortName,
              directorFullName,
              address,
              postcode,
              kpp,
              ogrn,
              oktmo,
              email,
              phone,
            } = orgInfo;

            setValues({
              ...values,
              inn: inn || initFieldValues.inn,
              officialName: name || initFieldValues.officialName,
              unofficialName: shortName || initFieldValues.unofficialName,
              directorFullName: directorFullName || initFieldValues.directorFullName,
              legalAddress: address || initFieldValues.legalAddress,
              postcode: postcode || initFieldValues.postcode,
              kpp: kpp || initFieldValues.kpp,
              ogrn: ogrn || initFieldValues.ogrn,
              oktmo: oktmo || initFieldValues.oktmo,
              email: email || initFieldValues.email,
              phoneNumber: phone || initFieldValues.phoneNumber,
              legalFormId: legalForm.id || initFieldValues.legalFormId,
            });
          }, [orgInfo]);
          return (
            <FormikForm data-testid="create-company-formik-form">
              <FormContainer>
                <InputsContainer>
                  {fields.map((field, i) => {
                    const {
                      type,
                      name,
                      placeholder,
                      options,
                      title,
                      onClick,
                      onChange,
                      onBlur,
                      width,
                      disabled,
                    } = field;

                    const actions = Object.entries({ onClick, onBlur }).reduce(
                      (acc, [key, val]) => (val ? { ...acc, [key]: val } : { ...acc }),
                      {},
                    );

                    const onChangeHandler = ev => {
                      if (ev.target.name === 'inn' && innRegularExp.test(ev.target.value)) {
                        loadDadataOrg({ variables: { inn: ev.target.value } });
                      }

                      handleChange(ev);
                      onChange?.(ev.target.value, values, setFieldValue);
                    };

                    const onSelectChangeHandler = value => {
                      onChange?.(value, values, setFieldValue);
                    };

                    return (
                      <InputContainer key={i} width={width}>
                        {type === 'text' && (
                          <Input
                            onChange={onChangeHandler}
                            type={type}
                            name={name}
                            testId={name}
                            placeholder={placeholder}
                            title={title}
                            disabled={
                              disabled ||
                              (name === 'kpp' && values?.legalFormId === SOLE_PROPRIETOR)
                            }
                            {...actions}
                          />
                        )}

                        {type === 'select' && (
                          <SelectField
                            name={name}
                            options={options}
                            title={title}
                            placeholder={placeholder}
                            disabled={disabled}
                            onChange={onSelectChangeHandler}
                            $mb={20}
                          />
                        )}
                      </InputContainer>
                    );
                  })}
                </InputsContainer>

                <LogoUploadWrapper>
                  <LogoUpload setFieldValue={setFieldValue} values={values} />
                </LogoUploadWrapper>

                {direction === CompanyDirectionEnum.Seller && <AcceptFiles />}

                <Warning>
                  <Icon name="exclamation-square" $size={32} $mr={16} $color="orange" />
                  Чтобы начать{' '}
                  {direction === CompanyDirectionEnum.Seller
                    ? 'загружать свои товары'
                    : 'покупать товары'}{' '}
                  после того как ваша компания пройдет модерацию,
                  <br />
                  обязательно нужно заполнить все поля.
                </Warning>

                <FormActions>
                  <CheckboxesWrapper>
                    {checkboxes.map(({ name, label, onChange, checked }) => (
                      <Checkbox
                        key={name}
                        name={name}
                        label={label}
                        onChange={onChange}
                        checked={checked}
                      />
                    ))}
                    <LinksWrapper>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`${process.env.ASSET_HOST}/files/dellin-agreement.pdf`}
                      >
                        Договор между Medagregator и Деловые Линии
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`${process.env.ASSET_HOST}/files/sdek-agreement.pdf`}
                      >
                        Договор между Medagregator и СДЭК
                      </a>
                    </LinksWrapper>
                  </CheckboxesWrapper>
                </FormActions>

                <ActionsWrapper>
                  <Button
                    label="Добавить компанию"
                    type="submit"
                    testId="create-company-submit-button"
                    disabled={isSubmitting || !isAgreementAccepted || !isContractAccepted}
                  />
                </ActionsWrapper>
              </FormContainer>

              {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
            </FormikForm>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default CreateCompanyFormContent;
