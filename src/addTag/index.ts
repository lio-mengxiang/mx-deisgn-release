import { DefaultLogger, runAsync, taskPre } from '../config/functions';

/**
 * 打tag提交至git
 */
export async function _addTag(nextVersion: string) {
  const spinner = new DefaultLogger(taskPre('打tag并推送至git', 'start'));
  await runAsync(`git tag v${nextVersion} && git push origin tag v${nextVersion}`, spinner);
  spinner.succeed(taskPre('打tag并推送至git', 'end'));
  return true;
}
