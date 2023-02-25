import React from 'react';
import * as Yup from 'yup';
import { useModal } from '@ebay/nice-modal-react';

import {
  DEPTH_DECLENSION_DICTIONARY,
  DEPTH_DECLENSION_SINGULAR_DICTIONARY,
} from 'config/constants/categories';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

import { useCreateCategory } from 'lib/apollo/hooks/actions/categoriesAdmin';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_FIELD),
});

const CreateCategoryButton = ({ depth, parentId, onCompleted }) => {
  const [createCategory] = useCreateCategory({
    depthName: DEPTH_DECLENSION_SINGULAR_DICTIONARY[depth],
    onCompleted,
  });
  const createCategoryModal = useModal(SimpleModal);

  const showCreateCategory = () => {
    const depthName = DEPTH_DECLENSION_DICTIONARY[depth].toLowerCase();
    createCategoryModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async ({ name }) => {
        await createCategory({ name, parentId });
      },
      title: `Добавление ${depthName}`,
      description: `Введите название ${depthName}`,
      form: {
        body: (
          <Input
            rounded
            type="textarea"
            testId="name"
            placeholder={`Введите название ${depthName}`}
            title={`Введите название ${depthName}`}
            name="name"
          />
        ),
        initialValues: {
          name: '',
        },
        validationSchema,
      },
    });
  };
  return (
    <Button
      variant="confirm"
      icon={<Icon name="plus" $color="white" />}
      iconType="leading"
      shape="rounded"
      size="small"
      onClick={showCreateCategory}
      testId="create-category-button"
    >
      Добавить
    </Button>
  );
};

export default CreateCategoryButton;
