import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

/*
 * 部署函数，提供有如下功能
 * 版本更新
 * 推送至 git 仓库
 * 组件库打包
 * 发布至 npm
 * 生成 CHANGELOG
 * 打 tag 并推送至 git
 */
import { _updateVersion, _selectNextVersion } from './selectNextVersion';
import { _gitPush } from './gitPush';
import { getOldLog, _setChangelog } from './setChangelog';
import { _build } from './build';
import { _publishNpm } from './publishNpm';
import { _addTag } from './addTag';
import './config/constans';
import { compose, getOriginPackageJson, basicCatchError } from './config/functions';

var getNextVersion = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(next) {
    var nextVersion, originPackageJson;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _selectNextVersion();

          case 2:
            nextVersion = _context.sent;
            originPackageJson = getOriginPackageJson();
            next({
              nextVersion,
              originVersion: originPackageJson.version,
              originPackageJson
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getNextVersion(_x) {
    return _ref.apply(this, arguments);
  };
}();

var updateVersion = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(next, otherOptions) {
    var backVersionFn;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (otherOptions !== null && otherOptions !== void 0 && otherOptions.nextVersion) {
              _context2.next = 2;
              break;
            }

            throw new Error('请传入package.json新版本号');

          case 2:
            _context2.next = 4;
            return _updateVersion(otherOptions.nextVersion, otherOptions.originPackageJson).catch(basicCatchError);

          case 4:
            backVersionFn = _context2.sent;
            next({
              backVersionFn
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateVersion(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var gitPush = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(next, otherOptions) {
    var pushResult, _otherOptions$backVer;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _gitPush().catch(basicCatchError);

          case 2:
            pushResult = _context3.sent;

            if (!pushResult) {
              otherOptions === null || otherOptions === void 0 ? void 0 : (_otherOptions$backVer = otherOptions.backVersionFn) === null || _otherOptions$backVer === void 0 ? void 0 : _otherOptions$backVer.call(otherOptions);
              process.exit(1);
            }

            next();

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function gitPush(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var setChangelog = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(next, otherOptions) {
    var backChangelog, setLogResult;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            backChangelog = getOldLog();
            _context4.next = 3;
            return _setChangelog().catch(basicCatchError);

          case 3:
            setLogResult = _context4.sent;

            if (setLogResult) {
              _context4.next = 9;
              break;
            }

            backChangelog();
            _context4.next = 8;
            return otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.backVersionFn();

          case 8:
            process.exit(1);

          case 9:
            next({
              backChangelog
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function setChangelog(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var build = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(next, otherOptions) {
    var buildResult;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _build().catch(basicCatchError);

          case 2:
            buildResult = _context5.sent;

            if (buildResult) {
              _context5.next = 7;
              break;
            }

            _context5.next = 6;
            return otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.backVersionFn();

          case 6:
            process.exit(1);

          case 7:
            next();

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function build(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var publishNpm = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(next) {
    var publishResult;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _publishNpm().catch(basicCatchError);

          case 2:
            publishResult = _context6.sent;

            if (!publishResult) {
              process.exit(1);
            }

            next();

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function publishNpm(_x10) {
    return _ref6.apply(this, arguments);
  };
}();

var addTag = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(next, otherOptions) {
    var addTagResult;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _addTag(otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.nextVersion).catch(basicCatchError);

          case 2:
            addTagResult = _context7.sent;

            if (!addTagResult) {
              process.exit(1);
            }

            next();

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function addTag(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

var middle = [getNextVersion, updateVersion, gitPush, setChangelog, build, publishNpm, addTag];

function defaultMain() {
  return _defaultMain.apply(this, arguments);
}

function _defaultMain() {
  _defaultMain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            compose(middle);

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _defaultMain.apply(this, arguments);
}

export { getNextVersion, gitPush, setChangelog, build, publishNpm, addTag, updateVersion, compose };
export default defaultMain;