import React, { useEffect, useState, useRef } from 'react';
import { useModal } from '@ebay/nice-modal-react';

import Icon from 'components/shared/atoms/Icon';
import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import NumberInput from 'components/shared/atoms/NumberInput';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';
import DatePickerInput from 'components/shared/molecules/DatePickerInput';

import { VariantUnitKindEnum } from 'graphql/types';
import { humanizeUnitQuantityKind } from 'helpers/suffix';
import { DICTIONARY_PROPERTY, INTEGER_PROPERTY } from '../CreateProductProperties/constants';
import VariantTableSelect from '../VariantTableSelect';

import {
  VariantsTableWrapper,
  PropertiesWrapper,
  TableVariants,
  TableHeadCeil,
  TableCeil,
  ArrowWrapper,
} from './styled';

const VariantsTable = ({
  selectedProperties,
  setFieldValue,
  values,
  removeVariant,
  setDestroyedVariants,
  readOnly,
  isSubmitting,
}) => {
  const [scrollProperties, setScrollProperties] = useState(0);

  const removeVariantModal = useModal(SimpleModal);
  const refProperties = useRef(null);
  const colWidth = 182;
  const stickyColWidth = 96;
  const isShowUnitQuantity = values?.unitKind === VariantUnitKindEnum.Pack;

  const additionalColumnsCount = isShowUnitQuantity ? 2 : 1;
  const scrollableColumnsCount = selectedProperties.length + additionalColumnsCount;

  const widthProperties = scrollableColumnsCount * colWidth + stickyColWidth;

  const [tableWidth, setTableWidth] = useState(scrollableColumnsCount * colWidth || 0);

  const quantityKindSuffix = humanizeUnitQuantityKind(values?.unitQuantityKind, 0);

  const showRemoveVariant = (initial, variantId, index) =>
    removeVariantModal.show({
      onSubmit: async () => {
        if (initial)
          setDestroyedVariants(destroyedVariants => [
            ...destroyedVariants,
            { id: variantId, destroy: true },
          ]);
        removeVariant(index);
      },
      title: 'Удаление варианта товара',
      description: 'Вы уверены, что хотите удалить выбранный вариант товара?',
    });

  const onMoveTable = direction => {
    const leftColRange = scrollProperties % colWidth;
    const rightColRange = colWidth - (scrollProperties % colWidth);
    refProperties.current.scrollLeft =
      direction === 'left'
        ? scrollProperties - (leftColRange > 5 ? leftColRange : colWidth)
        : scrollProperties + (rightColRange > 5 ? rightColRange : colWidth);
  };

  const scrollHandler = () => setScrollProperties(refProperties.current?.scrollLeft);
  const widthHandler = () => setTableWidth(refProperties.current?.offsetWidth);

  const subscribeScroll = () => window.addEventListener('scroll', scrollHandler, true);
  const unsubscribeScroll = () => window.removeEventListener('scroll', scrollHandler, true);
  const subscribeResize = () => window.addEventListener('resize', widthHandler);
  const unsubscribeResize = () => window.removeEventListener('resize', widthHandler);

  useEffect(() => {
    widthHandler();
    subscribeScroll();
    subscribeResize();
    return () => {
      unsubscribeScroll();
      unsubscribeResize();
    };
  }, []);

  return (
    <VariantsTableWrapper $width={tableWidth + stickyColWidth} items={values.variants.length}>
      {scrollProperties > 5 && (
        <ArrowWrapper direction="left">
          <Button
            iconType="only"
            shape="circle"
            size="small"
            icon={<Icon name="arrow-chevron-left" $color="white" />}
            onClick={() => onMoveTable('left')}
          />
        </ArrowWrapper>
      )}
      <PropertiesWrapper ref={refProperties} items={values.variants.length}>
        <TableVariants>
          <tbody>
            <tr>
              <TableHeadCeil>№</TableHeadCeil>
              {selectedProperties.map(({ label }, i) => (
                <TableHeadCeil key={i}>{label}</TableHeadCeil>
              ))}
              {isShowUnitQuantity && (
                <TableHeadCeil>
                  {`Кол-во в упаковке, ${humanizeUnitQuantityKind(values?.unitQuantityKind, 0)}`}
                </TableHeadCeil>
              )}
              <TableHeadCeil>Срок годности, до</TableHeadCeil>
              <TableHeadCeil>
                <Icon name="trash-bin" $size={18} $color="greyA4" />
              </TableHeadCeil>
            </tr>
            {values.variants.map(
              (
                { id: variantId, variantProperties, expirationDate, initial, unitQuantity },
                variantIndex,
              ) => {
                const pluralizedQuantityKindSuffix = humanizeUnitQuantityKind(
                  values?.unitQuantityKind,
                  unitQuantity,
                );

                return (
                  <tr key={variantId}>
                    <TableCeil data-testid={`variant-index-${variantIndex}`}>
                      {variantIndex + 1}
                    </TableCeil>

                    {variantProperties.map(
                      (
                        { propertyId, propertyValue, propertyType, propertyLabel },
                        propertyIndex,
                      ) => {
                        const name = `variants.${variantIndex}.variantProperties.${propertyIndex}`;
                        const unit =
                          selectedProperties.find(item => item.value === propertyId)?.unit || '';
                        return (
                          <TableCeil key={propertyIndex}>
                            {propertyType === DICTIONARY_PROPERTY ? (
                              <VariantTableSelect
                                name={name}
                                propertyId={propertyId}
                                setFieldValue={setFieldValue}
                                initialValue={propertyValue}
                                readOnly={readOnly}
                              />
                            ) : propertyType === INTEGER_PROPERTY ? (
                              <NumberInput
                                name={`${name}.propertyValue`}
                                testId={`${name}.propertyValue`}
                                readOnly={readOnly}
                                placeholder={
                                  unit ? `Введите значение, ${unit}` : 'Введите значение'
                                }
                                suffix={` ${unit}`}
                                variant="table_cell"
                              />
                            ) : (
                              <Input
                                readOnly={readOnly}
                                type="text"
                                name={`${name}.propertyValue`}
                                testId={`${name}.propertyValue`}
                                placeholder={propertyLabel}
                                variant="table-cell"
                              />
                            )}
                          </TableCeil>
                        );
                      },
                    )}
                    {isShowUnitQuantity && (
                      <TableCeil>
                        <NumberInput
                          name={`variants.${variantIndex}.unitQuantity`}
                          testId={`variants.${variantIndex}.unitQuantity`}
                          placeholder={`Введите значение, ${quantityKindSuffix}`}
                          suffix={` ${pluralizedQuantityKindSuffix}`}
                          variant="table_cell"
                          readOnly={readOnly}
                        />
                      </TableCeil>
                    )}
                    <TableCeil>
                      <DatePickerInput
                        readOnly={readOnly}
                        variant="table-cell"
                        name={`variants.${variantIndex}.expirationDate`}
                        placeholder="Срок годности"
                        onSubmit={date =>
                          setFieldValue(`variants.${variantIndex}.expirationDate`, date)
                        }
                        currentDate={expirationDate}
                        checkbox="Без срока годности"
                        disabled={isSubmitting}
                      />
                    </TableCeil>

                    <TableCeil>
                      {values.variants.length > 1 && !readOnly && (
                        <Button
                          variant="hollow"
                          iconType="only"
                          icon={<Icon name="close" $color="greyCC" $size={18} />}
                          onClick={() => showRemoveVariant(initial, variantId, variantIndex)}
                          testId={`remove-variant-${variantIndex}-modal-button`}
                        />
                      )}
                    </TableCeil>
                  </tr>
                );
              },
            )}
          </tbody>
        </TableVariants>
      </PropertiesWrapper>
      {widthProperties - (tableWidth + scrollProperties) > 5 && (
        <ArrowWrapper direction="right">
          <Button
            iconType="only"
            shape="circle"
            size="small"
            icon={<Icon name="arrow-chevron-right" $color="white" />}
            onClick={() => onMoveTable('right')}
          />
        </ArrowWrapper>
      )}
    </VariantsTableWrapper>
  );
};

export default VariantsTable;
