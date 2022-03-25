import { run, timeLog } from "../config/functions";

/**
 * 发布至npm
 */
export async function _publishNpm() {
  timeLog("发布", "start");
  await run("npm publish --access=public");
  timeLog("发布", "end");
  return true;
}
