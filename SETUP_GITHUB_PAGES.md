# 📋 Рекомендации по настройке GitHub Pages

## Шаг 1: Создание репозитория на GitHub

1. Откройте GitHub и войдите в свой аккаунт
2. Нажмите на кнопку "New repository" (зеленый плюс в правом верхнем углу)
3. Заполните поля:
   - **Repository name**: `pupe-vs-lupae-game` (или любое другое имя)
   - **Description**: `Mobile casual tapping game - Frontend vs Backend`
   - **Visibility**: Public (обязательно для GitHub Pages)
   - **Initialize**: НЕ отмечайте никаких галок (README, .gitignore, license)

## Шаг 2: Загрузка файлов

### Вариант A: Через командную строку (рекомендуется)

```bash
# Если репозиторий уже создан локально
cd C:/task2

# Добавляем удаленный репозиторий (замените YOUR_USERNAME на свой GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pupe-vs-lupae-game.git

# Отправляем файлы
git branch -M main
git push -u origin main
```

### Вариант B: Через веб-интерфейс GitHub

1. На странице созданного репозитория нажмите "uploading an existing file"
2. Перетащите все файлы из папки проекта:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
   - `.gitignore`
3. Добавьте commit message: "Initial commit: Pupe vs Lupae game"
4. Нажмите "Commit changes"

## Шаг 3: Настройка GitHub Pages

1. Перейдите в настройки репозитория (Settings)
2. В левом меню найдите раздел "Pages [(навигация)]
3. В разделе "Source":
   - Выберите "Deploy from a branch" если ещё не выбрано
   - Branch: `main` (или `master`)
   - Folder: `/ (root)`
   - Нажмите "Save"

## Шаг 4: Активация сайта

1. После сохранения подождите 1-2 минуты
2. Вернитесь в настройки Pages - появится зеленая галочка
3. Скопируйте URL вашего сайта (типа: `https://YOUR_USERNAME.github.io/pupe-vs-lupae-game`)

## 🎉 Готово!

Ваша игра теперь доступна по адресу GitHub Pages!

### Для обновления игры:

```bash
# Измените файлы локально, затем:
git add .
git commit -m "Update: описание изменений"
git push origin main
```

### ✅ Чеки по окончании:

1. ✅ Игра загружается без ошибок
2. ✅ Кнопки работают на мобильном устройстве
3. ✅ Анимации плавные
4. ✅ Таймер работает корректно
5. ✅ Результаты сохраняются
6. ✅ Темы переключаются

## 🔧 Полезные ссылки после публикации:

- **Игра**: `https://YOUR_USERNAME.github.io/repo-name`
- **Репозиторий**: `https://github.com/YOUR_USERNAME/repo-name`
- **Settings Pages**: `https://github.com/YOUR_USERNAME/repo-name/settings/pages`

## 💡 Советы:

- Проверьте работу игры на реальном мобильном устройстве
- Подготовьте скриншоты или GIF для демонстрации
- Добавьте ссылку на живую версию в README файл репозитория
- Рассмотрите добавление favicon для лучшего UX

---

**Заметка**: После настройки GitHub Pages может потребоваться до 10 минут для полного запуска сайта.
