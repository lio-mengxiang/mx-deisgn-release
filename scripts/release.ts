import { getNextVersion, gitPush, build, publishNpm, updateVersion, compose, eslint } from '../src/index';

const middle = [eslint(), getNextVersion, updateVersion, gitPush, build, publishNpm];

compose(middle);
