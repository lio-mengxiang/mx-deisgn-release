import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import _regeneratorRuntime from "@babel/runtime/regenerator";
import child_process from 'child_process';
import util from 'util';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
var exec = util.promisify(child_process.exec);
export var run = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(command) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(chalk.green(command));
            _context.next = 3;
            return exec(command);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function run(_x) {
    return _ref.apply(this, arguments);
  };
}();
export var timeLog = (logInfo, type) => {
  var info = '';

  if (type === 'start') {
    info = "=> start task\uFF1A".concat(logInfo);
  } else {
    info = "\u2728 end task\uFF1A".concat(logInfo);
  }

  console.log("[".concat(new Date().toLocaleString(), "] ").concat(info));
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
    return currMiddleware(addOptions => dispatch(++index, _objectSpread(_objectSpread({}, otherOptions), addOptions)));
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