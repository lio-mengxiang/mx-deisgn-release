import child_process from 'child_process';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import ora from 'ora';

const spinner = ora()
const execSync = child_process.execSync;

export const run = (command: string) => {
  try {
    execSync(command, { cwd: process.cwd() });
  } catch (error) {
    console.log(error)
  }
};

export const timeLog = (logInfo: string, type: 'start' | 'end') => {
  if (type === 'start') {
    spinner.start( `${chalk.cyanBright(`task start(开始任务): ${logInfo}`)} \r\n`);
  } else {
    spinner.succeed(`${chalk.green(`task end(任务结束): ${logInfo}`)} \r\n`);
  }

};

// 获取项目文件
export const getProjectPath = (dir = './'): string => {
  return path.join(process.cwd(), dir);
};

export function compose(middleware) {
  const otherOptions = {};
  function dispatch(index, otherOptions) {
    if (index == middleware.length) return;
    const currMiddleware = middleware[index];
    currMiddleware((addOptions) => {
      dispatch(++index, { ...otherOptions, ...addOptions });
    }, otherOptions).catch((error) => {
      console.log('💣 发布失败，失败原因：', error);
    });
  }
  dispatch(0, otherOptions);
}

/**
 * 获取当前package.json的版本号
 */
export const getOriginPackageJson = (): Record<string, any> => {
  const packageJson = JSON.parse(fs.readFileSync(getProjectPath('package.json'), 'utf-8'));
  return packageJson;
};

/**
 * 工具函数，用来捕获并打印错误，返回false
 */
export const basicCatchError = (err: Error) => {
  console.log(`\r\n ${chalk.red(err)}`);
  return false;
};
