import _ from 'lodash';

const types = [
  {
    type: 'embedded',
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])) &&
      !(_.isArray(obj1[key]) && _.isArray(obj2[key])),
    process: (first, second, func) => func(first, second),
  },

  {
    type: 'unchanged',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] === obj2[key]),
    process: (first, second) => ({ oldValue: first, newValue: second }),
  },

  {
    type: 'changed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] !== obj2[key]),
    process: (first, second) => ({ oldValue: first, newValue: second }),
  },

  {
    type: 'deleted',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    process: (first, second) => ({ oldValue: first, newValue: second }),
  },

  {
    type: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    process: (first, second) => ({ oldValue: first, newValue: second }),
  },
];

const getAst = (firstObj, secondObj) => {
  const keys = _.union(_.keys(firstObj), _.keys(secondObj));
  return keys.map((key) => {
    const { type, process } = _.find(types, ({ check }) => check(firstObj, secondObj, key));
    const value = process(firstObj[key], secondObj[key], getAst);
    return { type, key, value };
  });
};

export default getAst;
