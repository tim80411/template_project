# github action

## check-eslint
在發出對於develop, main的pull request時自動做eslint檢查

## deploy-production
### 前提
1. 使用EC2等雲端伺服器
2. 以container部署
3. 在EC2上建立好deploy.sh做
   - 拉取遠端image
   - 運行docker-compose
4. 在EC2上建立好docker-compose.yml
5. 在github上設定好secret值
### github action流程
1. 建立image
2. 推到遠端的registry
3. 進入雲端server並運行deploy.sh