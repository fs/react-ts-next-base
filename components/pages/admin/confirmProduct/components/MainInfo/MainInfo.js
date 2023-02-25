import React from 'react';
import Fieldset from 'components/shared/atoms/Fieldset';
import FilesSection from 'components/shared/molecules/FilesSection';
import { CATEGORY_DEPTH_DICTIONARY, CONDITION_DICTIONARY } from 'config/constants/product';

import { SectionHeader, SectionRow, SectionWrapper } from '../styled';

const MainInfo = ({
  categories,
  condition = '',
  name = '',
  manufacturer = '',
  countryName = '',
  description = '',
  vat = '',
  productConfirmationRecords = [],
}) => {
  return (
    <SectionWrapper>
      <SectionHeader>Основная информация</SectionHeader>
      <SectionRow>
        {categories.map(({ id, name: categoryName, depth }) => (
          <Fieldset key={id} legend={CATEGORY_DEPTH_DICTIONARY[depth]} $width="49%">
            {categoryName}
          </Fieldset>
        ))}
      </SectionRow>
      <SectionRow>
        <Fieldset legend="Состояние товара" $width="100%">
          {CONDITION_DICTIONARY[condition] || ''}
        </Fieldset>
      </SectionRow>
      <SectionRow>
        <Fieldset legend="Название товара" $width="100%">
          {name}
        </Fieldset>
      </SectionRow>
      <SectionRow>
        <Fieldset legend="Производитель" $width="100%">
          {manufacturer}
        </Fieldset>
      </SectionRow>
      <SectionRow>
        <Fieldset legend="Страна производителя" $width="100%">
          {countryName}
        </Fieldset>
      </SectionRow>
      <SectionRow>
        <Fieldset legend="Описание товара" $width="100%">
          {description}
        </Fieldset>
      </SectionRow>
      <SectionRow>
        <Fieldset legend="Ставка НДС" $width="auto">
          {vat} %
        </Fieldset>
      </SectionRow>
      <FilesSection
        title="Подтверждающие фото"
        type="attachment"
        files={productConfirmationRecords}
      />
    </SectionWrapper>
  );
};

export default MainInfo;
