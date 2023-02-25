export const deliveryMethods = {
  COURIER: 'COURIER',
  DELIVERY_POINT: 'DELIVERY_POINT',
  PICKUP: 'PICKUP',
  UNAVAILABLE: 'UNAVAILABLE',
};

export const deliveryMethodsLabel = {
  [deliveryMethods.COURIER]: 'Курьер',
  [deliveryMethods.DELIVERY_POINT]: 'Терминал',
  [deliveryMethods.PICKUP]: 'Самовывоз',
};

export const deliveryServices = {
  SELLER: 'SELLER',
  SDEK: 'SDEK',
  DELLIN: 'DELLIN',
};

export const deliveryServicesLabel = {
  [deliveryServices.SELLER]: 'Служба доставки продавца',
  [deliveryServices.SDEK]: 'СДЭК',
  [deliveryServices.DELLIN]: 'Деловые Линии',
};

export const deliveryAddressDictionary = {
  [deliveryMethods.COURIER]: 'Адрес доставки',
  [deliveryMethods.DELIVERY_POINT]: 'Адрес терминала',
  [deliveryMethods.PICKUP]: 'Адрес продавца',
};

export const deliveryServiceDictionary = {
  [deliveryMethods.COURIER]: 'Служба доставки',
  [deliveryMethods.DELIVERY_POINT]: 'Служба доставки',
  [deliveryMethods.PICKUP]: 'Способ доставки',
};
