import inquirer from 'inquirer';
import { DefaultLogger, taskPre, runAsync, runSync } from '../config/functions';
import { COMMIT_REEOR_MESSAGE, GIT_ADD, GIT_COMMIT, GIT_PUSH } from '../config/constans';

/**
 * 交互式选择下一个版本号
 * @export prompt
 * @return {*}  {Promise<string>}
 */
async function checkCommit(): Promise<string> {
  const { commitMsg } = await inquirer.prompt([
    {
      type: 'string',
      name: 'commitMsg',
      message: '请输入git commit的信息，需要符合angular commit规范',
    },
  ]);
  return commitMsg;
}

/**
 * 校验commit信息是否正确
 */
function isMathCommit(commitMsg) {
  const isMath = /^(feat|fix|docs|style|refactor|test|chore|perf)(\(.+\))?:\s.+/.test(commitMsg);
  if (!isMath) {
    throw new Error(COMMIT_REEOR_MESSAGE);
  }
}

/**
 * 将代码提交至git
 */
export async function _gitPush() {
  const commitMsg = await checkCommit();
  isMathCommit(commitMsg);

  const spinner = new DefaultLogger(taskPre('准备推送代码至git仓库', 'start'));
  const curBranchName = runSync('git symbolic-ref --short HEAD', spinner);
  const isExistCurBranch = runSync(`git branch -r | grep -w "origin/${curBranchName}"`, spinner);

  await runAsync(`${GIT_ADD} .`, spinner);
  await runAsync(`${GIT_COMMIT} -m "${commitMsg}"`, spinner);
  if (isExistCurBranch) {
    await runAsync(`git push --set-upstream origin ${curBranchName}`, spinner);
  } else {
    await runAsync(`${GIT_PUSH}`, spinner);
  }

  spinner.succeed(taskPre('已推送代码至git仓库', 'end'));
  return true;
}
