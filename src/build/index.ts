import { run, timeLog } from "../config/functions";

/**
 * 组件库打包
 */
export async function _build() {
  timeLog("准备打包", "start");
  run("npm run build");
  timeLog("打包完成", "end");
  return true;
}
