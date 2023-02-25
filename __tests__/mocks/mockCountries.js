import { mockPageInfo } from './mockPageInfo';

export const mockCountries = [
  {
    id: '1',
    name: 'Россия',
  },
  {
    id: '2',
    name: 'Китай',
  },
  {
    id: '3',
    name: 'Индия',
  },
];

export const mockCountriesData = {
  countries: {
    edges: mockCountries.map(country => ({ node: country })),
    pageInfo: mockPageInfo,
    __typename: 'CountryConnection',
  },
};
