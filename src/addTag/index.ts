import { run, timeLog } from "../config/functions";

/**
 * 打tag提交至git
 */
export async function _addTag(nextVersion: string) {
  timeLog("打tag并推送至git", "start");
  run(`git tag v${nextVersion} && git push origin tag v${nextVersion}`);
  timeLog("打tag并推送至git", "end");
  return true;
}
