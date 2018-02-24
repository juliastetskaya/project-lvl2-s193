import fs from 'fs';
import genDiff from '../src';

describe('genDiff', () => {
  it('TREE', () => {
    const actual = genDiff('__tests__/__fixtures__/before_tree.json', '__tests__/__fixtures__/after_tree.json', 'tree');
    const expected = fs.readFileSync('__tests__/__fixtures__/result_tree.txt', 'utf8');

    expect(actual).toBe(expected);
  });

  it('PLAIN', () => {
    const actual = genDiff('__tests__/__fixtures__/before_tree.json', '__tests__/__fixtures__/after_tree.json', 'plain');
    const expected = fs.readFileSync('__tests__/__fixtures__/result_plain.txt', 'utf8');

    expect(actual).toBe(expected);
  });
});
