import { DefaultLogger, taskPre, runAsync } from '../config/functions';

/**
 * eslint校验
 */
export async function _eslint(srcDir, configDir) {
  const spinner = new DefaultLogger(taskPre('eslint校验中...', 'start'));
  await runAsync(`eslint ${srcDir} --ext .ts,.tsx,.js,.jsx --fix --cache --config ${configDir}`, spinner, true);
  spinner.succeed(taskPre('eslint检测通过', 'end'));
  return true;
}
