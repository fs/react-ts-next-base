import { mockPageInfo } from './mockPageInfo';

export const mockDellinFreightTypes = [
  {
    __typename: 'DellinFreightKindEdge',
    active: true,
    id: '130',
    name: 'Аварийные таблички',
  },
  {
    __typename: 'DellinFreightKindEdge',
    active: true,
    id: '162',
    name: 'Аппарат искусственной вентиляции легких',
  },
  {
    __typename: 'DellinFreightKindEdge',
    active: true,
    id: '168',
    name: 'Аппарат косметологический',
  },
];

export const mockDellinFreightTypesData = {
  dellinFreightTypes: {
    edges: mockDellinFreightTypes.map(type => ({ node: type, cursor: null })),
    pageInfo: mockPageInfo,
  },
};
