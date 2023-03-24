import { parseQueryParam, parseSearchQuery } from './parseQuery';

const cases = [
  { param: 'test', expected: 'test' },
  { param: ['test'], expected: '' },
  { param: undefined, expected: '' },
];

describe('parseQueryParam', () => {
  test.each(cases)('$param should be $expected', ({ param, expected }) => {
    const result = parseQueryParam(param);

    expect(result).toBe(expected);
  });
});

const queryCases = [
  { query: 'test', expected: 'test' },
  { query: ['test'], expected: null },
  { query: undefined, expected: null },
];

describe('parseSearchQuery', () => {
  test.each(queryCases)('$query should be $expected', ({ query, expected }) => {
    const result = parseSearchQuery(query);

    expect(result).toBe(expected);
  });
});
