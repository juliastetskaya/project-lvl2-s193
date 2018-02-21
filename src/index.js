import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

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

const parsers = {
  json: data => JSON.parse(data),
  yml: data => yaml.safeLoad(data),
  ini: data => ini.parse(data),
};

export default (fileBefore, fileAfter) => {
  const dataBefore = fs.readFileSync(fileBefore, 'utf8');
  const dataAfter = fs.readFileSync(fileAfter, 'utf8');

  const fileExtention = _.last(_.words(fileBefore));

  const objBefore = parsers[fileExtention](dataBefore);
  const objAfter = parsers[fileExtention](dataAfter);

  const keys = _.union(_.keys(objBefore), _.keys(objAfter));

  const getType = key => _.find(types, ({ check }) => check(objBefore, objAfter, key));

  const result = keys.reduce((acc, key) => {
    const handler = getType(key).process;
    return [...acc, handler(objBefore, objAfter, key)];
  }, []);

  return `{\n${result.join('\n')}\n}`;
};
