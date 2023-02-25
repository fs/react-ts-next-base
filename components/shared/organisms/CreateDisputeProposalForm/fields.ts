import { useMemo } from 'react';
import * as Yup from 'yup';

import { DisputeProposalReturnPayerEnum } from 'graphql/types';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

import { getProposalFieldsInput } from './types';

export const getProposalFields = ({ dispute, variant, deliveryPrice }: getProposalFieldsInput) => {
  const { lastBuyerProposal, lastSellerProposal } = dispute;
  const defaultValue = useMemo(() => {
    switch (variant) {
      case 'seller':
        return lastBuyerProposal;
      case 'buyer':
        return lastSellerProposal;
      case 'admin':
        return undefined;
      default:
        console.error('Wrong CreateDisputeProposalForm variant');
        return undefined;
    }
  }, [variant]);

  return [
    {
      name: 'returnRequired',
      initialValue: defaultValue?.returnRequired || true,
      validationSchema: Yup.boolean().required(REQUIRED_FIELD).nullable(),
    },
    {
      name: 'returnQuantity',
      initialValue: defaultValue?.returnQuantity || 0,
      validationSchema: Yup.number().nullable(),
    },
    {
      name: 'productReturnAmount',
      initialValue: defaultValue?.productReturnAmount || 0,
      validationSchema: Yup.number().required(REQUIRED_FIELD).nullable(),
    },
    {
      name: 'deliveryReturnAmount',
      initialValue: defaultValue?.deliveryReturnAmount || 0,
      validationSchema: Yup.number().nullable(),
    },
    {
      name: 'returnPayer',
      initialValue:
        deliveryPrice === 0 ? DisputeProposalReturnPayerEnum.Buyer : defaultValue?.returnPayer,
      validationSchema: Yup.string().required(REQUIRED_FIELD).nullable(),
    },
    {
      name: 'comment',
      initialValue: '',
      validationSchema: Yup.string().nullable(),
    },
  ];
};
