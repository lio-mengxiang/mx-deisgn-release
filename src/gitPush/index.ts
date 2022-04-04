import { DefaultLogger, run, taskPre } from '../config/functions';
import inquirer from 'inquirer';
import { COMMIT_REEOR_MESSAGE, GIT_ADD, GIT_COMMIT, GIT_PUSH } from '../config/constans';

/**
 * 将代码提交至git
 */
export async function _gitPush() {
  const commitMsg = await checkCommit();
  const isMath = /^(feat|fix|docs|style|refactor|test|chore|perf)(\(.+\))?\:\s.+/.test(commitMsg);
  if (!isMath) {
    throw new Error(COMMIT_REEOR_MESSAGE);
  }
  const spinner = new DefaultLogger(taskPre('准备推送代码至git仓库', 'start'));
  const curBranchName = run('git symbolic-ref --short HEAD', spinner);
  const isExistCurBranch = run(`git branch -r | grep -w "origin/${curBranchName}"`, spinner);
  taskPre('准备推送代码至git仓库', 'start');
  run(`${GIT_ADD} .`, spinner);
  run(`${GIT_COMMIT} -m "${commitMsg}"`, spinner);
  if (isExistCurBranch) {
    run(`git push --set-upstream origin ${curBranchName}`, spinner);
  } else {
    run(`${GIT_PUSH}`, spinner);
  }
  spinner.succeed(taskPre('已推送代码至git仓库', 'end'));
  return true;
}

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
