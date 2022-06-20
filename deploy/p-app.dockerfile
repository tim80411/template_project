# Let the more stable steps be execute first for the cache
# Reduce RUN, ADD command to decrease image layers
# Node version: 16.2.0
FROM node:16.2.0-alpine

# Init env variable
ENV FOLDER_NAME=template-project
ENV PORT=80
ENV NODE_ENV=prod

# Init app directory
WORKDIR /var/app/${FOLDER_NAME}

# Setup up server packeage
# pm2
# pm2-logrotate config https://github.com/pm2-hive/pm2-logrotate#configure
RUN npm install pm2 -g \
  && pm2 install pm2-logrotate \
  && pm2 set pm2-logrotate:max_size 200M \
  && pm2 set pm2-logrotate:compress true \
  && pm2 set pm2-logrotate:workerInterval 3600 \
  && pm2 set pm2-logrotate:rotateInterval '0 0 * * *'

# Copy the app without docs in .dockerignore
COPY . .

# Main app
RUN npm install --prodution
EXPOSE ${PORT}
CMD ["sh", "./deploy/shells/start.sh"]