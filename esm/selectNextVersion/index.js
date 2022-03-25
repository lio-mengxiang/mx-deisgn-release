import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import _regeneratorRuntime from "@babel/runtime/regenerator";
import semverInc from 'semver/functions/inc';
import { currentVersion } from '../config/constans';
import inquirer from 'inquirer';
import fs from 'fs';
import { getProjectPath, run, timeLog } from '../config/functions';
/**
 * 列出所有下一个版本的列表
 * @return {*}  {({ [key in ReleaseType]: string | null })}
 */

var getNextVersions = () => ({
  major: semverInc(currentVersion, 'major'),
  minor: semverInc(currentVersion, 'minor'),
  patch: semverInc(currentVersion, 'patch'),
  premajor: semverInc(currentVersion, 'premajor'),
  preminor: semverInc(currentVersion, 'preminor'),
  prepatch: semverInc(currentVersion, 'prepatch'),
  prerelease: semverInc(currentVersion, 'prerelease')
});
/**
 * 交互式选择下一个版本号
 * @export prompt
 * @return {*}  {Promise<string>}
 */


export function _selectNextVersion() {
  return _selectNextVersion2.apply(this, arguments);
}
/**
 * 更新版本号
 * @param nextVersion 新版本号
 */

function _selectNextVersion2() {
  _selectNextVersion2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var nextVersions, _yield$inquirer$promp, nextVersion;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            nextVersions = getNextVersions();
            _context.next = 3;
            return inquirer.prompt([{
              type: 'list',
              name: 'nextVersion',
              message: "\u8BF7\u9009\u62E9\u5C06\u8981\u53D1\u5E03\u7684\u7248\u672C (\u5F53\u524D\u7248\u672C ".concat(currentVersion, ")"),
              choices: Object.keys(nextVersions).map(level => ({
                name: "".concat(level, " => ").concat(nextVersions[level]),
                value: nextVersions[level]
              }))
            }]);

          case 3:
            _yield$inquirer$promp = _context.sent;
            nextVersion = _yield$inquirer$promp.nextVersion;
            return _context.abrupt("return", nextVersion);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _selectNextVersion2.apply(this, arguments);
}

export function _updateVersion(_x, _x2) {
  return _updateVersion2.apply(this, arguments);
}

function _updateVersion2() {
  _updateVersion2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(nextVersion, originPackageJson) {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            timeLog('开始修改package.json版本号', 'start');
            fs.writeFileSync(getProjectPath('package.json'), JSON.stringify(_objectSpread(_objectSpread({}, originPackageJson), {}, {
              version: nextVersion
            })));
            _context3.next = 4;
            return run('npx prettier package.json --write');

          case 4:
            timeLog('已经完成修改package.json版本号', 'end');
            return _context3.abrupt("return", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      fs.writeFileSync(getProjectPath('package.json'), JSON.stringify(originPackageJson));
                      _context2.next = 3;
                      return run('npx prettier package.json --write');

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _updateVersion2.apply(this, arguments);
}