# Appeal Management API 📋

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

![Node.js](https://img.shields.io/badge/Node.js-v20.x-green)

![TypeScript](https://img.shields.io/badge/TypeScript-v5.x-blue)

Это бэкенд API для управления обращениями, разработанное с использованием Node.js, TypeScript, Express, Sequelize и PostgreSQL.

API предоставляет эндпоинты для создания, обновления и фильтрации обращений по дате или диапазону дат, а также включает документацию Swagger для удобного взаимодействия.

## Возможности 🌟

- Создание, обновление и отмена обращений.
- Фильтрация обращений по конкретной дате или диапазону дат.
- Документация API через Swagger UI.
- Хранение данных в PostgreSQL с использованием Sequelize ORM.
- TypeScript для типобезопасности и удобства разработки.

## Технологический стек 🛠️

- **Node.js**: v20.x
- **TypeScript**: v5.x
- **Express**: Фреймворк для создания API.
- **Sequelize**: ORM для работы с PostgreSQL.
- **PostgreSQL**: База данных для хранения обращений.
- **Swagger UI**: Документация API.

## Установка 🚀

### Требования

- Node.js (v20.x или выше)
- PostgreSQL (v12 или выше)
- Git

### Пошаговая инструкция

1. **Клонируйте репозиторий**:

   `git clone https://github.com/<your-username>/appeal-management-api.git
cd appeal-management-api`

2. **Установите зависимости:**

   `npm install`

3. **Настройте переменные окружения:**

   **_Создайте файл .env в корне проекта и добавьте:_**

   `DB_HOST=localhost  
DB_PORT=5432  
DB_NAME=appeal_db  
DB_USER=ваш_пользователь_бд  
DB_PASSWORD=ваш_пароль_бд  
PORT=3000`

4. **Настройте PostgreSQL:**

   **_Создайте базу данных и пользователя:_**

   ```
   sudo -u postgres psql

   CREATE DATABASE appeal_db;

   CREATE USER ваш_пользователь_бд WITH PASSWORD 'ваш_пароль_бд';

   GRANT ALL PRIVILEGES ON DATABASE appeal_db TO ваш_пользователь_бд;

   GRANT USAGE, CREATE ON SCHEMA public TO ваш*пользователь_бд;

   ALTER DATABASE appeal_db OWNER TO myuser;

   \q
   ```

5. **Запустите приложение:**

   **_В режиме разработки:_**

   `npm run dev`

   **_В продакшн-режиме:_**

   `npm run build`

   `npm start`

## Доступ к API 🌐

- API: [http://localhost:3000/api/appeals](http://localhost:3000/api/appeals)
- Swagger-документация: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

📡 Эндпоинты API

**API предоставляет следующие эндпоинты (подробности в Swagger UI):**

```
- **POST** `/api/appeals` – Создать новое обращение
- **GET** `/api/appeals` – Получить обращения (поддержка фильтрации по `date`, `startDate`, `endDate`)
- **PUT** `/api/appeals/:id/start` – Начать обработку обращения
- **PUT** `/api/appeals/:id/complete` – Завершить обращение
- **PUT** `/api/appeals/:id/cancel` – Отменить обращение
- **PUT** `/api/appeals/cancel-all-in-progress` – Отменить все обращения в процессе
```

🔍 Примеры запросов

**Фильтрация по дате**

```
GET /api/appeals?date=2025-04-08
```

→ Возвращает все обращения, созданные 8 апреля 2025 года.

**Фильтрация по диапазону дат**

```
GET /api/appeals?startDate=2025-04-01&endDate=2025-04-10
```

→ Возвращает все обращения, созданные с 1 по 10 апреля 2025 года.
