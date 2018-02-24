import renderToTree from './renderToTree';
import renderToPlain from './renderToPlain';

const renderers = {
  tree: renderToTree,
  plain: renderToPlain,
};

export default format => renderers[format];
