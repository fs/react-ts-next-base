import React from 'react';
import { Formik, Form as FormikForm, FormikHelpers } from 'formik';

import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import RejectComment from 'components/shared/atoms/RejectComment';
import DatePickerInput from 'components/shared/molecules/DatePickerInput';

import UploadFilesReturnShipment from '../UploadFilesReturnShipment';
import { getInitialValues, validationSchema, TFormValues } from './fields';

import {
  Title,
  Description,
  RejectionWrapper,
  Subtitle,
  DateWrapper,
  DatePickerWrapper,
} from './styled';

type TCreateReturnedShipmentForm = {
  onSubmit: (values: TFormValues, formHelpers: FormikHelpers<TFormValues>) => Promise<void>;
  dispute: DisputeFragment;
  isRejectedReturnedShipment: boolean;
};

const CreateReturnedShipmentForm = ({
  onSubmit,
  dispute,
  isRejectedReturnedShipment,
}: TCreateReturnedShipmentForm) => {
  const initialValues = getInitialValues(dispute);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <FormikForm>
          <Title>Товар отправлен продавцу</Title>
          <Description>
            Вы уведомляете продавца о том, что отправили товар в количестве&nbsp;
            {dispute?.acceptedProposal?.returnQuantity} шт.
          </Description>

          {isRejectedReturnedShipment && dispute?.returnedShipment?.rejectComment && (
            <RejectionWrapper>
              <Icon name="exclamation-square" $size={26} $color="orange" $mr={14} />
              <RejectComment
                comment={dispute.returnedShipment.rejectComment}
                testId="rejected-returned-shipment-comment"
              />
            </RejectionWrapper>
          )}

          <Subtitle>Укажите промежуток, в который товар будет доставлен продавцу:</Subtitle>
          <DateWrapper>
            <DatePickerWrapper>
              от
              <DatePickerInput
                name="startDate"
                $width="9.5rem"
                placeholder="дд.мм.гг"
                currentDate={values.startDate}
                setFieldValue={setFieldValue}
                maxDate={values.endDate ? new Date(values.endDate) : undefined}
                error={touched.startDate ? errors.startDate : undefined}
                $ml={16}
              />
            </DatePickerWrapper>

            <DatePickerWrapper>
              до
              <DatePickerInput
                name="endDate"
                $width="9.5rem"
                placeholder="дд.мм.гг"
                currentDate={values.endDate}
                setFieldValue={setFieldValue}
                minDate={values.startDate ? new Date(values.startDate) : undefined}
                error={touched.endDate ? errors.endDate : undefined}
                $ml={13}
              />
            </DatePickerWrapper>
          </DateWrapper>

          <Subtitle>Прикрепите фото документа грузоперевозчика или маршрутный лист:</Subtitle>

          <UploadFilesReturnShipment name="attachments" dispute={dispute} />

          <Button
            type="submit"
            variant={isRejectedReturnedShipment ? 'primary' : 'confirm'}
            label="Подтвердить"
            size="small"
            testId="create-returned-shipment-submit-button"
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default CreateReturnedShipmentForm;
