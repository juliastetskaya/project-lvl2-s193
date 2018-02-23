import _ from 'lodash';

const types = [
  {
    type: 'embedded',
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])) &&
      !(_.isArray(obj1[key]) && _.isArray(obj2[key])),
    process: (value1, value2, func) => func(value1, value2),
  },

  {
    type: 'unchanged',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] === obj2[key]),
    process: value1 => value1,
  },

  {
    type: 'changed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] !== obj2[key]),
    process: (value1, value2) => ({ old: value1, new: value2 }),
  },

  {
    type: 'deleted',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    process: value1 => value1,
  },

  {
    type: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    process: (value1, value2) => value2,
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
