echo "start run template-project, NODE_ENV: ${NODE_ENV}"

echo "currnet pwd:"
pwd

node -v && npm run start:${NODE_ENV}