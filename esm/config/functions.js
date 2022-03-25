import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import child_process from 'child_process';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import ora from 'ora';
var spinner = ora();
var execSync = child_process.execSync;
export var run = command => {
  execSync(command, {
    cwd: process.cwd()
  });
};
export var timeLog = (logInfo, type) => {
  if (type === 'start') {
    spinner.start("".concat(chalk.cyanBright("task start(\u5F00\u59CB\u4EFB\u52A1): ".concat(logInfo))));
  } else {
    spinner.succeed("".concat(chalk.green("task end(\u4EFB\u52A1\u7ED3\u675F): ".concat(logInfo))));
  }
}; // 获取项目文件

export var getProjectPath = function getProjectPath() {
  var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './';
  return path.join(process.cwd(), dir);
};
export function compose(middleware) {
  var otherOptions = {};

  function dispatch(index, otherOptions) {
    if (index == middleware.length) return;
    var currMiddleware = middleware[index];
    currMiddleware(addOptions => {
      dispatch(++index, _objectSpread(_objectSpread({}, otherOptions), addOptions));
    }, otherOptions).catch(error => {
      console.log('💣 发布失败，失败原因：', error);
    });
  }

  dispatch(0, otherOptions);
}
/**
 * 获取当前package.json的版本号
 */

export var getOriginPackageJson = () => {
  var packageJson = JSON.parse(fs.readFileSync(getProjectPath('package.json'), 'utf-8'));
  return packageJson;
};
/**
 * 工具函数，用来捕获并打印错误，返回false
 */

export var basicCatchError = err => {
  console.log("\r\n ".concat(chalk.red(err)));
  return false;
};