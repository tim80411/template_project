# Template_Project
# 資訊
## node version
v16.2.0

## 功能
- 多種類db引入: 可使用通用的dbLoader連線db; 預設db-mongodb已完成
- npm script: 版本init
- ci/cd: github actin
- env config: 可跟著環境設定config
- multer上傳檔案: 可在config控制單檔案大小、限制檔案副檔名、下載位置

## Road Map
### 1.0.0
1. db loader(預設mongoDB): model及registry, 建置apidoc(model-generate)
   1. 建立model模型-
2. model-generate時的連帶處理: router, service
3. express完善: 包括joiHandler
4. migration: mongodb migration建置、更新init-version指令
5. scheduler 開發
6. 會員系統 開發

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
另外平時使用時，在model, controller直接撰寫文件，若有版本差異，需先將舊版本的jsDoc文件資料放入apidoc/history

## init-version 版本變更
### 使用
使用 `VER=x.x.x npm run init-version" 更新版本，會自動生成相關版本文件

## CI/CD
參考./github/README.md