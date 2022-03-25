import child_process from 'child_process';
import util from 'util';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import ora from 'ora';

const spinner = ora('Loading...')
const exec = util.promisify(child_process.exec);

export const run = async (command: string) => {
  await exec(command, { cwd: process.cwd() });
};

export const timeLog = (logInfo: string, type: 'start' | 'end') => {
  if (type === 'start') {
    spinner.start( `${chalk.yellow(`task start(开始任务): ${logInfo}`)}`);
  } else {
    spinner.succeed(`${chalk.yellow(`task end(任务结束): ${logInfo}`)}`);
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
  console.log(chalk.red(err));
  return false;
};
