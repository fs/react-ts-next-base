import React from 'react';
import * as Yup from 'yup';
import { useModal } from '@ebay/nice-modal-react';

import { useUpdateCompanyData } from 'lib/apollo/hooks/actions/companies';
import { useCompanyLegalForms } from 'lib/apollo/hooks/state/legalForms';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import CompanyInfoForm from '../CompanyInfoForm';

import { getFields, getAttachmentFields } from '../CompanyInfoForm/fields';

const UpdateCompany = ({ company }) => {
  const { id: companyId } = company || {};

  const { legalForms } = useCompanyLegalForms();

  const fields = getFields({ company, legalForms });
  const attachmentFields = getAttachmentFields({ company });

  const formFields = [...fields, ...attachmentFields];

  const [updateCompany] = useUpdateCompanyData({ companyId });
  const updateCompanyModal = useModal(SimpleModal);

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    await updateCompanyModal.show({
      onSubmit: async () => {
        const submitValues = {
          ...values,
          companyConfirmationRecords: values.companyConfirmationRecords.map(
            ({ attachmentRemoteUrl, attachment }) =>
              attachmentRemoteUrl ? { attachmentRemoteUrl } : { attachment },
          ),
        };

        await updateCompany(submitValues);
      },
      title: 'Редактирование данных о компании',
      description:
        'Нажимая “Подтвердить”, вы отправляете данные о вашей компании на повторную проверку. В таком случае все ваши товары в каталоге будут скрыты от пользователей на время проверки вашей компании.',
    });
  };

  const validationSchema = Yup.object().shape(
    formFields.reduce((obj, item) => ({ ...obj, [item.name]: item.validationSchema }), {}),
  );

  const initialValues = {
    ...formFields.reduce((obj, item) => ({ ...obj, [item.name]: item.initialValue }), {}),
  };

  const form = {
    initialValues,
    validationSchema,
    onSubmit,
    fields,
  };

  return <CompanyInfoForm form={form} company={company} />;
};

export default UpdateCompany;
