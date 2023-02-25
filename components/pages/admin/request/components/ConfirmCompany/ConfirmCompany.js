import React from 'react';
import * as Yup from 'yup';
import { omit } from 'lodash';
import useRouter from 'hooks/useRouter';
import { useModal } from '@ebay/nice-modal-react';

import { useConfirmCompany, useRejectCompany } from 'lib/apollo/hooks/actions/companies';

import { REQUIRED_FIELD } from 'config/constants/errorsText';
import { ADMIN_REQUESTS } from 'config/routes';
import { getCompanyFieldName } from 'config/constants/company';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import ConfirmCompanyForm from './ConfirmCompanyForm';

import { getFields, getAttachmentFields } from './fields';

const ConfirmCompany = ({ company }) => {
  const { id: companyId, officialName: companyName } = company;
  const { pushRoute } = useRouter();

  const fields = getFields(company);
  const attachmentFields = getAttachmentFields(company);
  const formFields = [...fields, ...attachmentFields];

  const onSubmitModal = () => pushRoute(ADMIN_REQUESTS);

  const [confirmCompany] = useConfirmCompany({ companyName, onConfirm: onSubmitModal });
  const [rejectCompany] = useRejectCompany({ companyId, companyName, onSubmit: onSubmitModal });
  const rejectCompanyModal = useModal(SimpleModal);
  const confirmCompanyModal = useModal(SimpleModal);

  const showRejectCompany = values =>
    rejectCompanyModal.show({
      variant: 'change',
      roundedButton: true,
      onSubmit: async () => {
        await rejectCompany({ fields: values });
      },
      title: 'Запросить изменения',
      description:
        'Нажимая “Подтвердить”, вы отправляете уведомление пользователю о том, что он должен отредактировать данные.',
    });

  const showConfirmCompany = () =>
    confirmCompanyModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async () => {
        await confirmCompany({ companyId });
      },
      title: 'Добавление компании',
      description: (
        <>
          Нажимая “Подтвердить”, вы добавите компанию <b>“{companyName}”</b> на сайт
        </>
      ),
    });

  const initialValues = {
    ...formFields.reduce((obj, item) => ({ ...obj, [item.name]: item.initialValue }), {}),
    comment: formFields.reduce((obj, item) => ({ ...obj, [item.name]: false }), {}),
  };

  const validationSchema = Yup.object().shape(
    formFields.reduce(
      (obj, item) => ({
        ...obj,
        [item.name]: Yup.string()
          .when(['comment'], (comment, schema) => {
            const isRequiredField = comment[item.name];
            return isRequiredField ? schema.required(REQUIRED_FIELD) : schema;
          })
          .nullable(),
      }),
      {},
    ),
  );

  const onSubmit = (values, { setSubmitting }) => {
    const { confirm } = values;
    setSubmitting(false);

    if (confirm) {
      showConfirmCompany();
    } else {
      const submitValues = Object.entries(omit(values, ['confirm', 'comment'])).reduce(
        (acc, [name, comment]) => {
          return comment ? [...acc, { name: getCompanyFieldName(name), comment }] : acc;
        },
        [],
      );
      showRejectCompany(submitValues);
    }
  };

  const form = {
    fields,
    attachmentFields: attachmentFields.reduce(
      (obj, item) => ({ ...obj, [item.name]: item.value }),
      {},
    ),
    initialValues,
    validationSchema,
    onSubmit,
  };

  return <ConfirmCompanyForm form={form} company={company} />;
};

export default ConfirmCompany;
