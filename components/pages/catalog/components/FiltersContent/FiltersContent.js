import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Rating from 'components/shared/atoms/Rating';
import Tooltip from 'components/shared/atoms/Tooltip';
import Checkbox from 'components/shared/atoms/Checkbox';
import NumberInput from 'components/shared/atoms/NumberInput';
import SelectField from 'components/shared/atoms/Selects/SelectField';

import SubmitTooltip from '../SubmitTooltip';
import FilterSelectWrapper from '../FilterSelectWrapper';

import {
  ContentWrapper,
  InputTitle,
  RangeContainer,
  Title,
  CheckboxLabel,
  RangeInputContainer,
  QuestionWrapper,
  SeparatorWrapper,
  RateBlockWrapper,
  RateItemWrapper,
  RatingWrapper,
  InputWrapper,
} from './styled';

const FiltersContent = ({
  fields,
  lastChangedInput = '',
  setLastChangedInput,
  onSubmit,
  productsAmount = 0,
  isLoading,
  initialValues,
}) => {
  return (
    <ContentWrapper>
      <Formik enableReinitialize initialValues={initialValues}>
        {({ setFieldValue, values, setValues }) => {
          return (
            <FormikForm>
              {fields.map((item, fieldKeyIndex) => {
                const {
                  name,
                  title,
                  type,
                  label,
                  reference,
                  fields: blockFields,
                  options,
                  onChange: onChangeCurrentInput,
                  propertyId,
                  isSpecificFilter,
                  checked,
                  fieldIndex,
                  clearList = {},
                } = item;

                const labelWrapper = reference ? (
                  <CheckboxLabel>
                    {label}
                    <QuestionWrapper>
                      <Tooltip text={reference}>
                        <Icon name="question" $size={22} $color="greyA3" />
                      </Tooltip>
                    </QuestionWrapper>
                  </CheckboxLabel>
                ) : (
                  label
                );

                return (
                  <InputWrapper key={fieldKeyIndex}>
                    {type === 'select' ? (
                      <>
                        <InputTitle>{title}</InputTitle>
                        <SelectField
                          name={name}
                          placeholder=""
                          options={options}
                          onChange={newValue => {
                            const { value, label: itemLabel } = newValue ?? {
                              value: '',
                              label: '',
                            };
                            setLastChangedInput(name);
                            onChangeCurrentInput(
                              { ...values, [name]: value },
                              { value, label: itemLabel },
                            );
                            setValues({ ...values, [name]: value, ...clearList });
                          }}
                          disabled={options?.length === 0}
                        />
                      </>
                    ) : type === 'dictionary-select' ? (
                      <>
                        <InputTitle>{title}</InputTitle>
                        <FilterSelectWrapper
                          isMulti
                          name={name}
                          placeholder=""
                          propertyId={propertyId}
                          closeMenuOnSelect={false}
                          onChange={optionValues => {
                            const ids = optionValues.map(option => option.value);
                            setLastChangedInput(name);

                            if (ids.length) {
                              setFieldValue(`${name}.propertyId`, propertyId);
                              setFieldValue(`${name}.dictionaryPropertyOptionIds`, ids);
                            } else {
                              setFieldValue(name, null);
                            }

                            onChangeCurrentInput({
                              ...values,
                              dictionaryProperties:
                                values.dictionaryProperties?.map((property, index) =>
                                  index !== fieldIndex
                                    ? property
                                    : ids.length
                                    ? { propertyId, dictionaryPropertyOptionIds: ids }
                                    : null,
                                ) || [],
                            });
                          }}
                        />
                      </>
                    ) : type === 'range' ? (
                      <>
                        <Title>{title}:</Title>
                        <RangeContainer>
                          {blockFields.map(({ title: rangeFieldTitle, range }) => {
                            const rangeInputName = isSpecificFilter
                              ? `${name}.${range}`
                              : `${range}${name}`;
                            return (
                              <RangeInputContainer key={range}>
                                <InputTitle>{rangeFieldTitle}</InputTitle>
                                <NumberInput
                                  name={rangeInputName}
                                  $mb={8}
                                  testId={rangeInputName}
                                  onChange={value => {
                                    const newValue = Number(value) || null;
                                    setLastChangedInput(name);
                                    if (isSpecificFilter) {
                                      setFieldValue(`${name}.${range}`, newValue);
                                      setFieldValue(`${name}.propertyId`, propertyId);
                                      onChangeCurrentInput({
                                        ...values,
                                        integerProperties:
                                          values.integerProperties?.map((property, index) =>
                                            index !== fieldIndex
                                              ? property
                                              : { ...property, propertyId, [range]: newValue },
                                          ) || [],
                                      });
                                    } else {
                                      setFieldValue(rangeInputName, newValue);
                                      onChangeCurrentInput({
                                        ...values,
                                        [rangeInputName]: newValue,
                                      });
                                    }
                                  }}
                                />
                              </RangeInputContainer>
                            );
                          })}
                        </RangeContainer>
                      </>
                    ) : type === 'checkbox' ? (
                      <Checkbox
                        name={name}
                        label={labelWrapper}
                        checked={checked}
                        onChange={value => {
                          setLastChangedInput(name);
                          onChangeCurrentInput(value);
                        }}
                      />
                    ) : type === 'title' ? (
                      <SeparatorWrapper>{title}</SeparatorWrapper>
                    ) : type === 'rate' ? (
                      <RateBlockWrapper>
                        {blockFields.map((rate, rateIndex) => (
                          <RateItemWrapper key={rateIndex}>
                            <Title>{rate.title}</Title>
                            <RatingWrapper>
                              <Rating
                                rating={rate.initialValue || 0}
                                setRating={rating => {
                                  setLastChangedInput(name);
                                  rate.setRate(rating);
                                }}
                              />
                            </RatingWrapper>
                          </RateItemWrapper>
                        ))}
                      </RateBlockWrapper>
                    ) : type === 'text' ? (
                      <>
                        <InputTitle>{title}</InputTitle>
                        <Input
                          type="text"
                          name={`${name}.value`}
                          $mb={8}
                          onChange={({ target: { value } }) => {
                            setLastChangedInput(name);
                            setFieldValue(`${name}.propertyId`, propertyId);
                            setFieldValue(`${name}.value`, value);
                            onChangeCurrentInput({
                              ...values,
                              textProperties:
                                values.textProperties?.map((property, index) =>
                                  index !== fieldIndex
                                    ? property
                                    : value
                                    ? { ...property, propertyId, value }
                                    : null,
                                ) || [],
                            });
                          }}
                        />
                      </>
                    ) : (
                      ''
                    )}
                    {lastChangedInput === name && (
                      <SubmitTooltip
                        action={onSubmit}
                        itemsAmount={productsAmount}
                        isLoading={isLoading}
                      />
                    )}
                  </InputWrapper>
                );
              })}
            </FormikForm>
          );
        }}
      </Formik>
    </ContentWrapper>
  );
};

export default FiltersContent;
