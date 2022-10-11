# Todo List 待辦事項表
使用 Node.js Express 開發待事項清單，此項目主要讓使用者對自己要做的事項做一個記錄與提醒。

![image](/public/image/%E7%99%BB%E5%85%A5%E9%A0%81.PNG)

# 功能表單

-  使用者註冊過後才能使用其功能，當然也可以使用Facebook, Google, GitHub來註冊使用。
-  可以新增一筆待辦事項，也可以做修改與刪除。
-  每筆待辦事項可勾選是否己處理。

## 遠端 heroku
  https://todo-list-mongo-v1.herokuapp.com/
## 啓動方式

- 將專案 clone 到本地端

https://github.com/Steavn-Chen/ac-todo-list-mongo

-  進入到專案資料夾
```
  安裝 npm
```
  npm install
```
  啓動專案
```
  npm run dev
```
  若終端機出顥示出以下字串，表示成功。
```
  Todo-List App is running on http://localhost:3000
```

  在終端機輸入 npm run seed
```
  看到 done.
      表示種子資料建立成功。

## 開發環境

- Node.js -V14.15.0
- Express -4.17.3
- Express-Handlebars-5.3.4
- mongoose 5.12.15

## 使用的套件

- express-session
- method-override
- nodemon
- bcryptjs
- connect-flash
- dotenv
- passport
- passport-local
- passport-facebook
- passport-google-oauth20
- passport-github