import React from 'react';
import { useModal } from '@ebay/nice-modal-react';

import {
  DEPTH_DECLENSION_DICTIONARY,
  DEPTH_DECLENSION_SINGULAR_DICTIONARY,
} from 'config/constants/categories';

import { useDestroyCategory } from 'lib/apollo/hooks/actions/categoriesAdmin';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Tooltip from 'components/shared/atoms/Tooltip';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

const DestroyCategoryButton = ({ selectedCategory, depth, onCompleted }) => {
  const [destroyCategory] = useDestroyCategory({
    depthName: DEPTH_DECLENSION_SINGULAR_DICTIONARY[depth].toLowerCase(),
    onCompleted,
  });
  const destroyCategoryModal = useModal(SimpleModal);

  const showDestroyCategory = () => {
    const depthName = DEPTH_DECLENSION_DICTIONARY[depth].toLowerCase();
    const depthSingularName = DEPTH_DECLENSION_SINGULAR_DICTIONARY[depth].toLowerCase();
    const selectedCategoryName = selectedCategory?.name;
    destroyCategoryModal.show({
      variant: 'alert',
      roundedButton: true,
      onSubmit: async () => {
        await destroyCategory({ categoryId: selectedCategory?.id });
      },
      title: `Удаление ${depthName}`,
      description: (
        <>
          {`Вы уверены, что хотите удалить ${depthSingularName} `}
          <b>{selectedCategoryName}</b>
          {' ?'}
        </>
      ),
    });
  };

  return (
    <Tooltip
      active={!selectedCategory?.canDestroy?.value}
      text="Вы не можете удалить эту Категорию, так как она уже используется в приложении."
    >
      <Button
        testId="destroy-category-button"
        variant="alert"
        icon={<Icon name="trash-bin" $color="white" />}
        iconType="only"
        shape="rounded"
        size="small"
        disabled={!selectedCategory?.canDestroy?.value}
        onClick={showDestroyCategory}
      />
    </Tooltip>
  );
};

export default DestroyCategoryButton;
