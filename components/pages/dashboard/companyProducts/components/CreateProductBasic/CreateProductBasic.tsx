import React from 'react';
import * as Yup from 'yup';
import isEqual from 'lodash/isEqual';
import { FormikHelpers } from 'formik';
import useRouter from 'hooks/useRouter';
import { useModal } from '@ebay/nice-modal-react';

import { REQUIRED_FIELD } from 'config/constants/errorsText';
import { DASHBOARD_COMPANY_CREATE_PRODUCT } from 'config/routes';
import { ProductInfoFragment } from 'graphql/fragments/__generated__/productInfo.generated';
import { ConditionEnum, ProductDraftStepEnum } from 'graphql/types';

import { useCreateProductDraft, useSubmitProductBasicStep } from 'lib/apollo/hooks/actions/product';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import CreateProductBasicForm from './CreateProductBasicForm';

import { TCreateProductBasic, TFormValues, parseQuery } from './types';
import { Title } from '../_shared/styled';

const CreateProductBasic = ({
  product,
  onSubmitStep = () => {},
  isDraft = true,
  query,
  readOnly = false,
}: TCreateProductBasic) => {
  const { companyId } = parseQuery(query);
  const { pushRoute } = useRouter();
  const {
    id: productId,
    category: initialCategory,
    condition: initialCondition,
    manufacturer: initialManufacturer,
    country: initialCountry,
    name: initialName,
    description: initialDescription,
    draftStep,
  } = product || {};

  const initialCategories = () => {
    const categories: string[] = Array(4).fill(null);
    const addCategory = (category: ProductInfoFragment['category']) => {
      if (!category) return;
      categories[category.depth] = category?.id;
      if (category.parent) addCategory(category.parent);
    };
    if (initialCategory) addCategory(initialCategory);
    return categories;
  };

  const onCreateDraft = ({ id }: { id?: string }) => {
    pushRoute({
      pathname: DASHBOARD_COMPANY_CREATE_PRODUCT,
      query: {
        companyId,
        productId: id,
      },
    });
  };

  const [createProductDraft] = useCreateProductDraft({ onSubmit: onCreateDraft });
  const [submitProductBasicStep] = useSubmitProductBasicStep({
    onSubmit: () => onSubmitStep(ProductDraftStepEnum.Properties),
  });

  const acceptChangesModal = useModal(SimpleModal);

  const onSubmit = async (values: TFormValues, { setSubmitting }: FormikHelpers<TFormValues>) => {
    if (readOnly) {
      onSubmitStep(ProductDraftStepEnum.Properties);
      return;
    }
    setSubmitting(true);
    const { name, description, condition, manufacturer, country: countryId, categories } = values;
    let categoryId = '';
    for (let i = categories.length - 1; i >= 0; i -= 1) {
      if (categories[i]) {
        categoryId = categories[i];
        break;
      }
    }
    if (isDraft && productId) {
      const callSubmitProductBasicStep = async () => {
        return submitProductBasicStep({
          productId,
          name,
          description,
          condition,
          categoryId,
          countryId,
          manufacturer,
        });
      };
      if (!isEqual(categories, initialCategories())) {
        await acceptChangesModal.show({
          variant: 'confirm',
          onSubmit: callSubmitProductBasicStep,
          title: 'Изменение категорий',
          description: 'Вы уверены, что хотите изменить выбранные категории товара?',
          subDescription:
            'Нажимая “Подтвердить”, вы сбросите заполненную информацию во всех остальных шагах.',
        });
      } else {
        await callSubmitProductBasicStep();
      }
    }
    if (!isDraft) {
      await createProductDraft({
        companyId,
        name,
        description,
        condition,
        categoryId,
        countryId,
        manufacturer,
      });
    }
    setSubmitting(false);
  };

  const initialValues: TFormValues = {
    condition: initialCondition || ConditionEnum.New,
    name: initialName || '',
    manufacturer: initialManufacturer || '',
    country: initialCountry?.id || '',
    description: initialDescription || '',
    categories: initialCategories(),
  };

  const validationSchema = Yup.object().shape({
    condition: Yup.string().required(REQUIRED_FIELD).nullable(),
    name: Yup.string().required(REQUIRED_FIELD).nullable(),
    manufacturer: Yup.string().required(REQUIRED_FIELD).nullable(),
    country: Yup.string().required(REQUIRED_FIELD).nullable(),
    description: Yup.string()
      .max(2000, ({ value }) => `Максимальная длина описания 2000 символов (${value.length}/2000)`)
      .nullable(),
    categories: Yup.array()
      .test('check-category', REQUIRED_FIELD, (value?: string[]) => (value ? !!value[0] : false))
      .nullable(),
  });

  const form = {
    onSubmit,
    initialValues,
    validationSchema,
  };

  return (
    <>
      <Title data-cy="create-product-basic-title">Шаг 1: Основная информация</Title>
      <CreateProductBasicForm
        draftStep={draftStep}
        readOnly={readOnly}
        form={form}
        initialCountry={initialCountry}
      />
    </>
  );
};

export default CreateProductBasic;
