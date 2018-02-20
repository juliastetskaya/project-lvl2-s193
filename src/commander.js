import program from 'commander';

export default () => {
  program
    .version('0.1.2')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);
};
