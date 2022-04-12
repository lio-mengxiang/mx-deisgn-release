import fs, { existsSync } from 'fs';
import { taskPre, getProjectPath, DefaultLogger, runAsync } from '../config/functions';
import { CHANGELOG_NAME } from '../config/constans';

export const getOldLog = () => {
  const logPath = getProjectPath(CHANGELOG_NAME);
  if (!existsSync(logPath)) {
    fs.writeFileSync(logPath, '');
  }
  const oldFile = fs.readFileSync(logPath);
  return () => {
    fs.writeFileSync(logPath, oldFile);
  };
};

/**
 * 生成CHANGELOG
 */
export async function _setChangelog() {
  const spinner = new DefaultLogger(taskPre('生成CHANGELOG.md', 'start'));
  await runAsync(`conventional-changelog -p angular -i ${CHANGELOG_NAME} -s`);
  spinner.succeed(taskPre('生成CHANGELOG.md', 'end'));
  return true;
}
