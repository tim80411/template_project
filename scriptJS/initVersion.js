const fsPromise = require('fs').promises;

const logger = require('lib/basic/Logger');

class initVersionService {
  static async modifyPackageJson(version) {
    const path = './package.json';
    const packageJson = await fsPromise.readFile(path, 'utf-8');
    const data = JSON.parse(packageJson);
    if (data.version === version) throw new Error('版本重複');

    data.version = version;

    await fsPromise.writeFile(path, JSON.stringify(data, null, 2));
    logger.info('modify packageJson version done');
  }

  static async modifyChangeLog(version) {
    const path = './apidoc/changelog.js';
    let changelog = await fsPromise.readFile(path, 'utf-8');

    const versionData = `/**
   * @apiVersion ${version}
   * @apiGroup Changelog
   * @apiSuccessExample Summary
   * @apiSuccessExample API
   *
   * @apiSuccessExample Overview
   * #${version} model-generate auto log# 此行勿刪
   *
   */`.replace(/\n\s*/g, '\n');

    changelog = `${versionData}\n\n${changelog}`;
    await fsPromise.writeFile(path, changelog);
    logger.info('modify apidoc changelog version done');
  }

  static async createApiHistory(version) {
    const path = './apidoc/history';
    const filename = `apidoc-${version}.js`;
    await fsPromise.writeFile(`${path}/${filename}`, '');
    logger.info('create apidoc history file done');
  }
}

async function initVersion() {
  const version = process.env.VER;
  if (!version) {
    logger.error({ msg: 'VER=xxx.xxx.xxx 輸入npm run init-version' });
    return;
  }

  logger.debug({ msg: 'Start init version' });

  try {
    await initVersionService.modifyPackageJson(version);
    await initVersionService.modifyChangeLog(version);
    await initVersionService.createApiHistory(version);
  } catch (error) {
    logger.error({ msg: 'init version error', error: error.message });
  }
}

initVersion();
