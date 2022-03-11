import pkg from "../../package.json";

export const COMMIT_REEOR_MESSAGE = "commit submit format error";

export const GIT_ADD = "git add";
export const GIT_COMMIT = "git commit";
export const GIT_PUSH = "git push";
/**
 *获取当前版本
 */
export const currentVersion: string = pkg.version;
export const CHANGELOG_NAME = "CHANGELOG.md";


export const updateVersion = '_updateVersion';
export const gitPush = '_gitPush';
export const setChangelog = 'setChangelog';
export const build = '_build';
export const publishNpm = '_publishNpm'
export const addTag = '_addTag'