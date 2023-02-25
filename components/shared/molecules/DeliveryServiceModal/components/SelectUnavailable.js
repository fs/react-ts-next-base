import React, { useMemo, useState } from 'react';

import Radio from 'components/shared/atoms/Radio';
import { sortByAlphabet } from 'helpers/sortByAlphabet';
import Icon from 'components/shared/atoms/Icon';
import {
  CitiesList,
  WarningText,
  CitiesWrapper,
  CitiesRadioBlock,
  BlockWrapper,
  CityTitle,
  CityItem,
} from './styled';

const types = {
  FREE: 'FREE',
  PAID: 'PAID',
};
const initialDeliveryRadio = [
  {
    disabled: false,
    label: 'Бесплатная доставка',
    type: types.FREE,
    value: types.FREE,
    tooltip: 'Нет доступных городов к бесплатной доставке от продавца',
  },
  {
    disabled: false,
    label: 'Платная доставка',
    type: types.PAID,
    value: types.PAID,
    tooltip: 'Нет доступных городов к платной доставке от продавца',
  },
];

const getListOfCities = arr => sortByAlphabet(arr.map(({ city }) => city.name));

const getCitiesList = cityArr => cityArr.map((el, idx) => <CityItem key={idx}> {el}</CityItem>);
const getRadioCityItem = (cityArr, deliveryRadioItem) =>
  cityArr.length
    ? { ...deliveryRadioItem, tooltip: null }
    : { ...deliveryRadioItem, disabled: true };

const SelectUnavailable = ({ productDeliveries }) => {
  const { productFreeDeliveries, productPaidDeliveries } = productDeliveries;

  const productFreeDeliveriesCities = getListOfCities(productFreeDeliveries);
  const productPaidDeliveriesCities = getListOfCities(productPaidDeliveries);

  const deliveryRadio = useMemo(() => {
    const [free, paid] = initialDeliveryRadio;
    return [
      getRadioCityItem(productFreeDeliveriesCities, free),
      getRadioCityItem(productPaidDeliveriesCities, paid),
    ];
  }, [productFreeDeliveriesCities, productPaidDeliveriesCities]);

  const [productDeliveryType, setProductDeliveryType] = useState(deliveryRadio[0].type);

  return (
    <BlockWrapper>
      <WarningText>
        <Icon name="exclamation-square" $color="orange" $size={30} $mr={16} />К сожалению вы не
        сможете купить этот товар, так как ваша локация вне зоны охвата службы доставки продавца.
      </WarningText>
      <CityTitle>Куда продавец доставляет этот товар:</CityTitle>
      <CitiesWrapper>
        <CitiesRadioBlock>
          <Radio
            options={deliveryRadio}
            name="deliveryMethod"
            direction="row"
            onChange={setProductDeliveryType}
            selected={productDeliveryType}
          />

          <CitiesList>
            {productDeliveryType === types.FREE && getCitiesList(productFreeDeliveriesCities)}
            {productDeliveryType === types.PAID && getCitiesList(productPaidDeliveriesCities)}
          </CitiesList>
        </CitiesRadioBlock>
      </CitiesWrapper>
    </BlockWrapper>
  );
};

export default SelectUnavailable;
