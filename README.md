#  Инструкция по запуску проекта CompanyX

Пошаговое руководство по установке и запуску системы управления персоналом на локальном компьютере.

---

##  Требования к системе

| Компонент | Версия | Ссылка |
|-----------|--------|--------|
| **Git** | Последняя | https://git-scm.com/downloads |
| **Node.js** | 18+ (LTS) | https://nodejs.org/ |
| **.NET SDK** | 8.0 | https://dotnet.microsoft.com/download |
| **PostgreSQL** | 15+ | https://www.postgresql.org/download/ |
| **VS Code** (опционально) | — | https://code.visualstudio.com/ |

### Проверка установки

Откройте PowerShell или CMD и выполните:

```bash
git --version
node --version
npm --version
dotnet --version
psql --version
```

Если все команды возвращают версии — можно продолжать.

---

## 📥 Шаг 1: Клонирование репозитория

### Вариант A: Через HTTPS
```bash
git clone https://github.com/NistonT/company-x.git
cd company-x
```



---

## 🗄️ Шаг 2: Настройка базы данных PostgreSQL

### 2.1 Создание базы данных

Откройте **pgAdmin** или консоль `psql`:

```sql
CREATE DATABASE "CompanyX";
```

### 2.2 Настройка подключения

Откройте файл `backend/appsettings.json` и проверьте строку подключения:

```json
{
  "ConnectionStrings": {
		"DefaultConnection": "Host=localhost;Port=5432;Database=CompanyX;Username=postgres;Password=123"
	},
}
```

**Замените:**
- `Username` — на вашего пользователя PostgreSQL (обычно `postgres`)
- `Password` — на пароль, заданный при установке

### 2.3 Применение миграций

```bash
cd backend
dotnet ef database update
```

Если миграций нет:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## ⚙️ Шаг 3: Запуск бэкенда

### 3.1 Перейдите в папку бэкенда
```bash
cd backend
```

### 3.2 Восстановите пакеты
```bash
dotnet restore
```

### 3.3 Запустите проект
```bash
# Обычный запуск
dotnet run

# ИЛИ с автоперезагрузкой при изменениях
dotnet watch run
```

### ✅ Проверка
Откройте браузер: **http://localhost:5110/swagger**

Должна открыться страница Swagger с API-документацией.

> **Важно:** Запомните порт (обычно `5110` или `5000`).

---

## 🎨 Шаг 4: Запуск фронтенда

### 4.1 Откройте НОВЫЙ терминал
*(Бэкенд должен продолжать работать)*

### 4.2 Перейдите в папку фронтенда
```bash
cd frontend
```

### 4.3 Установите зависимости
```bash
npm install
```

### 4.4 Запустите фронтенд
```bash
npm run dev
```

### ✅ Проверка
Откройте браузер: **http://localhost:5173**

---

## 🚀 Шаг 5: Итоговый запуск

Вам нужно **одновременно** запустить два процесса:

### Терминал 1 — Бэкенд
```bash
cd backend
dotnet watch run
```
Ожидайте: `Now listening on: http://localhost:5110`

### Терминал 2 — Фронтенд
```bash
cd frontend
npm run dev
```
Ожидайте: `Local: http://localhost:5173/`

**Откройте:** http://localhost:5173

---

## 🔧 Решение частых проблем

### ❌ Ошибка: "Cannot connect to PostgreSQL"

**Решение:**
1. Убедитесь, что PostgreSQL запущен (служба `postgresql-x64-15` в `services.msc`)
2. Проверьте `appsettings.json` — правильные ли логин/пароль/порт
3. Попробуйте подключиться через pgAdmin вручную

---

###  Ошибка: "Port 5173 already in use"

**Решение:**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Или запустите на другом порту
npm run dev -- --port 3000
```

---

### ❌ Ошибка: "CORS policy" в браузере

**Решение:** Проверьте `Program.cs` в бэкенде:

```csharp
policy.WithOrigins("http://localhost:5173")
```

---

### ❌ Ошибка: "DateTime with Kind=Unspecified"

**Решение:** Добавьте в `Program.cs` перед `var app = builder.Build();`:

```csharp
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
```

---

### ❌ Ошибка: "npm install failed"

**Решение:**
```bash
# Очистите кэш
npm cache clean --force

# Удалите node_modules и package-lock.json
rm -rf node_modules package-lock.json

# Переустановите
npm install
```

---

### ❌ Ошибка: "dotnet ef not found"

**Решение:**
```bash
dotnet tool install --global dotnet-ef
```

---

## 📚 Шпаргалка команд

| Действие | Команда |
|----------|---------|
| Клонировать репозиторий | `git clone <url>` |
| Обновить код | `git pull` |
| Установить пакеты (фронт) | `npm install` |
| Запустить фронт | `npm run dev` |
| Собрать фронт для продакшена | `npm run build` |
| Восстановить пакеты (бэк) | `dotnet restore` |
| Запустить бэк | `dotnet run` |
| Запустить бэк с watch | `dotnet watch run` |
| Применить миграции БД | `dotnet ef database update` |
| Создать миграцию | `dotnet ef migrations add <Name>` |
| Посмотреть статус Git | `git status` |
| Сделать коммит | `git add . && git commit -m "message"` |
| Отправить на GitHub | `git push` |

---

## 💡 Полезные советы

1. **Используйте VS Code** — откройте папку проекта, и он предложит нужные расширения (C#, ESLint, Prettier).
2. **Postman или Swagger** — для тестирования API без фронтенда: http://localhost:5110/swagger.
3. **pgAdmin** — для просмотра данных в базе.
4. **Git Branch** — работайте в отдельной ветке: `git checkout -b feature/my-feature`.
5. **Два терминала** — используйте разделение экрана для одновременной работы с бэкендом и фронтендом.

---

## 🎯 Быстрый старт

Если всё уже настроено ранее:

```bash
# 1. Клонировать
git clone https://github.com/NistonT/company-x.git
cd company-x

# 2. Терминал 1 — Бэкенд
cd backend
dotnet watch run

# 3. Терминал 2 — Фронтенд
cd ../frontend
npm install
npm run dev

# 4. Открыть http://localhost:5173
```

---

## 📞 Поддержка

Если возникли проблемы:
1. Скопируйте текст ошибки.
2. Откройте файл, где произошла ошибка.
3. Проверьте логи в терминале.
4. Обратитесь за помощью, предоставив полную информацию об ошибке.
