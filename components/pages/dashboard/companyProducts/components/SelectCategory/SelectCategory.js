import React, { useState } from 'react';

import ActionLink from 'components/shared/atoms/ActionLink';
import SelectCategoryItem from 'components/shared/atoms/SelectCategoryItem';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';

import { useModal } from '@ebay/nice-modal-react';
import { SelectCategoryWrapper, CategoriesWrapper, Description } from './styled';
import { Subtitle } from '../CreateProductBasic/styled';

const SelectCategory = ({ values, readOnly }) => {
  const { categories } = values;
  const [options, setOptions] = useState(Array(4).fill([]));
  const supportRequestModal = useModal(SupportRequestModal);

  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };

  const categoryFields = [
    {
      name: 'categories.0',
      title: 'Категория товара',
      placeholder: 'Категория товара',
      fieldIndex: 0,
    },
    {
      name: 'categories.1',
      disabled: !categories[0],
      title: 'Подкатегория товара',
      placeholder: !categories[0]
        ? 'Выберите категорию'
        : categories[0] && !options[1].length
        ? 'Нет подкатегорий'
        : 'Подкатегория товара',
      fieldIndex: 1,
    },
    {
      name: 'categories.2',
      disabled: !categories[1],
      title: 'Раздел',
      placeholder: !categories[1]
        ? 'Выберите подкатегорию'
        : categories[1] && !options[2].length
        ? 'Нет разделов'
        : 'Раздел',
      fieldIndex: 2,
    },
    {
      name: 'categories.3',
      disabled: !categories[2],
      title: 'Подраздел',
      placeholder: !categories[2]
        ? 'Выберите подраздел'
        : categories[2] && !options[3].length
        ? 'Нет подразделов'
        : 'Подраздел',
      fieldIndex: 3,
    },
  ];

  return (
    <SelectCategoryWrapper>
      <Subtitle>Категория товара</Subtitle>

      <CategoriesWrapper>
        {categoryFields.map((field, index) => (
          <SelectCategoryItem
            readOnly={readOnly}
            key={index}
            field={field}
            options={options}
            setOptions={setOptions}
          />
        ))}
      </CategoriesWrapper>

      {!readOnly && (
        <Description>
          Если вашей категории нет в предложенном списке, <br />
          напишите{` `}
          <ActionLink size={14} onClick={onSupportRequestLinkClick}>
            в поддержку
          </ActionLink>
        </Description>
      )}
    </SelectCategoryWrapper>
  );
};

export default SelectCategory;
