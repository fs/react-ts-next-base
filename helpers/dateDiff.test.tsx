import { dateDiff } from './dateDiff';

const cases = [
  { start: '2022-11-28T00:00:00Z', end: '2022-11-27T20:45:06Z', expected: '0 минут' },
  { start: '2022-11-28T00:00:00Z', end: '2022-11-27T00:00:00Z', expected: '0 минут' },
  { start: '2022-11-28T00:00:00Z', end: '2022-11-28T00:00:00Z', expected: '0 минут' },
  { start: '2022-11-28T00:00:00Z', end: '2022-11-28T00:59:00Z', expected: '59 минут' },
  { start: '2022-11-28T00:00:00Z', end: '2022-11-28T01:00:00Z', expected: '1 час' },
  { start: '2022-11-28T00:00:00Z', end: '2022-11-28T23:01:00Z', expected: '23 часа 1 минута' },
  { start: '2022-11-28T00:00:00Z', end: '2022-11-28T23:59:00Z', expected: '23 часа 59 минут' },
  { start: '2022-11-28T00:00:00Z', end: '2022-11-29T00:00:00Z', expected: '1 день' },
  { start: '2022-11-28T00:00:00Z', end: '2022-11-30T23:00:00Z', expected: '2 дня 23 часа' },
];
describe('dateDiff', () => {
  test.each(cases)('$expected', ({ start, end, expected }) => {
    const diff = dateDiff({
      start: new Date(start),
      end: new Date(end),
    });

    expect(diff).toBe(expected);
  });
});
