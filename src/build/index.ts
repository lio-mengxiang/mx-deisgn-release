import { DefaultLogger, taskPre, runAsync } from '../config/functions';

/**
 * 组件库打包
 */
export async function _build() {
  const spinner = new DefaultLogger(taskPre('准备打包', 'start'));
  await runAsync('npm run build', spinner);
  spinner.succeed(taskPre('打包完成', 'end'));
  return true;
}
