module.exports = {
  file: {
    maxSize: 5 * 1024 * 1024, // 單一上傳大小最高5MB
    uploadPath: '/tmp/multer',
  },
  db: {
    mongodb: {
      uri: 'mongodb://127.0.0.1:27017/dev-template-project',
    },
  },
};
