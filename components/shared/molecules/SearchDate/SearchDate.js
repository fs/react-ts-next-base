import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import DatePickerInput from 'components/shared/molecules/DatePickerInput';

import { DateFilterForm, FieldWrapper } from './styled';

const SearchDate = ({ onSubmit, query }) => {
  const { startDate, endDate } = query;

  const initialValues = {
    startDate: startDate ? startDate.split('T')[0] : undefined,
    endDate: endDate ? endDate.split('T')[0] : undefined,
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ setFieldValue, values }) => (
        <FormikForm>
          <DateFilterForm>
            <FieldWrapper>
              <DatePickerInput
                name="startDate"
                placeholder="дд.мм.гг"
                currentDate={values.startDate}
                setFieldValue={setFieldValue}
                clearable
                minDate={1}
                maxDate={values.endDate ? new Date(values.endDate) : undefined}
              />
            </FieldWrapper>
            <FieldWrapper>
              <DatePickerInput
                name="endDate"
                placeholder="дд.мм.гг"
                currentDate={values.endDate}
                setFieldValue={setFieldValue}
                clearable
                minDate={values.startDate ? new Date(values.startDate) : 1}
              />
            </FieldWrapper>
            <Button
              type="submit"
              iconType="only"
              icon={<Icon name="search" $color="white" />}
              data-testid="date-filter-button"
            />
          </DateFilterForm>
        </FormikForm>
      )}
    </Formik>
  );
};

export default SearchDate;
