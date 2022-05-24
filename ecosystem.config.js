// pm2 api doc: https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
  apps: [{
    name: 'app',
    script: './index.js',
    env_dev: {
      NODE_ENV: 'dev',
    },
    env: {
      NODE_PATH: '.',
    },
    watch: true,
  }],
};
