const multer = require('multer');
const mime = require('mime');
const { v4: uuidv4 } = require('uuid');

const config = require('config/entry');
const logger = require('lib/basic/Logger');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const { requestId } = req;
    const fileUploadPath = config.file.uploadPath;
    logger.info({ msg: `upload file to ${fileUploadPath}`, requestId });
    cb(null, fileUploadPath);
  },
  filename(req, file, cb) {
    const { requestId } = req;
    const fileType = mime.getExtension(file.mimetype);
    const name = `${Date.now()}-${uuidv4()}.${fileType}`;
    logger.info({ msg: `rename file from ${file.originalname} to ${name}`, requestId });
    cb(null, name);
  },
});

const limits = {
  fileSize: config.file.maxSize,
};

const multerOption = {
  storage,
  limits,
};

module.exports = multer(multerOption).array('files', 2);
