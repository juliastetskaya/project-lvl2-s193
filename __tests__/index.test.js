import fs from 'fs';
import genDiff from '../src';

describe('genDiff', () => {
  it('Files from task', () => {
    const actual = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
    const expected = fs.readFileSync('__tests__/__fixtures__/result_set_1.txt', 'utf8');

    expect(actual).toBe(expected);
  });

  it('My files', () => {
    const actual = genDiff('__tests__/__fixtures__/before1.json', '__tests__/__fixtures__/after1.json');
    const expected = fs.readFileSync('__tests__/__fixtures__/result_set_2.txt', 'utf8');

    expect(actual).toBe(expected);
  });
});
