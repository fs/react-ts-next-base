import React from 'react';
import { Formik, FieldArray, Form as FormikForm } from 'formik';

import Button from 'components/shared/atoms/Button';
import Radio from 'components/shared/atoms/Radio';

import { ProductDraftStepEnum } from 'graphql/types';
import PricesTable from '../PricesTable';
import ConfirmationRecords from '../ConfirmationRecords';

import { FormWrapper } from '../_shared/styled';
import { Subtitle, ActionsWrapper } from './styled';

const CreateProductPricesForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  radio,
  tables,
  variants,
  draftStep,
  readOnly = false,
}) => {
  const disableNextButton = draftStep === ProductDraftStepEnum.Prices && readOnly;
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, values }) => (
        <FormikForm>
          <FormWrapper>
            <div>
              <FieldArray name="variants">
                {() => (
                  <>
                    {tables.map((table, i) => {
                      return (
                        <PricesTable
                          readOnly={readOnly}
                          table={table}
                          variants={variants}
                          key={i}
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      );
                    })}
                  </>
                )}
              </FieldArray>
              <Subtitle>Ставка НДС</Subtitle>
              <Radio
                readOnly={readOnly}
                options={radio}
                name="vat"
                direction="row"
                setFieldValue={setFieldValue}
                selected={values.vat}
              />
              <ConfirmationRecords
                readOnly={readOnly}
                setFieldValue={setFieldValue}
                productConfirmationRecords={values.productConfirmationRecords}
              />
            </div>

            <ActionsWrapper>
              <Button
                label="Далее"
                type="submit"
                size="large"
                $width="14rem"
                testId="create-product-prices-submit-button"
                disabled={isSubmitting || disableNextButton}
                isLoading={isSubmitting}
              />
            </ActionsWrapper>
          </FormWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};

export default CreateProductPricesForm;
