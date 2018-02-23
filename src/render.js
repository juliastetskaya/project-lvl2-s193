import _ from 'lodash';

const handlers = {
  unchanged: (key, value, spaces) => `${' '.repeat(spaces)}${key}: ${value.newValue}`,
  changed: (key, value, spaces) => `${' '.repeat(spaces - 2)}- ${key}: ${value.oldValue}\n${' '.repeat(spaces - 2)}+ ${key}: ${value.newValue}`,
  deleted: (key, value, spaces) => `${' '.repeat(spaces - 2)}- ${key}: ${value.oldValue}`,
  added: (key, value, spaces) => `${' '.repeat(spaces - 2)}+ ${key}: ${value.newValue}`,
  embedded: (key, value, spaces, func) => `${' '.repeat(spaces)}${key}: {\n${func(value, spaces + 4).join('\n')}\n${' '.repeat(spaces)}}`,
};

const toStringObj = (value, spaces) => {
  const str = Object.keys(value).map(key => `${' '.repeat(spaces + 4)}${key}: ${value[key]}`).join('\n');
  return `{\n${str}\n${' '.repeat(spaces)}}`;
};

const correctValue = (value, spaces) => (_.isObject(value) ? toStringObj(value, spaces) : value);

export default (ast) => {
  const iter = (tree, spaces) => tree.reduce((acc, element) => {
    const { type, key, value } = element;
    const handler = handlers[type];
    if (type === 'embedded') {
      return [...acc, handler(key, value, spaces, iter)];
    }
    const newValue = correctValue(value.newValue, spaces);
    const oldValue = correctValue(value.oldValue, spaces);
    return [...acc, handler(key, { oldValue, newValue }, spaces, iter)];
  }, []);
  return iter(ast, 4);
};
