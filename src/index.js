import fs from 'fs';

const isIncludes = (key, obj) => Object.keys(obj).includes(key);

export default (fileBefore, fileAfter) => {
  const objBefore = JSON.parse(fs.readFileSync(fileBefore));
  const objAfter = JSON.parse(fs.readFileSync(fileAfter));

  const options = {
    keyNoChanges: key => isIncludes(key, objBefore) && isIncludes(key, objAfter),
    keyDeleted: key => isIncludes(key, objBefore) && !isIncludes(key, objAfter),
    keyAdded: key => !isIncludes(key, objBefore) && isIncludes(key, objAfter),
  };

  const handlers = {
    keyNoChanges: key => ((objBefore[key] === objAfter[key]) ? `  ${key}: ${objBefore[key]}` : `+ ${key}: ${objAfter[key]}\n- ${key}: ${objBefore[key]}`),
    keyDeleted: key => `- ${key}: ${objBefore[key]}`,
    keyAdded: key => `+ ${key}: ${objAfter[key]}`,
  };

  const getOption = key => Object.keys(options).filter(option => options[option](key))[0];

  const allKeys = Object.keys({ ...objBefore, ...objAfter });

  const result = allKeys.reduce((acc, key) => {
    const option = getOption(key);
    const handler = handlers[option];
    return `${acc}\n${handler(key)}`;
  }, '');

  return `{${result}\n}`;
};
