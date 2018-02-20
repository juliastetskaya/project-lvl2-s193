import program from 'commander';
import genDiff from '.';
import { version } from '../package.json';

export default () => {
  program
    .version(version)
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .action((firstConfig, secondConfig) => {
      const diff = genDiff(firstConfig, secondConfig);
      console.log(diff);
    });

  program.parse(process.argv);
};
