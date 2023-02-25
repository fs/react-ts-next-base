const mockDeliveryMethods = {
  __typename: 'DeliveryMethods',
  courier: [
    {
      __typename: 'CourierDeliveryMethod',
      available: true,
      endDate: '2022-01-16',
      error: null,
      price: 2200,
      service: 'SELLER',
      startDate: '2022-01-16',
    },
    {
      __typename: 'CourierDeliveryMethod',
      available: false,
      endDate: '2022-01-16',
      error: null,
      price: null,
      service: 'SDEK',
      startDate: null,
    },
    {
      __typename: 'CourierDeliveryMethod',
      available: false,
      endDate: '2022-01-16',
      error: null,
      price: null,
      service: 'DELLIN',
      startDate: null,
    },
  ],
  deliveryPoint: [
    {
      __typename: 'PointDeliveryMethod',
      available: false,
      deliveryPoints: [],
      endDate: '2022-01-16',
      error: null,
      price: null,
      service: 'SDEK',
      startDate: null,
    },
    {
      __typename: 'PointDeliveryMethod',
      available: false,
      deliveryPoints: [
        {
          __typename: 'DeliveryPoint',
          address: '420095, Татарстан Респ, Казань г, Восстания ул, дом № 100',
          id: '266',
          openingHours: [
            {
              endTime: {
                hour: 0,
                minute: 0,
              },
              startTime: {
                hour: 0,
                minute: 0,
              },
              weekday: 'MONDAY',
            },
            {
              endTime: {
                hour: 0,
                minute: 0,
              },
              startTime: {
                hour: 0,
                minute: 0,
              },
              weekday: 'TUESDAY',
            },
            {
              endTime: {
                hour: 0,
                minute: 0,
              },
              startTime: {
                hour: 0,
                minute: 0,
              },
              weekday: 'WEDNESDAY',
            },
            {
              endTime: {
                hour: 0,
                minute: 0,
              },
              startTime: {
                hour: 0,
                minute: 0,
              },
              weekday: 'THURSDAY',
            },
            {
              endTime: {
                hour: 0,
                minute: 0,
              },
              startTime: {
                hour: 0,
                minute: 0,
              },
              weekday: 'FRIDAY',
            },
            {
              endTime: {
                hour: 0,
                minute: 0,
              },
              startTime: {
                hour: 0,
                minute: 0,
              },
              weekday: 'SATURDAY',
            },
            {
              endTime: {
                hour: 0,
                minute: 0,
              },
              startTime: {
                hour: 0,
                minute: 0,
              },
              weekday: 'SUNDAY',
            },
          ],
          phones: ['7 (843) 567-11-88'],
        },
        {
          __typename: 'DeliveryPoint',
          address: '420073, Татарстан Респ, Казань г, Аделя Кутуя ул, дом № 151',
          id: '28',
          openingHours: [
            {
              endTime: {
                hour: 20,
                minute: 0,
              },
              startTime: {
                hour: 8,
                minute: 0,
              },
              weekday: 'MONDAY',
            },
            {
              endTime: {
                hour: 20,
                minute: 0,
              },
              startTime: {
                hour: 8,
                minute: 0,
              },
              weekday: 'TUESDAY',
            },
            {
              endTime: {
                hour: 20,
                minute: 0,
              },
              startTime: {
                hour: 8,
                minute: 0,
              },
              weekday: 'WEDNESDAY',
            },
            {
              endTime: {
                hour: 20,
                minute: 0,
              },
              startTime: {
                hour: 8,
                minute: 0,
              },
              weekday: 'THURSDAY',
            },
            {
              endTime: {
                hour: 20,
                minute: 0,
              },
              startTime: {
                hour: 8,
                minute: 0,
              },
              weekday: 'FRIDAY',
            },
            {
              endTime: {
                hour: 18,
                minute: 0,
              },
              startTime: {
                hour: 9,
                minute: 0,
              },
              weekday: 'SATURDAY',
            },
            {
              endTime: {
                hour: 16,
                minute: 0,
              },
              startTime: {
                hour: 10,
                minute: 0,
              },
              weekday: 'SUNDAY',
            },
          ],
          phones: ['7 (843) 567-11-88'],
        },
      ],
      endDate: '2022-01-16',
      error: null,
      price: null,
      service: 'DELLIN',
      startDate: null,
    },
  ],
  pickup: {
    __typename: 'PickupDeliveryMethod',
    available: true,
  },
};

export default mockDeliveryMethods;
