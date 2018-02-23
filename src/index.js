import fs from 'fs';
import path from 'path';
import getAst from './ast';
import parsers from './parsers';
import render from './render';

export default (fileBefore, fileAfter) => {
  const dataBefore = fs.readFileSync(fileBefore, 'utf8');
  const dataAfter = fs.readFileSync(fileAfter, 'utf8');

  const fileExtention = path.extname(fileBefore).substr(1);

  const objBefore = parsers(fileExtention)(dataBefore);
  const objAfter = parsers(fileExtention)(dataAfter);

  const ast = getAst(objBefore, objAfter);

  return `{\n${render(ast).join('\n')}\n}`;
};
