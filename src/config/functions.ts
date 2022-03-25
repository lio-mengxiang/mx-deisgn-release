import child_process from 'child_process';
import util from 'util';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

const exec = util.promisify(child_process.exec);

export const run = async (command: string) => {
  console.log(chalk.green(command));
  await exec(command);
};

export const timeLog = (logInfo: string, type: 'start' | 'end') => {
  let info = '';
  if (type === 'start') {
    info = `=> start task：${logInfo}`;
  } else {
    info = `✨ end task：${logInfo}`;
  }
  console.log(`[${new Date().toLocaleString()}] ${info}`);
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
    return currMiddleware((addOptions) => {
      dispatch(++index, { ...otherOptions, ...addOptions });
    }, otherOptions);
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
}
