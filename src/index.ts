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
import {} from './config/constans';
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

const updateVersion = async (next, otherOptions) => {
  if (!otherOptions?.nextVersion) {
    throw new Error('请传入package.json新版本号');
  }
  const backVersionFn = await _updateVersion(otherOptions.nextVersion, otherOptions.originPackageJson).catch(
    basicCatchError,
  );
  next({ backVersionFn });
};

const gitPush = async (next, otherOptions) => {
  const pushResult = await _gitPush().catch(basicCatchError);
  console.log('pushResult: ', pushResult);
  if (!pushResult) {
    return otherOptions?.backVersionFn?.();
  }
  next();
};

const setChangelog = async (next, otherOptions) => {
  const backChangelog = getOldLog();
  const setLogResult = await _setChangelog().catch(basicCatchError);
  if (!setLogResult) {
    backChangelog();
    return otherOptions?.backVersionFn();
  }
  next({ backChangelog });
};

const build = async (next, otherOptions) => {
  const buildResult = await _build().catch(basicCatchError);
  if (!buildResult) {
    return otherOptions?.backVersionFn();
  }
  next();
};

const publishNpm = async (next) => {
  const publishResult = await _publishNpm().catch(basicCatchError);
  if (!publishResult) {
    return;
  }
  next();
};

const addTag = async (next, otherOptions) => {
  const addTagResult = await _addTag(otherOptions?.nextVersion).catch(basicCatchError);
  if (!addTagResult) {
    return;
  }
  next();
};

const middle = [getNextVersion, updateVersion, gitPush, setChangelog, build, publishNpm, addTag];

async function defaultMain() {
  compose(middle);
}

export { getNextVersion, gitPush, setChangelog, build, publishNpm, addTag, updateVersion, compose };
export default defaultMain;
