// pm2 api doc: https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
  apps: [{
    name: 'app',
    script: './index.js',
    ignore_watch: ['node_modules'],
    env_dev: {
      NODE_ENV: 'dev',
    },
    env: {
      NODE_PATH: '.',
    },
    watch: true,
    autorestart: true,
    merge_logs: true,
  }],
};
