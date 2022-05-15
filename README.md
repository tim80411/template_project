# Template_Project
# 資訊
## node version
v16.2.0

## 功能
req, res 印出
error handler
npm script 換版本

## Road Map
### 1.0.0
1. express完善: 包括router, service, joiHandler, config, 檔案上傳(multer)
2. db loader(預設mongoDB): model及registry, 建置apidoc(model-generate)
3. migration: mongodb migration建置、更新init-version指令
4. 完整啟動後改設置pm2啟動server
5. scheduler 開發
6. 會員系統 開發

### 2.0.0
1. 做成npm cli，db及loader變成可選


# 專案設定
- ### npm install
- ### npx husky install
   1. 做為pre-commit前，自動run script，預設專案用於lint-staged


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