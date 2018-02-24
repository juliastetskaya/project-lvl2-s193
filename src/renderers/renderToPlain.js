import _ from 'lodash';

const handlers = {
  unchanged: () => '',
  changed: (key, newValue, oldValue) => `Property '${key}' was updated. From ${oldValue} to ${newValue}.`,
  deleted: key => `Property '${key}' was removed.`,
  added: (key, newValue) => `Property '${key}' was added with ${(newValue === 'complex value') ? newValue : `value: ${newValue}`}.`,
  embedded: (key, value, func) => func(key, value),
};

const isComplexValue = value => (_.isObject(value) ? 'complex value' : `'${value}'`);

export default (ast) => {
  const iter = (startKey, tree) => tree.map((element) => {
    const { type, key, value } = element;
    const handler = handlers[type];
    const fullKey = (startKey) ? `${startKey}.${key}` : key;
    if (type === 'embedded') {
      return handler(fullKey, value, iter);
    }
    const oldValue = isComplexValue(value.oldValue);
    const newValue = isComplexValue(value.newValue);
    return handler(fullKey, newValue, oldValue);
  }).filter(current => current).join('\n');
  return iter('', ast);
};
