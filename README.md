# Template_Project
# 資訊
## node version
v16.2.0


# 專案設定
- ## npm install
- ## npx husky install
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