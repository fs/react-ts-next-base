import React from 'react';
import * as Yup from 'yup';
import { useModal } from '@ebay/nice-modal-react';

import { useUpdateRejectedCompany } from 'lib/apollo/hooks/actions/companies';
import { useCompanyLegalForms } from 'lib/apollo/hooks/state/legalForms';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { getCompanyFieldName } from 'config/constants/company';
import CompanyInfoForm from '../CompanyInfoForm';

import { getFields, getAttachmentFields } from '../CompanyInfoForm/fields';

const UpdateRejectedCompany = ({ company }) => {
  const { id: companyId, rejectedFields } = company || {};

  const { legalForms } = useCompanyLegalForms();

  const fields = getFields({ company, legalForms });
  const attachmentFields = getAttachmentFields({ company });

  const formFields = [...fields, ...attachmentFields];

  const [updateRejectedCompany] = useUpdateRejectedCompany({ companyId });
  const updateRejectedCompanyModal = useModal(SimpleModal);

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    await updateRejectedCompanyModal.show({
      onSubmit: async () => {
        const submitValues = {
          ...values,
          companyConfirmationRecords: values.companyConfirmationRecords.map(
            ({ attachmentRemoteUrl, attachment }) =>
              attachmentRemoteUrl ? { attachmentRemoteUrl } : { attachment },
          ),
        };

        const rejectedSubmitValues = Object.entries(submitValues)
          .filter(([fieldName]) =>
            rejectedFields.map(({ name }) => name).includes(getCompanyFieldName(fieldName)),
          )
          .reduce((obj, [name, value]) => ({ ...obj, [name]: value }), {});

        await updateRejectedCompany(rejectedSubmitValues);
      },
      title: 'Редактирование данных о компании',
      description:
        'Нажимая “Подтвердить”, вы отправляете данные о вашей компании на повторную проверку. В таком случае все ваши товары в каталоге будут скрыты от пользователей на время проверки вашей компании.',
    });
  };

  const validationSchema = Yup.object().shape(
    formFields.reduce(
      (obj, item) =>
        rejectedFields.map(({ name }) => name).includes(getCompanyFieldName(item.name))
          ? { ...obj, [item.name]: item.validationSchema }
          : obj,
      {},
    ),
  );

  const initialValues = {
    ...formFields.reduce((obj, item) => ({ ...obj, [item.name]: item.initialValue }), {}),
    isRejectedCompany: true,
    rejectionComments: formFields.reduce((obj, { name, fieldName }) => {
      return {
        ...obj,
        [fieldName || name]: rejectedFields.find(
          ({ name: rejectedName }) => rejectedName === getCompanyFieldName(fieldName || name),
        )?.comment,
      };
    }, {}),
  };

  const form = {
    initialValues,
    validationSchema,
    onSubmit,
    fields,
  };

  return <CompanyInfoForm form={form} company={company} />;
};

export default UpdateRejectedCompany;
