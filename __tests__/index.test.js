import fs from 'fs';
import genDiff from '../src';

describe('genDiff', () => {
  it('JSON', () => {
    const actual = genDiff('__tests__/__fixtures__/before_tree.json', '__tests__/__fixtures__/after_tree.json');
    const expected = fs.readFileSync('__tests__/__fixtures__/result_tree.txt', 'utf8');

    expect(actual).toBe(expected);
  });

  it('YML', () => {
    const actual = genDiff('__tests__/__fixtures__/before_tree.yml', '__tests__/__fixtures__/after_tree.yml');
    const expected = fs.readFileSync('__tests__/__fixtures__/result_tree.txt', 'utf8');

    expect(actual).toBe(expected);
  });

  it('INI', () => {
    const actual = genDiff('__tests__/__fixtures__/before_tree.ini', '__tests__/__fixtures__/after_tree.ini');
    const expected = fs.readFileSync('__tests__/__fixtures__/result_tree.txt', 'utf8');

    expect(actual).toBe(expected);
  });
});
