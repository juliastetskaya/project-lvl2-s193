import genDiff from '../src';

describe('genDiff', () => {
  it('Files from task', () => {
    const actual = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
    const expected = '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}';

    expect(actual).toBe(expected);
  });

  it('My files', () => {
    const actual = genDiff('__tests__/__fixtures__/before1.json', '__tests__/__fixtures__/after1.json');
    const expected = '{\n- host: hexlet.io\n+ timeout: 85\n- timeout: 50\n- proxy: 123.234.53.22\n- host5: hexlet.ru\n+ verbose: true\n- verbose: false\n- ets: 33\n  play: true\n+ host6: hexlet.io\n+ etc: 33\n+ task: winter\n}';

    expect(actual).toBe(expected);
  });
});
