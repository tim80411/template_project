const _ = require('lodash');
const fsPromise = require('fs/promises');

const logger = require('lib/basic/Logger');
const StringReplacer = require('lib/StringReplacer');

const encodeType = 'utf8';
const model = _.lowerFirst(process.env.npm_config_model);

async function generateSchemaFile() {
  const schemaFileName = `${_.upperFirst(model)}Schema.js`;
  const modelPath = `./src/models/${schemaFileName}`;
  // if (fsPromise.)
  logger.info({ msg: 'Start generateSchemaFile()', model });

  const templatePath = './scriptJS/templates/schema';
  const templateContent = await fsPromise.readFile(templatePath, encodeType);
  const replaceContent = StringReplacer.replaceSchemaTemplate(templateContent, model);
  await fsPromise.writeFile(modelPath, replaceContent);
  logger.info('Finish generate Schema file at models');
}

async function appendSchemaStatement() {
  const requireSign = '#schema import#';
  const modelSign = '#model init#';

  const modelEntryPath = './src/models/entry.js';
  const lineSyntax = '\n';
  const modelEntryFile = await fsPromise.readFile(modelEntryPath, encodeType);
  const lines = _.split(modelEntryFile, lineSyntax);

  const upperModelName = _.upperFirst(model);
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index];

    if (line.includes(modelSign)) {
      const modelStatement = `models.${upperModelName} = mongoose.model('${upperModelName}', ${upperModelName}Schema);`;

      lines.splice(index + 1, 0, modelStatement);
    } else if (line.includes(requireSign)) {
      const requireStatement = `const ${upperModelName}Schema = require('./${upperModelName}Schema');`;

      lines.splice(index + 1, 0, requireStatement);
    }
  }

  const newFileContent = _.join(lines, '\n');
  await fsPromise.writeFile(modelEntryPath, newFileContent);
}

async function generateModel() {
  if (!model) logger.error({ msg: '請輸npm run generate-model --model=xxx' });
  logger.info({ msg: 'Start generate model', model });

  try {
    await generateSchemaFile();
    await appendSchemaStatement();
  } catch (error) {
    logger.error({ msg: 'Error Occur', error });
  }

  logger.info({ msg: 'Finish generate model', model });
}

generateModel();
