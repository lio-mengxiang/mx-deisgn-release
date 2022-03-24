import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
import { updateVersion, addTag, gitPush, setChangelog, publishNpm, build } from './config/constans';
import { compose, getOriginPackageJson } from './config/functions';

var getNextVersion = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(next, otherOptions) {
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
            next(_objectSpread(_objectSpread({}, otherOptions), {}, {
              nextVersion,
              originVersion: originPackageJson.version,
              originPackageJson
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getNextVersion(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getReleaseFns = {
  [updateVersion]: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(next, otherOptions) {
      var backNextVersion;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(otherOptions !== null && otherOptions !== void 0 && otherOptions.nextVersion)) {
                _context2.next = 2;
                break;
              }

              throw new Error('请传入package.json新版本号');

            case 2:
              _context2.next = 4;
              return _updateVersion(otherOptions.nextVersion, otherOptions.originPackageJson);

            case 4:
              backNextVersion = _context2.sent;
              next({
                backNextVersion
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),
  [gitPush]: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(next, otherOptions) {
      var pushResult;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _gitPush().catch(() => false);

            case 2:
              pushResult = _context3.sent;

              if (pushResult) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", otherOptions.backVersionFn());

            case 5:
              next();

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),
  [setChangelog]: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(next, otherOptions) {
      var backChangelog, setLogResult;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              backChangelog = getOldLog();
              _context4.next = 3;
              return _setChangelog().catch(() => false);

            case 3:
              setLogResult = _context4.sent;

              if (setLogResult) {
                _context4.next = 9;
                break;
              }

              backChangelog();
              _context4.next = 8;
              return otherOptions.backVersionFn();

            case 8:
              return _context4.abrupt("return", _context4.sent);

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

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),
  [build]: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(next, otherOptions) {
      var buildResult;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _build().catch(() => false);

            case 2:
              buildResult = _context5.sent;

              if (buildResult) {
                _context5.next = 6;
                break;
              }

              otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.backChangelog();
              return _context5.abrupt("return", otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.backVersionFn());

            case 6:
              next();

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }(),
  [publishNpm]: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(next, otherOptions) {
      var publishResult;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _publishNpm().catch(() => false);

            case 2:
              publishResult = _context6.sent;

              if (publishResult) {
                _context6.next = 6;
                break;
              }

              otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.backChangelog();
              return _context6.abrupt("return", otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.backVersionFn());

            case 6:
              next();

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),
  [addTag]: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(next, otherOptions) {
      var tagResult;
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _addTag(otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.nextVersion).catch(() => false);

            case 2:
              tagResult = _context7.sent;

              if (tagResult) {
                _context7.next = 6;
                break;
              }

              otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.backChangelog();
              return _context7.abrupt("return", otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.backVersionFn());

            case 6:
              next();

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }()
};
var middle = [getNextVersion];
var defaultMiddleware = [updateVersion, gitPush, setChangelog, build, publishNpm, addTag].map(node => getReleaseFns[node]);
middle.push(...defaultMiddleware);

function defaultMain() {
  return _defaultMain.apply(this, arguments);
}

function _defaultMain() {
  _defaultMain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            try {
              compose(middle);
            } catch (error) {
              console.log('💣 发布失败，失败原因：', error);
            }

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _defaultMain.apply(this, arguments);
}

export { gitPush, setChangelog, build, publishNpm, addTag };
export default defaultMain;