const _ = require('lodash');

const logger = require('lib/basic/Logger');
const fsPromise = require('fs/promises');
const StringReplacer = require('lib/StringReplacer');

const ENCODE_TYPE = 'utf8';

class FileService {
  /**
   * 取得模板的資料，並使用replacer更換掉關鍵資料後，再貼到targetPath上
   * @param {String} templatePath 模板檔案路徑 ex: ./scriptJS/templates/schema
   * @param {String} targetPath 預計貼上的檔案路徑
   * @param {Object} replaceMapping 更換變數對照表
   */
  static async generateFileByTemplatePath(templatePath, targetPath, replaceMapping) {
    logger.info({
      msg: 'Start generateFileByTemplatePath()', templatePath, targetPath, replaceMapping,
    });

    const templateContent = await fsPromise.readFile(templatePath, ENCODE_TYPE);
    const replaceContent = StringReplacer.basicReplaceAll({ content: templateContent, replaceMapping });
    await fsPromise.writeFile(targetPath, replaceContent);
    logger.info('Finish generate file by template');
  }

  static async appendStatementBySign(targetFilePath, sign, statement) {
    logger.info({
      msg: 'Start appendStatement', targetFilePath, sign, statement,
    });
    const lineSyntax = '\n';
    const modelEntryFile = await fsPromise.readFile(targetFilePath, ENCODE_TYPE);
    const lines = _.split(modelEntryFile, lineSyntax);

    for (let index = lines.length - 1; index >= 0; index -= 1) {
      const line = lines[index];

      if (line.includes(sign)) {
        lines.splice(index + 1, 0, statement);
      }
    }

    const newFileContent = _.join(lines, '\n');
    await fsPromise.writeFile(targetFilePath, newFileContent);
  }
}

module.exports = FileService;
