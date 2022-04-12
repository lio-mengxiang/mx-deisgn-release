import { DefaultLogger, taskPre, runAsync } from '../config/functions';

/**
 * 发布至npm
 */
export async function _publishNpm() {
  const spinner = new DefaultLogger(taskPre('发布', 'start'));
  await runAsync('npm publish --access public', spinner, true);
  spinner.succeed(taskPre('发布完成', 'end'));
  return true;
}
