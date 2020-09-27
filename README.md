# news-explorer-api
Дипломная работа - Api для проекта news explorer v.1.0.0
=============================

## Ссылки на проект


## Технологический стек
- JS
- Фреймворк express
- используется editorconfig, eslint, jsonwebtoken, bcryptjs, validator, pm2 
- MongoDB
- REST
- nginx
- шифрование https

## версия 1.0.0
- POST/signup - создается пользователь, для отправки обязательные поля: name, about, avatar, email, password 
- POST/signin - авторизация пользователя, для авторизации необходимо ввести email, password
- GET /users/me - выводится JSON объект конкретного юзера, если юзер не найден выводится ошибка 
- GET /articles - выводится JSON список всех статей 
- POST /articles - создается статья, для отправки обязательные поля: keyword, title, text, date, source, link, image
- DELETE/articles/articleId - удаление собственных статей, пользователь не может удалить чужую статью
- Ошибки обрабатываются централизовано
- Производится сбор Логов (запросы и ошибки)
- Происходит валидация приходящих данных на сервер
 
## Инструкция как развернуть проект
- Клонировать репозиторий: https://github.com/vitekv384/news-explorer-api.git
- Установить node.js
- Установить необходимые пакеты командой: npm i
- Запустить сервер командой: npm run dev