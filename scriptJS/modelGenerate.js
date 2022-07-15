/* eslint-disable no-await-in-loop */
const _ = require('lodash');
const pluralize = require('pluralize');

const logger = require('lib/basic/Logger');
const FileService = require('lib/FileService');

const model = _.lowerFirst(process.env.npm_config_model);
const upperModelName = _.upperFirst(model);

const replaceMapping = {
  '#model#': model,
  '#models#': pluralize(model),
  '#Model#': _.upperFirst(model),
  '#version#': process.env.npm_package_version,
};

const GENERATE_INFOS = [
  {
    topic: 'schema',
    templatePath: './scriptJS/templates/schema',
    targetFilePath: `./src/models/${_.upperFirst(model)}Schema.js`,
    entryPath: './src/models/entry.js',
    signMappings: [
      {
        sign: '#schema import#',
        statement: `const ${upperModelName}Schema = require('./${upperModelName}Schema');`,
      },
      {
        sign: '#model init#',
        statement: `models.${upperModelName} = mongoose.model('${upperModelName}', ${upperModelName}Schema);`,
      },
    ],
  },
  {
    topic: 'route',
    templatePath: './scriptJS/templates/route',
    targetFilePath: `./src/routes/${model}.js`,
    entryPath: './src/routes/entry.js',
    signMappings: [
      {
        sign: '#route import#',
        statement: `router.use('/${pluralize(model)}', ${model});`,
      },
      {
        sign: '#route required#',
        statement: `const ${model} = require('./${model}');`,
      },
    ],
  },
  {
    topic: 'controller',
    templatePath: './scriptJS/templates/controller',
    targetFilePath: `./src/controllers/${model}.js`,
  },
  {
    topic: 'service',
    templatePath: './scriptJS/templates/service',
    targetFilePath: `./src/services/${upperModelName}Service.js`,
  },
  {
    topic: 'changeLog',
    entryPath: './apidoc/changelog.js',
    signMappings: [
      {
        sign: `#${process.env.npm_package_version} model-generate auto log#`,
        statement: ` * - 新Model ${upperModelName}`,
      },
    ],
  },
];

async function generateModel() {
  if (!model) logger.error({ msg: '請輸npm run generate-model --model=xxx' });
  logger.info({ msg: 'Start generate model', model });

  try {
    for (const generateInfo of GENERATE_INFOS) {
      const topic = _.upperFirst(generateInfo.topic);
      const {
        templatePath, targetFilePath, entryPath, signMappings,
      } = generateInfo;

      if (templatePath && targetFilePath) {
        logger.info({ msg: `Start generate ${topic} File`, generateInfo });
        FileService.generateFileByTemplatePath(templatePath, targetFilePath, replaceMapping);
      }

      if (entryPath && signMappings) {
        logger.info({ msg: `Start append statement to ${topic} entry` });
        for (const item of signMappings) {
          const { sign, statement } = item;
          await FileService.appendStatementBySign(entryPath, sign, statement);
        }
      }
    }
  } catch (error) {
    logger.error({ msg: 'Error Occur', error });
  }

  logger.info({ msg: 'Finish generate model process', model });
}

generateModel();
