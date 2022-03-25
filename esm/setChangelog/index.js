import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { timeLog, run, getProjectPath } from "../config/functions";
import fs, { existsSync } from "fs";
import { CHANGELOG_NAME } from "../config/constans";
export var getOldLog = () => {
  var logPath = getProjectPath(CHANGELOG_NAME);

  if (!existsSync(logPath)) {
    fs.writeFileSync(logPath, "");
  }

  var oldFile = fs.readFileSync(logPath);
  return () => {
    fs.writeFileSync(logPath, oldFile);
  };
};
/**
 * 生成CHANGELOG
 */

export function _setChangelog() {
  return _setChangelog2.apply(this, arguments);
}

function _setChangelog2() {
  _setChangelog2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            timeLog("生成CHANGELOG.md", "start");
            _context.next = 3;
            return run("conventional-changelog -p angular -i ".concat(CHANGELOG_NAME, " -s"));

          case 3:
            timeLog("生成CHANGELOG.md", "end");
            return _context.abrupt("return", true);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setChangelog2.apply(this, arguments);
}