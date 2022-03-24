import { run, timeLog } from '../config/functions';
import inquirer from 'inquirer';
import {
  COMMIT_REEOR_MESSAGE,
  GIT_ADD,
  GIT_COMMIT,
  GIT_PUSH,
} from '../config/constans';

/**
 * 将代码提交至git
 */
export async function _gitPush() {
  timeLog('准备推送代码至git仓库', 'start');
  await run(`${GIT_ADD} .`);
  const commitMsg = await checkCommit();
  const isMath =
    /^(feat|fix|docs|style|refactor|test|chore|perf)(\(.+\))?\:.+/.test(
      commitMsg
    );
  if (!isMath) {
    console.log(COMMIT_REEOR_MESSAGE);
    throw new Error();
  }
  await run(`${GIT_COMMIT} -m "${commitMsg}"`);
  await run(GIT_PUSH);
  timeLog('已推送代码至git仓库', 'end');
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
