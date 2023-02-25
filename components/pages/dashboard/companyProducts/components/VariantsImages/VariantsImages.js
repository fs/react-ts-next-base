import React from 'react';

import VariantImages from './VariantImages';

import {
  VariantWrapper,
  VariantTitle,
  PropertiesListItem,
  Row,
  VariantsWrapper,
  PropertiesList,
} from './styled';

const photosFields = [
  {
    name: 'variantPhotos',
    title: 'Прикрепите фото товара',
    readOnlyTitle: 'Фото товара',
    format: ['photo'],
  },
  {
    name: 'variantCertificates',
    title: 'Прикрепите файлы документа качества товара (jpeg, png, pdf, bmp)',
    readOnlyTitle: 'Файлы документа качества товара',
    format: ['photo', 'pdf'],
  },
  {
    name: 'variantInstructions',
    title: 'Если есть инструкция к товару, прикрепите файлы (jpeg, png, pdf, bmp)',
    readOnlyTitle: 'Инструкция к товару',
    format: ['photo', 'pdf'],
  },
];

const VariantsImages = ({ values, readOnly = false }) => {
  return (
    <VariantsWrapper>
      {values.variants.map(({ id: variantId, variantProperties }, variantIndex) => {
        return (
          <VariantWrapper key={variantId}>
            <Row>
              <VariantTitle>Вариант товара №{variantIndex + 1}</VariantTitle>
              <PropertiesList>
                {variantProperties.map(
                  ({ propertyLabel, propertyValueLabel, propertyValue }, index) => {
                    return (
                      <PropertiesListItem key={index}>
                        {!!index && <span style={{ padding: '0 0.35rem' }}>/</span>}
                        <span>
                          {propertyLabel}: {propertyValueLabel || propertyValue}
                        </span>
                      </PropertiesListItem>
                    );
                  },
                )}
              </PropertiesList>
            </Row>

            {photosFields.map(({ name, title, format, readOnlyTitle }, indexPhoto) => (
              <VariantImages
                name={name}
                index={variantIndex}
                title={title}
                readOnlyTitle={readOnlyTitle}
                variantImages={values.variants[variantIndex][name]}
                documentFormats={format}
                key={indexPhoto}
                readOnly={readOnly}
              />
            ))}
          </VariantWrapper>
        );
      })}
    </VariantsWrapper>
  );
};

export default VariantsImages;
