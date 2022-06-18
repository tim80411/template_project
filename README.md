# Template_Project
# 資訊
## node version
v16.2.0

## 功能
req, res 資料進入前、出去前印出
error handler
npm script: 版本init
ci/cd: github actin

## Road Map
### 1.0.0
1. (almost done)simple app to check
2. pm2 & github action
3. express完善: 包括router, service, joiHandler, config, 檔案上傳(multer)
4. db loader(預設mongoDB): model及registry, 建置apidoc(model-generate)
5. migration: mongodb migration建置、更新init-version指令
6. 完整啟動後改設置pm2啟動server
7. scheduler 開發
8. 會員系統 開發

### 2.0.0
1. 做成npm cli，db及loader變成可選


# 專案設定
- ### npm install
- ### (可選)npx husky install
  - 做為pre-commit前，自動run script，預設專案用於lint-staged
- ### npm install -g pm2
- ### pm2 install pm2-logrotate
  - 日誌管理
  - pm2 set pm2-logrotate:<param> <value>



# 功能使用說明
## apidoc
### 用途
inline api文件產生
### 使用
使用 `npm run doc`即可在/static/apidoc產生html文件
另外平時使用時，在model, controller直接撰寫文件，若有版本差異，需先將舊版本資料放入apidoc/history

## init-version 版本變更
### 使用
使用 `VER=x.x.x npm run init-version" 更新版本，會自動生成相關版本文件