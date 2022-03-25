import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { run, timeLog } from "../config/functions";
/**
 * 发布至npm
 */

export function _publishNpm() {
  return _publishNpm2.apply(this, arguments);
}

function _publishNpm2() {
  _publishNpm2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            timeLog("发布", "start");
            run("npm publish --access=public");
            timeLog("发布", "end");
            return _context.abrupt("return", true);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _publishNpm2.apply(this, arguments);
}