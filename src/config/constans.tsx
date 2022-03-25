import pkg from "../../package.json";

export const COMMIT_REEOR_MESSAGE = "commit format error(提交格式不符合angular提交规范)";

export const GIT_ADD = "git add";
export const GIT_COMMIT = "git commit";
export const GIT_PUSH = "git push";
/**
 *获取当前版本
 */
export const currentVersion: string = pkg.version;
export const CHANGELOG_NAME = "CHANGELOG.md";


