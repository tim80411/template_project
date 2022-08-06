# Template_Project
# 資訊
## node version
v16.2.0

## 需求及解決方案(套件)
framework: express
db: mongoose(orm) + mongodb
logger: pino
debugger: vscode debugger
api文件: apidoc
ci/cd: github action
檔案上傳: multer
process management: pm2
資料驗證: joi


## Road Map
### 1.0.0
1. migration: mongodb migration建置、更新init-version指令
2. scheduler 開發
3. 會員系統 開發

### 2.0.0
1. 做成npm cli，db及loader變成可選


# 專案設定
- ### 本地開發需要:
- ### npm install
- ### (可選)npx husky install
  - 做為pre-commit前，自動run script，預設專案用於lint-staged
- ### npm install -g pm2
- ### pm2 install pm2-logrotate
  - 日誌管理
  - pm2 set pm2-logrotate:<param> <value>
- ### 專案建置需要:
- ### devOps部分: 如不需要, 須將./.github/workflows/deploy-production.yml刪除
  - ec2建立
  - 取得ec2, IAM相關金鑰資料
  - github repo設定secret: 
    - [AWS_ACCESS_KEY_ID](https://docs.aws.amazon.com/zh_tw/IAM/latest/UserGuide/id_credentials_access-keys.html): IAM所需權限(ecr)的金鑰資料
    - AWS_SECRET_ACCESS_KEY: 同上
    - PROD_HOST: ec2 domain name
    - PROD_USERNAME: 登入ec2的名稱
    - PROD_SSH_KEY: 登入ec2的ssh key資料
    - PROD_PORT: 登入ec2的埠號


![secret sample](https://imgur.com/iCUoAe8.jpg)


# 功能使用說明
## apidoc
### 用途
inline api文件產生
### 使用
使用 `npm run doc`即可在/static/apidoc產生html文件
另外平時使用時，在model, controller直接撰寫文件，若有版本差異，需先將舊版本的jsDoc文件資料放入apidoc/history
## CI/CD
參考./github/README.md

# npm script
## npm run init-version: 版本變更
### 使用
使用 `npm run init-version --version=xxx.xxx.xxx` 更新版本，會自動生成相關版本文件

## npm run model-generate: 在default db為mongodb時可用
### 使用
使用 `npm run model-generate --model=xxx` 建立model, 會自動建立
- model: build schema file and add necessary statement to models/entry.js
- route: build route file and add necessary statement to routes/entry.js
- service: build service file
- controller: build controller file
- changelog: add changelog


## vscode debug + pm2
### 使用
- 在本地環境, 正常開啟npm run start:dev
- 使用ctrl(command) + shift + D 前往debugger
- 選項使用Attach to pm2
- 接著就可以正常使用中斷點, 變數, 監看等功能了