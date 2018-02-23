import _ from 'lodash';

const isValueObj = (value, type) => (_.isObject(value) && type !== 'embedded' && type !== 'changed');

const toStringObj = (value, spaces) => {
  const str = Object.keys(value).map(key => `${' '.repeat(spaces + 4)}${key}: ${value[key]}`).join('\n');
  return `{\n${str}\n${' '.repeat(spaces)}}`;
};

const handlers = {
  unchanged: (key, value, spaces) => `${' '.repeat(spaces)}${key}: ${value}`,
  changed: (key, value, spaces) => {
    const newValue = _.isObject(value.new) ? toStringObj(value.new, spaces) : value.new;
    const oldValue = _.isObject(value.old) ? toStringObj(value.old, spaces) : value.old;
    return `${' '.repeat(spaces - 2)}- ${key}: ${oldValue}\n${' '.repeat(spaces - 2)}+ ${key}: ${newValue}`;
  },
  deleted: (key, value, spaces) => `${' '.repeat(spaces - 2)}- ${key}: ${value}`,
  added: (key, value, spaces) => `${' '.repeat(spaces - 2)}+ ${key}: ${value}`,
  embedded: (key, value, spaces, func) => `${' '.repeat(spaces)}${key}: {\n${func(value, spaces + 4).join('\n')}\n${' '.repeat(spaces)}}`,
};

export default (ast) => {
  const iter = (tree, spaces) => tree.reduce((acc, element) => {
    const { type, key, value } = element;
    const newValue = isValueObj(value, type) ? toStringObj(value, spaces) : value;
    const handler = handlers[type];
    return [...acc, handler(key, newValue, spaces, iter)];
  }, []);
  return iter(ast, 4);
};
