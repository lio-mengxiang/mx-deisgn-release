import { DefaultLogger, taskPre, runAsync } from '../config/functions';

/**
 * eslint校验
 */
export async function _stylelint(srcDir, configDir) {
  const spinner = new DefaultLogger(taskPre('stylelint校验中...', 'start'));
  await runAsync(
    `stylelint '${srcDir}**/*.less' '${srcDir}**/*.css' --fix --cache --config ${configDir}`,
    spinner,
    true,
  );
  spinner.succeed(taskPre('stylelint检测通过', 'end'));
  return true;
}
