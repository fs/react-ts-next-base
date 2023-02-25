import React from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import ProposalFormFields from 'components/shared/molecules/ProposalFormFields';

import { ProposalComment, InputTitle, ActionsWrapper } from './styled';
import { getProposalFields } from './fields';
import { TCreateDisputeProposalForm } from './types';

const CreateDisputeProposalForm: React.FunctionComponent<TCreateDisputeProposalForm> = ({
  onSubmit,
  onCloseDispute,
  order,
  dispute,
  variant,
}) => {
  const proposalFields = getProposalFields({
    dispute,
    variant,
    deliveryPrice: order.deliveryPrice,
  });
  const initialValues = {
    proposal: proposalFields.reduce((obj, item) => ({ ...obj, [item.name]: item.initialValue }), {
      productReturnAmount: 0,
      returnRequired: true,
    }),
  };

  const validationSchema = Yup.object().shape({
    proposal: Yup.object().shape(
      proposalFields.reduce((obj, item) => ({ ...obj, [item.name]: item.validationSchema }), {}),
    ),
  });

  return (
    <Formik
      unableReinitialize={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <ProposalFormFields order={order} variant={variant} />

          {variant !== 'admin' && (
            <ProposalComment>
              <InputTitle>Опишите причину отклонения решения:</InputTitle>
              <Input
                type="textarea"
                testId="proposal.comment"
                placeholder="Опишите причину отклонения решения"
                name="proposal.comment"
              />
            </ProposalComment>
          )}
          <ActionsWrapper>
            <Button label="Отменить" variant="hollow" onClick={onCloseDispute} />

            <Button
              type="submit"
              label="Отправить"
              disabled={isSubmitting}
              testId="create-dispute-proposal-submit-button"
              size="small"
              $ml={8}
            />
          </ActionsWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};

export default CreateDisputeProposalForm;
