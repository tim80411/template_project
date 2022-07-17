// pm2 api doc: https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
  apps: [
    {
      name: 'dev-app',
      script: './index.js',
      ignore_watch: ['node_modules', '*.md'],
      env: {
        NODE_PATH: '.',
      },
      watch: true,
      autorestart: true,
      merge_logs: true,
      node_args: ['--inspect'],
    },
    {
      name: 'prod-app',
      script: './index.js',
      ignore_watch: ['node_modules'],
      env: {
        NODE_PATH: '.',
      },
      watch: true,
      autorestart: true,
      merge_logs: true,
    },
  ],
};
