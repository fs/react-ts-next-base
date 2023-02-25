import React from 'react';
import * as Yup from 'yup';
import { REQUIRED_FIELD } from 'config/constants/errorsText';
import { useModal } from '@ebay/nice-modal-react';

import { DEPTH_DECLENSION_DICTIONARY } from 'config/constants/categories';

import { useUpdateCategory } from 'lib/apollo/hooks/actions/categoriesAdmin';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_FIELD),
});

const UpdateCategoryButton = ({ selectedCategory, depth }) => {
  const selectedCategoryName = selectedCategory?.name;

  const [updateCategory] = useUpdateCategory({
    depthName: DEPTH_DECLENSION_DICTIONARY[depth],
    previousName: selectedCategoryName,
  });
  const updateCategoryModal = useModal(SimpleModal);

  const showUpdateCategory = () => {
    const depthName = DEPTH_DECLENSION_DICTIONARY[depth].toLowerCase();

    updateCategoryModal.show({
      variant: 'change',
      roundedButton: true,
      onSubmit: async ({ name }) => {
        await updateCategory({ name, categoryId: selectedCategory?.id, depth });
      },
      title: `Редактирование ${depthName}`,
      description: `Введите новое название ${depthName}`,
      form: {
        body: (
          <Input
            rounded
            type="textarea"
            testId="name"
            placeholder={`Введите новое название ${depthName}`}
            title={`Введите новое название ${depthName}`}
            name="name"
          />
        ),
        initialValues: {
          name: selectedCategoryName,
        },
        validationSchema,
      },
    });
  };
  return (
    <Button
      variant="change"
      icon={<Icon name="pencil" $color="white" />}
      iconType="only"
      shape="rounded"
      size="small"
      onClick={showUpdateCategory}
      testId="update-category-button"
    />
  );
};

export default UpdateCategoryButton;
