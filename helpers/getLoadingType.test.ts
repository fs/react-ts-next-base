import { getLoadingType } from './getLoadingType';

const cases = [
  { networkStatus: 1, expected: { loading: true, loadingMore: false } },
  { networkStatus: 2, expected: { loading: true, loadingMore: false } },
  { networkStatus: 3, expected: { loading: false, loadingMore: true } },
];

describe('getLoadingType', () => {
  test.each(cases)('$expected', ({ networkStatus, expected }) => {
    const result = getLoadingType(networkStatus);

    expect(result).toStrictEqual(expected);
  });
});
