import React from 'react';

import Collapsible from 'components/shared/atoms/Collapsible';
import Photos from 'components/shared/molecules/Photos';

import {
  ProductVariantInfoWrapper,
  AccordionContent,
  VariantPropertiesTitle,
  VariantPropertiesList,
} from './styled';

const VariantPhotosContent = ({ images = [] }) => {
  return images.length ? (
    <Photos
      images={images.map(({ id, attachmentUrl }) => ({ id, url: attachmentUrl }))}
      editable={false}
    />
  ) : (
    <div>Отсутствуют</div>
  );
};

const ProductVariantInfo = ({ remainingVariants = [] }) => {
  const disabled = remainingVariants?.length > 1;
  const [variant] = remainingVariants;

  const {
    length,
    width,
    height,
    netWeight,
    grossWeight,
    packingMaterial,
    variantInstructions,
    variantCertificates,
  } = variant || {};

  const variantInfoProperties = [
    { value: length, label: 'Длина', suffix: 'см' },
    { value: width, label: 'Ширина', suffix: 'см' },
    { value: height, label: 'Высота', suffix: 'см' },
    { value: netWeight, label: 'Вес нетто', suffix: 'г' },
    { value: grossWeight, label: 'Вес брутто', suffix: 'г' },
    { value: packingMaterial?.name, label: 'Материал' },
  ];

  const variantPhotosAccordion = [
    {
      name: 'variant-certificates',
      heading: 'Документы качества',
      content: <VariantPhotosContent images={variantCertificates} />,
    },
    {
      name: 'variant-instructions',
      heading: 'Инструкции',
      content: <VariantPhotosContent images={variantInstructions} />,
    },
  ];

  const accordionContent = (
    <AccordionContent>
      <VariantPropertiesTitle>Параметры упаковки</VariantPropertiesTitle>
      <VariantPropertiesList>
        {variantInfoProperties.map(({ value, label, suffix }, i) => (
          <div key={i}>
            {label}: {value} {suffix}
          </div>
        ))}
      </VariantPropertiesList>
      <Collapsible accordion={variantPhotosAccordion} disabled={disabled} />
    </AccordionContent>
  );

  const variantPropertiesAccordion = [
    {
      name: 'variant-info',
      heading: 'Подробнее о товаре',
      content: accordionContent,
      noContent: 'Описание отсутствует',
    },
  ];

  return (
    <ProductVariantInfoWrapper>
      <Collapsible accordion={variantPropertiesAccordion} disabled={disabled} />
    </ProductVariantInfoWrapper>
  );
};

export default ProductVariantInfo;
