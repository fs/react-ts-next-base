import React from 'react';
import { FieldArray } from 'formik';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import DeliveryCitySelect from '../DeliveryCitySelect';
import DeliveryCityInput from '../DeliveryCityInput';
import RemoveDeliveryCity from '../RemoveDeliveryCity';

import { InputsWrapper, CitiesList, Row, Col, RangeWrapper, Subtitle } from './styled';

const DeliveryCitiesForm = ({
  onAddDeliveryCity,
  method,
  values,
  methods,
  initialCities,
  setFieldTouched,
  readOnly,
}) => {
  const { productFreeDeliveries, productPaidDeliveries } = values;
  const { deliveries } = Object.values(methods).find(({ name }) => name === method);
  const descriptionCity = 'Выберите в какой город вы повезете за эту сумму';
  const descriptionDays = 'Это промежуток в днях за который вы успеете доставить заказ';

  const onBlur = fieldName => {
    setFieldTouched(fieldName, true);
  };

  return (
    <InputsWrapper>
      <FieldArray name={deliveries}>
        {({ remove, push }) => (
          <>
            {method === methods.FREE.name && productFreeDeliveries.length > 0 && (
              <CitiesList>
                {productFreeDeliveries.map(({ id }, index) => {
                  return (
                    <Row key={id}>
                      <Col>
                        <DeliveryCitySelect
                          name={`${deliveries}.${index}.cityId`}
                          title="Город бесплатной доставки"
                          placeholder="Выберите город  бесплатной доставки"
                          width="20rem"
                          initialValue={initialCities[method][index]}
                          readOnly={readOnly}
                        />
                      </Col>
                      <Col>
                        <DeliveryCityInput
                          readOnly={readOnly}
                          width="8rem"
                          name={`${deliveries}.${index}.minCost`}
                          placeholder="От, руб."
                          title="От, руб."
                        />
                        <RangeWrapper>
                          <span>от</span>
                          <DeliveryCityInput
                            width="4.5rem"
                            name={`${deliveries}.${index}.minDays`}
                            placeholder="День"
                            title="День"
                            description={descriptionDays}
                            index={index}
                            readOnly={readOnly}
                          />
                          <span>до</span>
                          <DeliveryCityInput
                            readOnly={readOnly}
                            width="4.5rem"
                            name={`${deliveries}.${index}.maxDays`}
                            placeholder="День"
                            title="День"
                            onBlur={() => onBlur(`${deliveries}.${index}.minDays`)}
                          />
                        </RangeWrapper>
                        {!!index && (
                          <RemoveDeliveryCity remove={remove} index={index} method={method} />
                        )}
                      </Col>
                    </Row>
                  );
                })}
              </CitiesList>
            )}
            {method === methods.PAID.name && productFreeDeliveries && (
              <>
                <Subtitle>Выберите цену за доставку товара</Subtitle>
                <CitiesList>
                  {productPaidDeliveries.map(({ id }, index) => {
                    return (
                      <Row key={id}>
                        <Col>
                          <DeliveryCityInput
                            readOnly={readOnly}
                            width="6.5rem"
                            name={`${deliveries}.${index}.price`}
                            placeholder="Цена, руб."
                            title="Цена, руб."
                          />
                          <RangeWrapper>
                            <span>от</span>
                            <DeliveryCityInput
                              readOnly={readOnly}
                              width="5rem"
                              name={`${deliveries}.${index}.minWeight`}
                              placeholder="Вес, кг."
                              title="Вес, кг."
                            />
                            <span>до</span>
                            <DeliveryCityInput
                              readOnly={readOnly}
                              width="5rem"
                              name={`${deliveries}.${index}.maxWeight`}
                              placeholder="Вес, кг."
                              title="Вес, кг."
                              onBlur={() => onBlur(`${deliveries}.${index}.minWeight`)}
                            />
                          </RangeWrapper>
                        </Col>
                        <Col>
                          <DeliveryCitySelect
                            readOnly={readOnly}
                            name={`${deliveries}.${index}.cityId`}
                            title="Город платной доставки"
                            placeholder="Выберите город"
                            width="12rem"
                            initialValue={initialCities[method][index]}
                            description={descriptionCity}
                            index={index}
                          />
                          <RangeWrapper>
                            <span>от</span>
                            <DeliveryCityInput
                              readOnly={readOnly}
                              width="4.5rem"
                              name={`${deliveries}.${index}.minDays`}
                              placeholder="День"
                              title="День"
                              description={descriptionDays}
                              index={index}
                            />
                            <span>до</span>
                            <DeliveryCityInput
                              readOnly={readOnly}
                              width="4.5rem"
                              name={`${deliveries}.${index}.maxDays`}
                              placeholder="День"
                              title="День"
                              onBlur={() => onBlur(`${deliveries}.${index}.minDays`)}
                            />
                          </RangeWrapper>
                          {!!index && (
                            <RemoveDeliveryCity remove={remove} index={index} method={method} />
                          )}
                        </Col>
                      </Row>
                    );
                  })}
                </CitiesList>
              </>
            )}
            {!readOnly && (
              <Button
                label="Добавить еще город доставки"
                iconType="leading"
                icon={<Icon name="plus" $color="white" />}
                shape="extra-rounded"
                size="large"
                $width="fit-content"
                testId={`add-${method}-delivery-button`}
                onClick={() => onAddDeliveryCity({ method, push })}
              />
            )}
          </>
        )}
      </FieldArray>
    </InputsWrapper>
  );
};

export default DeliveryCitiesForm;
