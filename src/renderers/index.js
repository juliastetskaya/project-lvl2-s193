import renderToTree from './renderToTree';
import renderToPlain from './renderToPlain';
import renderToJson from './renderToJson';

const renderers = {
  tree: renderToTree,
  plain: renderToPlain,
  json: renderToJson,
};

export default format => renderers[format];
