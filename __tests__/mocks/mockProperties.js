import { mockPageInfo } from './mockPageInfo';

export const mockProperties = [
  {
    id: '1',
    name: 'Цвет (перчатки)',
    displayName: 'Цвет',
    categoryPath: [{ id: 1, name: 'Перчатки перчатки' }],
    canDestroy: {
      value: false,
    },
    __typename: 'DictionaryProperty',
  },
  {
    id: '2',
    name: 'Длина',
    displayName: 'Длина',
    unit: '',
    categoryPath: [{ id: 1, name: 'Перчатки перчатки' }],
    canDestroy: {
      value: false,
    },
    __typename: 'IntegerProperty',
  },
  {
    id: '3',
    name: 'Материал',
    displayName: 'Материал',
    categoryPath: [{ id: 1, name: 'Перчатки перчатки' }],
    canDestroy: {
      value: false,
    },
    __typename: 'DictionaryProperty',
  },
];

export const mockPropertiesData = {
  properties: {
    edges: mockProperties.map(property => ({ cursor: '', node: property })),
    pageInfo: mockPageInfo,
  },
};
