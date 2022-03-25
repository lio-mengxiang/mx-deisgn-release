/*
 * 部署函数，提供有如下功能
 * 版本更新
 * 推送至 git 仓库
 * 组件库打包
 * 发布至 npm
 * 生成 CHANGELOG
 * 打 tag 并推送至 git
 */

import { _updateVersion, _selectNextVersion } from './selectNextVersion';
import { _gitPush } from './gitPush';
import { getOldLog, _setChangelog } from './setChangelog';
import { _build } from './build';
import { _publishNpm } from './publishNpm';
import { _addTag } from './addTag';
import {
  updateVersion,
  addTag,
  gitPush,
  setChangelog,
  publishNpm,
  build,
} from './config/constans';
import { compose, getOriginPackageJson, basicCatchError } from './config/functions';

const getNextVersion = async (next) => {
  const nextVersion = await _selectNextVersion();
  const originPackageJson = getOriginPackageJson();
  next({
    nextVersion,
    originVersion: originPackageJson.version,
    originPackageJson,
  });
};

const getReleaseFns = {
  [updateVersion]: async (next, otherOptions) => {
    if (!otherOptions?.nextVersion) {
      throw new Error('请传入package.json新版本号');
    }
    const backVersionFn = await _updateVersion(
      otherOptions.nextVersion,
      otherOptions.originPackageJson
    ).catch(basicCatchError);
    next({ backVersionFn });
  },
  [gitPush]: async (next, otherOptions) => {
    const pushResult = await _gitPush().catch(basicCatchError);
    if (!pushResult) {
      return otherOptions?.backVersionFn?.();
    }
    next()
  },
  [setChangelog]: async (next, otherOptions) => {
    const backChangelog = getOldLog();
    const setLogResult = await _setChangelog().catch(basicCatchError);
    if (!setLogResult) {
      backChangelog();
      return await otherOptions?.backVersionFn();
    }
    next({ backChangelog });
  },
  [build]: async (next, otherOptions) => {
    const buildResult = await _build().catch(basicCatchError);
    if (!buildResult) {
      otherOptions?.backChangelog();
      return otherOptions?.backVersionFn();
    }
    next();
  },
  [publishNpm]: async (next, otherOptions) => {
    const publishResult = await _publishNpm().catch(basicCatchError);
    if (!publishResult) {
      otherOptions?.backChangelog();
      return otherOptions?.backVersionFn();
    }
    console.log(33);
    next();
  },
  [addTag]: async (next, otherOptions) => {
    console.log(44);
    await _addTag(otherOptions?.nextVersion).catch(basicCatchError);
    next();
  },
};

const middle = [getNextVersion];

const defaultMiddleware = [
  updateVersion,
  gitPush,
  setChangelog,
  build,
  publishNpm,
  addTag,
].map((node) => getReleaseFns[node]);

middle.push(...defaultMiddleware);

async function defaultMain() {
  try {
    compose(middle);
  } catch (error) {
    console.log('💣 发布失败，失败原因：', error);
  }
}

export { gitPush, setChangelog, build, publishNpm, addTag };
export default defaultMain;
