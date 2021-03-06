import semverInc from 'semver/functions/inc';
import { ReleaseType } from 'semver';
import inquirer from 'inquirer';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { getOriginPackageJson, getProjectPath, taskPre, DefaultLogger } from '../config/functions';

const currentVersion = getOriginPackageJson()?.version;
/**
 * 列出所有下一个版本的列表
 * @return {*}  {({ [key in ReleaseType]: string | null })}
 */
// eslint-disable-next-line no-unused-vars
const getNextVersions = (): { [key in ReleaseType]: string | null } => {
  return {
    major: semverInc(currentVersion, 'major'),
    minor: semverInc(currentVersion, 'minor'),
    patch: semverInc(currentVersion, 'patch'),
    premajor: semverInc(currentVersion, 'premajor'),
    preminor: semverInc(currentVersion, 'preminor'),
    prepatch: semverInc(currentVersion, 'prepatch'),
    prerelease: semverInc(currentVersion, 'prerelease'),
  };
};

/**
 * 交互式选择下一个版本号
 * @export prompt
 * @return {*}  {Promise<string>}
 */
export async function _selectNextVersion(): Promise<string> {
  const nextVersions = getNextVersions();
  const { nextVersion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nextVersion',
      message: `请选择将要发布的版本 (当前版本 ${currentVersion})`,
      choices: (Object.keys(nextVersions) as Array<ReleaseType>).map((level) => ({
        name: `${level} => ${nextVersions[level]}`,
        value: nextVersions[level],
      })),
    },
  ]);
  return nextVersion;
}

/**
 * 更新版本号
 * @param nextVersion 新版本号
 */
export async function _updateVersion(nextVersion: string, originPackageJson) {
  const spinner = new DefaultLogger(taskPre('开始修改package.json版本号', 'start'));
  await writeFile(
    getProjectPath('package.json'),
    JSON.stringify({ ...originPackageJson, version: nextVersion }, null, 2),
  );
  spinner.succeed(taskPre('已经完成修改package.json版本号', 'end'));
  return async () => {
    fs.writeFileSync(getProjectPath('package.json'), JSON.stringify(originPackageJson, null, 2));
    console.log('There was an error and version is being rolled back.(流程出现错误，正在回退版本)');
  };
}
