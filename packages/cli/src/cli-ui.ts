// Enhance CLI output with colors and modern UI elements
import chalk from 'chalk';
import boxen from 'boxen';

export function printHeader(title: string) {
  console.log(
    boxen(chalk.cyan.bold(title), {
      padding: 1,
      borderColor: 'cyan',
      borderStyle: 'round',
      margin: 1,
      align: 'center',
    })
  );
}

export function printSuccess(msg: string) {
  console.log(chalk.green('✔ ' + msg));
}

export function printError(msg: string) {
  console.log(chalk.red('✖ ' + msg));
}

export function printInfo(msg: string) {
  console.log(chalk.blue('ℹ ' + msg));
}

export function printWarning(msg: string) {
  console.log(chalk.yellow('⚠ ' + msg));
}

export function printDebug(msg: string) {
  console.log(chalk.gray('🐛 ' + msg));
}

export function printStep(step: number, total: number, msg: string) {
  console.log(chalk.cyan(`[${step}/${total}] `) + msg);
}

export function printProgress(msg: string) {
  console.log(chalk.magenta('⏳ ' + msg));
}
