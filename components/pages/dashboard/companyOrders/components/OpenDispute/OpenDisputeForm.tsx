import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Input from 'components/shared/atoms/Input';
import Radio from 'components/shared/atoms/Radio';
import Button from 'components/shared/atoms/Button';
import SelectField from 'components/shared/atoms/Selects/SelectField';
import ProposalFormFields from 'components/shared/molecules/ProposalFormFields';

import { disputeReasonsNotDelivered, disputeReasonsDelivered } from 'config/constants/dispute';
import { radioDelivered } from './constants';

import UploadFilesDispute from '../UploadFilesDispute';

import {
  RadioWrapper,
  RadioLabel,
  Subtitle,
  InputTitle,
  ReasonFieldWrapper,
  CommentFieldWrapper,
  ActionsWrapper,
} from './styled';
import { TOpenDisputeForm } from './types';

const OpenDisputeForm: React.FC<TOpenDisputeForm> = ({ form, order, showCloseDispute }) => {
  const { onSubmit, initialValues, validationSchema } = form;

  return (
    <Formik
      unableReinitialize={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <FormikForm>
          <RadioWrapper>
            <RadioLabel>Товар доставлен?</RadioLabel>
            <Radio
              options={radioDelivered}
              name="dispute.productDelivered"
              direction="row"
              setFieldValue={setFieldValue}
              onChange={() => setFieldValue('dispute.reason', null)}
              selected={values.dispute.productDelivered}
            />
          </RadioWrapper>

          <Subtitle>Причина спора</Subtitle>
          <ReasonFieldWrapper>
            <SelectField
              name="dispute.reason"
              options={
                values.dispute.productDelivered
                  ? disputeReasonsDelivered
                  : disputeReasonsNotDelivered
              }
              placeholder="Выберите причину спора"
              $mb={20}
            />
          </ReasonFieldWrapper>

          <InputTitle>Комментарий к спору</InputTitle>
          <CommentFieldWrapper>
            <Input
              type="textarea"
              name="dispute.comment"
              testId="dispute.comment"
              placeholder="Максимально 800 символов"
            />
          </CommentFieldWrapper>

          {values.dispute.attachments && <UploadFilesDispute photos={values.dispute.attachments} />}

          <ProposalFormFields variant="buyer" order={order} />

          <ActionsWrapper>
            <Button label="Отменить" variant="hollow" onClick={showCloseDispute} />

            <Button
              type="submit"
              label="Открыть спор"
              disabled={isSubmitting}
              testId="create-dispute-submit-button"
              $ml={8}
            />
          </ActionsWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};

export default OpenDisputeForm;
