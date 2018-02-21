import fs from 'fs';
import _ from 'lodash';

const types = [
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] === obj2[key]),
    process: (obj1, obj2, key) => `  ${key}: ${obj1[key]}`,
  },

  {
    type: 'changed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] !== obj2[key]),
    process: (obj1, obj2, key) => `+ ${key}: ${obj2[key]}\n- ${key}: ${obj1[key]}`,
  },

  {
    type: 'deleted',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    process: (obj1, obj2, key) => `- ${key}: ${obj1[key]}`,
  },

  {
    type: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    process: (obj1, obj2, key) => `+ ${key}: ${obj2[key]}`,
  },
];

export default (fileBefore, fileAfter) => {
  const objBefore = JSON.parse(fs.readFileSync(fileBefore));
  const objAfter = JSON.parse(fs.readFileSync(fileAfter));

  const keys = _.union(_.keys(objBefore), _.keys(objAfter));

  const getType = key => _.find(types, ({ check }) => check(objBefore, objAfter, key));

  const result = keys.reduce((acc, key) => {
    const handler = getType(key).process;
    return [...acc, handler(objBefore, objAfter, key)];
  }, []);

  return `{\n${result.join('\n')}\n}`;
};
