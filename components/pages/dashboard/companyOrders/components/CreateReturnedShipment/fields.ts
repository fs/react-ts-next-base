import * as Yup from 'yup';

import { REQUIRED_FIELD } from 'config/constants/errorsText';
import { Uploader } from 'graphql/types';
import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';

export type TFormValues = {
  startDate: string;
  endDate: string;
  attachments: { id?: string; attachmentRemoteUrl?: string; attachment?: Uploader }[];
};

export const getInitialValues = (dispute: DisputeFragment): TFormValues => {
  const { startDate, endDate, attachments } = dispute.returnedShipment || {};

  return {
    startDate,
    endDate,
    attachments: attachments?.length
      ? attachments.map(({ attachmentUrl: url, id }) => ({
          attachmentRemoteUrl: url,
          id,
        }))
      : [],
  };
};

export const validationSchema = Yup.object().shape({
  startDate: Yup.string().required(REQUIRED_FIELD).nullable(),
  endDate: Yup.string().required(REQUIRED_FIELD).nullable(),
  attachments: Yup.array().required(REQUIRED_FIELD).min(1, REQUIRED_FIELD),
});
