import { DefaultLogger, taskPre, runAsync } from '../config/functions';

/**
 * 发布至npm
 */
export async function _publishNpm() {
  const spinner = new DefaultLogger(taskPre('发布', 'start'));
  await runAsync('npm publish --access=public');
  spinner.succeed(taskPre('发布', 'end'));
  return true;
}
