## 文档如下

## 前言
兄弟们，这个东西是真的真的好用，为什么需要自动化发布脚本呢？
如果你们目前的项目是这样push代码的，就有大问题：
```bash
git add -A
git commit -m "xxx"
git push
```
- 首先，你push版本前是不是要手动修改package.json里的版本号？是不是很麻烦？
- 其次，代码如果要打tag，你是不是要手动git tag vXXX还要git push origin tag把tag单独推到git仓库？
- 还有，你commit不符合angular规范咋办（比如修改bug是'fix:' 开头, 新增功能是'feat:' 开头）
- 还有，修改了commit之后如何自动生成changelog？
- 最重要的是你如果自己写bash 脚本，如何保证你代码的拓展性，比如我要加减一个流程，你必须面向过程编码去改bash脚本，而不能轻易的抽象出一个可配置化的流程脚本。

## 看看这个npm包咋样

这是我自己写的一个可配置化的node发布脚本，先看看效果：

我在自己项目的根目录建立一个scripts文件夹，下面建立一个release.ts 脚本
```typescript
import defaultRelaseProcess from '@mx-design/release';
defaultRelaseProcess();
```
package.json
```typescript
  "scripts": {
    // 不用担心ts-node依赖，@mx-design/release包会帮你安装
    "release": "ts-node ./scripts/release.ts"
  },
   "devDependencies": {
    "@mx-design/release": "^1.0.0",
  },
```
然后命令行界面到你的项目根目录，输入：
```
npm run release
```
然后你的命令行界面会显示如下：
1、询问你要升级的版本

![34182EEF-6E27-41B9-AE4F-41C6AFEFB6E7.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43a79c4a71324340a28d5d6efd63070c~tplv-k3u1fbpfcp-watermark.image?)

看到了吧，你可以自由选择是主版本升级，还是次版本，或者其他版本，都是符合semver规范的。

2、选择后会让你填写commit信息，如果你的commit的信息不符合angular提交规范，会报错提示你不符合规范，并且终止脚本。（整体交互很舒服，比如你git push的时候，我们会显示正在push loading，push成功，就会覆盖当时正在push的文字，颜色标绿并显示对钩的图标）

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e6003e6342e4d7391c37c7842a575cb~tplv-k3u1fbpfcp-watermark.image?)

交互loading如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce82b0c30baf48828c618bb65633375e~tplv-k3u1fbpfcp-watermark.image?)

如果命令执行错误，显示如下（国内github环境非常差，经常git push失败，用vpn还是一样的）：

![109CAAC1-709A-4686-86A9-AF64D960E984.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9b7c615fa774426a802e6b816a5be4c~tplv-k3u1fbpfcp-watermark.image?)

git push成功效果如下：

![C74EFAE8-C49A-447F-8E14-093B2ACBD947.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f312cf16ce94707b72390e311f0eaee~tplv-k3u1fbpfcp-watermark.image?)

3、这里release的主要流程完成如下：

![4E008797-7E12-4619-B39A-A3C8E131B4C1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3aa5ef328d464e2ebf501d5931c3df87~tplv-k3u1fbpfcp-watermark.image?)

流程包括：
 - 选择升级版本 ->  
- 修改package.json的版本号 -> 
- 填写commit信息（校验格式，不通过终止） ->  
- 推送到代码仓库（推送失败会帮你把package.json里的版本回退）  -> 
- 生成changeLog  ->  
- **build打包(这里执行的是npm run build 所以你的scripts里必须有build命令，要不执行失败)**  ->
- 发布包(执行的 npm publish --access=public 命令) ->
- 打tag并且推送到git仓库


## 自定义流程
上面几个流程是这个包自带流程顺序，你可以配自己的顺序，
```typescript
import { getNextVersion, gitPush, setChangelog, build, publishNpm, addTag, compose } from '@mx-design/release';

// getNextVersion 获取下个版本号函数
// updateVersion 修改版本号 返回值是回退版本号的函数
// gitPush push代码函数
// setChangelog 设置changeLog函数
// build 执行npm run build函数
// publish 执行npm publish函数
// addTag 打tag函数
// compose函数组合器

// 使用方法，这些函数顺序可以自己换位置，或者增删减
const middle = [getNextVersion, updateVersion, gitPush, setChangelog, build, publishNpm, addTag];

function execRelease() {
  compose(middle);
}
```

## 寻求共建 + 源码分析

本项目随时欢迎任何有兴趣的同学加入，评论区写自己github账号，或者issue上留言，我会第一时间加你到核心开发成员列表。

这个项目还缺少一些东西，比如eslint、stylelint校验，自定义changelog位置，增加单元测试，加入git workflow 等等，我没那么多时间做，因为今年还有很多任务排着呢。。。

## 源码分析

目录含义：
```
- 根目录
 - src
   - addTag 
       - index.ts // 打tag函数
   - build
       - build.ts // build项目函数
   - config // 配置文件夹
       - functions 工具函数
       - contstants 常量
   - gitPush
       - index.ts // push到git函数
   - publishNpm
       - index.ts // publish 整个项目的函数
   - selectNextVersion
       - index.ts 选择下个版本号函数
   - setChangeLog
       - 打changeLog函数
 package.json
 tsconfig.json
 ... 普通文件没啥好讲的
```
核心中间件执行器compose，这个函数的灵感来源于koa框架，说白了就是一个中间件组合函数，并且能共享数据，代码如下,后面我们会举个例子，来看它的执行机制：
```javascript
export function compose(middleware) {
  // 共享数据仓库，每个函数都可以往里面加数据，所有函数都可以访问到里面的数据
  const otherOptions = {}; 
  // 函数发射器，一个函数执行完毕调用next()，就执行下一个函数
  function dispatch(index, otherOptions) {
    // 每次从middleware中间件里面选取一个函数执行，直到执行了全部函数
    if (index == middleware.length) return;
    const currMiddleware = middleware[index];
    // 执行函数，传入了一下一个函数的dispatch，已经更新共享数据
    currMiddleware((addOptions) => {
      dispatch(++index, { ...otherOptions, ...addOptions });
    }, otherOptions).catch((error) => {
      console.log('💣 发布失败，失败原因：', error);
    });
  }
  dispatch(0, otherOptions);
}
```
middleware写法
```javascript
// 获取版本号函数，固定参数第一个是next，表示调用middleware里下一个函数
const getNextVersion = async (next) => {
  // _selectNextVersion会查看你package.json里的version参数是啥版本
  const nextVersion = await _selectNextVersion();
  // 缓存老的package.json数据，为了后面可以回退版本有老版本数据做准备
  const originPackageJson = getOriginPackageJson();
  // next传入的数据都会放到共享数据仓库，下面的函数都可以拿到这些数据
  next({
    nextVersion,
    originVersion: originPackageJson.version,
    originPackageJson,
  });
};

// 更新版本号方法
const updateVersion = async (next, otherOptions) => {
  if (!otherOptions?.nextVersion) {
    throw new Error('请传入package.json新版本号');
  }
  // 返回一个回退版本号的方法，上面的函数共享的originPackageJson数据就是给他用的
  // basicCatchError如果命令执行失败，就打印失败原因，并且返回false
  const backVersionFn = await _updateVersion(otherOptions.nextVersion, otherOptions.originPackageJson).catch(
    basicCatchError,
  );
  // 把回退版本的函数共享出来，给下面需要用的地方自己调用
  next({ backVersionFn });
};
```
案例说明
```
compose([getNextVersion, updateVersion])
```
首先compose会调用
- dispatch(0, otherOptions)
- 0代表compose传参的middleware数组里的第一项
- otherOptions代表共享数据，目前是空对象

接着， 第一个函数调用
- getNextVersion((addOptions) => {
      dispatch(++index, { ...otherOptions, ...addOptions });
    }, otherOptions);
- 看第一个参数，我们是这么写的
- const getNextVersion = async (next) => {
- 也就是说第一个参数next调用后，实际上是调用dispatch函数，dispatch函数的参数index + 1，就调用了middleware数组里，第二个函数了
- dispatch第二个参数就是把next想共享的数据发下去

好了源码分析完了，我今年主要是任务是写react pc和移动端组件库，之前写了cli打包和开发的脚手架，文章如下：
https://juejin.cn/post/7075187294096850951

这个项目也是，有兴趣加入核心贡献者，直接留言，把github账号说下，第一时间加你进来，多谢点个star哦
现在完成了发布脚本，接着就是搭建组件库展示网站了，也是自己写，没有用现成的dumi或者storybook。


