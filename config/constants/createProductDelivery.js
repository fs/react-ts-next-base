export const shipmentMethods = {
  NONE: 'NONE',
  COURIER: 'COURIER',
  DELIVERY_POINT: 'DELIVERY_POINT',
};

export const courierServices = {
  ANY_SERVICE: 'ANY_SERVICE',
  NO_SDEK: 'NO_SDEK',
  NO_DELLIN: 'NO_DELLIN',
};

export const deliveryServices = {
  SDEK: 'SDEK',
  DELLIN: 'DELLIN',
};

export const deliveryPointFields = {
  [deliveryServices.DELLIN]: 'dellinDeliveryPoint',
  [deliveryServices.SDEK]: 'sdekDeliveryPoint',
};

export const deliveryServicesLabel = {
  SDEK: 'СДЭК',
  DELLIN: 'Деловые Линии',
};

export const workDays = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
};

export const workDaysLabel = {
  MONDAY: 'Пн',
  TUESDAY: 'Вт',
  WEDNESDAY: 'Ср',
  THURSDAY: 'Чт',
  FRIDAY: 'Пт',
  SATURDAY: 'Сб',
  SUNDAY: 'Вск',
};

export const weekdaysDictionary = {
  MONDAY: 'Понедельник',
  TUESDAY: 'Вторник',
  WEDNESDAY: 'Среда',
  THURSDAY: 'Четверг',
  FRIDAY: 'Пятница',
  SATURDAY: 'Суббота',
  SUNDAY: 'Воскресенье',
};
