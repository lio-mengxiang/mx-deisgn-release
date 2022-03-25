import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { run, timeLog } from "../config/functions";
/**
 * 打tag提交至git
 */

export function _addTag(_x) {
  return _addTag2.apply(this, arguments);
}

function _addTag2() {
  _addTag2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(nextVersion) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            timeLog("打tag并推送至git", "start");
            _context.next = 3;
            return run("git tag v".concat(nextVersion));

          case 3:
            _context.next = 5;
            return run("git push origin tag v".concat(nextVersion));

          case 5:
            timeLog("打tag并推送至git", "end");
            return _context.abrupt("return", true);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addTag2.apply(this, arguments);
}