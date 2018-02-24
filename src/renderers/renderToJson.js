const handlers = {
  unchanged: ({ type, value }) => ({ type, value: value.oldValue }),
  changed: ({ type, value }) => ({ type, values: value }),
  deleted: ({ type, value }) => ({ type, value: value.oldValue }),
  added: ({ type, value }) => ({ type, value: value.newValue }),
  embedded: ({ type, value }, func) => ({ type, value: func(value) }),
};

export default (ast) => {
  const iter = tree => tree.reduce((acc, element) => {
    const { type, key } = element;
    const handler = handlers[type];
    return ({ ...acc, [key]: handler(element, iter) });
  }, {});
  return JSON.stringify(iter(ast), null, 2);
};
