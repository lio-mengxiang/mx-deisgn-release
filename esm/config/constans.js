import pkg from "../../package.json";
export var COMMIT_REEOR_MESSAGE = "commit submit format error";
export var GIT_ADD = "git add";
export var GIT_COMMIT = "git commit";
export var GIT_PUSH = "git push";
/**
 *获取当前版本
 */

export var currentVersion = pkg.version;
export var CHANGELOG_NAME = "CHANGELOG.md";
export var updateVersion = '_updateVersion';
export var gitPush = '_gitPush';
export var setChangelog = 'setChangelog';
export var build = '_build';
export var publishNpm = '_publishNpm';
export var addTag = '_addTag';