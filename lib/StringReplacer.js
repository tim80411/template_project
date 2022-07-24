const _ = require('lodash');
const pluralize = require('pluralize');

/**
 * 再basicReplaceAll的幫助下，
 * 僅需製作replaceMapping即可抽換所有content內符合對照表之內容
 */
class StringReplacer {
  /**
   * 對content裡面任何符合replaceMapping key的值做更換
   *
   * 重要：僅針對無regex特殊字元的key
   * @param {Object} args 參數
   * @param {String} args.content 內容
   * @param {Object} args.replaceMapping 內容抽換對照表
   * @returns {String} contentAfterReplace
   */
  static basicReplaceAll({ content, replaceMapping }) {
    if (!content) return '';

    // 轉換; 特殊字元須加上\讓regex辨認
    const transferSpecialKey = _.keys(replaceMapping);
    const regexStr = `(${transferSpecialKey.join('|')})`;
    const regexRule = new RegExp(regexStr, 'g');

    // 刪除slash
    const clearReplaceMapping = {};
    for (const key in replaceMapping) {
      const value = replaceMapping[key];
      clearReplaceMapping[_.replace(key, /[\\]/g, '')] = value;
    }

    const pushContent = content.replace(regexRule, (match, $1) => clearReplaceMapping[$1]);

    return pushContent;
  }

  static replaceSchemaTemplate(content, model) {
    const replaceMapping = {
      '#model#': model,
      '#models#': pluralize(model),
      '#Model#': _.upperFirst(model),
      '#version#': process.env.npm_package_version,
    };

    return this.basicReplaceAll({ content, replaceMapping });
  }
}

module.exports = StringReplacer;
