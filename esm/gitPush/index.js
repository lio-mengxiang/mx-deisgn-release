import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { run, timeLog } from '../config/functions';
import inquirer from 'inquirer';
import { COMMIT_REEOR_MESSAGE, GIT_ADD, GIT_COMMIT, GIT_PUSH } from '../config/constans';
/**
 * 将代码提交至git
 */

export function _gitPush() {
  return _gitPush2.apply(this, arguments);
}
/**
 * 交互式选择下一个版本号
 * @export prompt
 * @return {*}  {Promise<string>}
 */

function _gitPush2() {
  _gitPush2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var commitMsg, isMath;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return checkCommit();

          case 2:
            commitMsg = _context.sent;
            isMath = /^(feat|fix|docs|style|refactor|test|chore|perf)(\(.+\))?\:\s.+/.test(commitMsg);

            if (isMath) {
              _context.next = 6;
              break;
            }

            throw new Error(COMMIT_REEOR_MESSAGE);

          case 6:
            timeLog('准备推送代码至git仓库', 'start');
            run("".concat(GIT_ADD, " . && ").concat(GIT_COMMIT, " -m \"").concat(commitMsg, "\" && ").concat(GIT_PUSH));
            timeLog('已推送代码至git仓库', 'end');
            return _context.abrupt("return", true);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _gitPush2.apply(this, arguments);
}

function checkCommit() {
  return _checkCommit.apply(this, arguments);
}

function _checkCommit() {
  _checkCommit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var _yield$inquirer$promp, commitMsg;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return inquirer.prompt([{
              type: 'string',
              name: 'commitMsg',
              message: '请输入git commit的信息，需要符合angular commit规范'
            }]);

          case 2:
            _yield$inquirer$promp = _context2.sent;
            commitMsg = _yield$inquirer$promp.commitMsg;
            return _context2.abrupt("return", commitMsg);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _checkCommit.apply(this, arguments);
}