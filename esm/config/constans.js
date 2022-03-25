import pkg from "../../package.json";
export var COMMIT_REEOR_MESSAGE = "commit format error(提交格式不符合angular提交规范)";
export var GIT_ADD = "git add";
export var GIT_COMMIT = "git commit";
export var GIT_PUSH = "git push";
/**
 *获取当前版本
 */

export var currentVersion = pkg.version;
export var CHANGELOG_NAME = "CHANGELOG.md";