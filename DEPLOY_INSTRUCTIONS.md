# 🚀 Деплой игры "Пупа VS Лупа" на GitHub Pages

## Шаги для публикации игры:

### 1. Создайте репозиторий на GitHub

1. Зайдите на [GitHub.com](https://github.com) и войдите в аккаунт
2. Нажмите **"+ New repository"** (зеленый плюс в правом верхнем углу)
3. Заполните:
   - **Repository name**: `pupe-vs-lupae-game` (или любое имя)
   - **Description**: `Mobile casual tapping game - Frontend vs Backend`
   - **Visibility**: Public ✅ (обязательно!)
   - **Initialize**: НЕ ставьте галочки (README, .gitignore, license)

### 2. Подключите локальный репозиторий

**Замените YOUR_USERNAME на ваш GitHub username в командах ниже:**

```bash
# Добавляем удаленный репозиторий
git remote add origin https://github.com/YOUR_USERNAME/pupe-vs-lupae-game.git

# Переименовываем главную ветку в main (современный стандарт)
git branch -M main

# Отправляем файлы на GitHub
git push -u origin main
```

### 3. Настройте GitHub Pages

1. После загрузки файлов перейдите на страницу вашего репозитория
2. Нажмите **"Settings"** (вкладка в правом верхнем меню)
3. В левом меню найдите **"Pages"**
4. В разделе **"Source"**:
   - Выберите **"Deploy from a branch"**
   - Branch: выберите **"main"**
   - Folder: выберите **"/ (root)"**
5. Нажмите **"Save"**

### 4. Ждите активации

- GitHub Pages активируется через **1-5 минут**
- После активации появится зеленый баннер с URL игры
- Ваша игра будет доступна по адресу:
  ```
  https://YOUR_USERNAME.github.io/pupe-vs-lupae-game
  ```

### 5. Проверьте работу

1. Откройте ссылку игры на телефоне
2. Проверьте все функции:
   - Кнопка "Начать игру"
   - Тапы на фоне Пупы/Лупы
   - Таймер и премии
   - Экран результатов

### 🎯 Альтернативный способ (веб-интерфейс GitHub):

Если командная строка не работает:

1. Создайте репозиторий на GitHub
2. На странице репозитория нажмите **"uploading an existing file"**
3. Перетащите ВСЕ файлы из папки проекта:
   - ✅ `index.html`
   - ✅ `style.css`
   - ✅ `script.js`
   - ✅ `README.md`
   - ✅ `GAME_FEATURES.md`
   - ✅ `SETUP_GITHUB_PAGES.md`
   - ✅ `.gitignore`
4. Добавьте commit message: "Initial commit: Pupe vs Lupae game"
5. Нажмите **"Commit changes"**
6. Настройте Pages как описано выше

### 📱 После деплоя:

✅ **Игра будет доступна по URL вида:**
```
https://YOUR_USERNAME.github.io/repo-name
```

✅ **Для обновлений (если нужно):**
```bash
git add .
git commit -m "Update: описание изменений"
git push origin main
```

✅ **Ссылку на игру добавьте в:**
- README файл репозитория
- Любые демонстрации или презентации

---

## 🚨 Если нужно создать репозиторий прямо сейчас:

Если вы дадите согласие, я могу помочь выполнить команды git для подключения к вашему GitHub аккаунту. Требуется только указать ваш GitHub username.

**Готов помочь с деплоем! Просто скажите ваш GitHub username и я выполню команды.**
