import _ from 'lodash';

const handlers = {
  unchanged: (key, spaces, oldValue) => `${' '.repeat(spaces)}${key}: ${oldValue}`,
  changed: (key, spaces, oldValue, newValue) => [`${' '.repeat(spaces - 2)}- ${key}: ${oldValue}`, `${' '.repeat(spaces - 2)}+ ${key}: ${newValue}`],
  deleted: (key, spaces, oldValue) => `${' '.repeat(spaces - 2)}- ${key}: ${oldValue}`,
  added: (key, spaces, oldValue, newValue) => `${' '.repeat(spaces - 2)}+ ${key}: ${newValue}`,
  embedded: (key, value, spaces, func) => `${' '.repeat(spaces)}${key}: {\n${_.flatten(func(value, spaces + 4)).join('\n')}\n${' '.repeat(spaces)}}`,
};

const toStringObj = (value, spaces) => {
  const str = Object.keys(value).map(key => `${' '.repeat(spaces + 4)}${key}: ${value[key]}`).join('\n');
  return `{\n${str}\n${' '.repeat(spaces)}}`;
};

const isObjValue = (value, spaces) => (_.isObject(value) ? toStringObj(value, spaces) : value);

export default (ast) => {
  const iter = (tree, spaces) => tree.map((element) => {
    const { type, key, value } = element;
    const handler = handlers[type];
    if (type === 'embedded') {
      return handler(key, value, spaces, iter);
    }
    const newValue = isObjValue(value.newValue, spaces);
    const oldValue = isObjValue(value.oldValue, spaces);
    return handler(key, spaces, oldValue, newValue);
  });
  return `{\n${_.flatten(iter(ast, 4)).join('\n')}\n}`;
};
