# 🚀 Автоматическое создание репозитория для игры "Пупа VS Лупа"
# PowerShell скрипт для упрощения процесса

Write-Host "🚀 Автоматическое создание репозитория GitHub" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Gray
Write-Host ""

Write-Host "📍 Открываем страницу создания репозитория..." -ForegroundColor Cyan

# Открываем страницу создания репозитория с предзаполненными полями
$repoUrl = "https://github.com/new?name=pupe-vs-lupae-game&description=Mobile casual tapping game - Frontend vs Backend&public=true"

try {
    # Пытаемся открыть через разные способы
    Start-Process $repoUrl
    Write-Host "✅ Страница создана открыта в браузере!" -ForegroundColor Green
} catch {
    Write-Host "❌ Не удалось автоматически открыть браузер" -ForegroundColor Red
    Write-Host "🔗 Откройте эту ссылку вручную:" -ForegroundColor Yellow
    Write-Host $repoUrl -ForegroundColor Blue
}

Write-Host ""
Write-Host "📋 ЧТО НУЖНО СДЕЛАТЬ:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣ Создайте репозиторий на открывшейся странице:" -ForegroundColor White
Write-Host "   📝 Имя: pupe-vs-lupae-game" -ForegroundColor Gray
Write-Host "   📝 Описание: уже заполнено" -ForegroundColor Gray
Write-Host "   📝 Видимость: Public (уже выбрано)" -ForegroundColor Gray
Write-Host "   ❌ НЕ ставьте галочки на README/.gitignore/license" -ForegroundColor Red
Write-Host "   ✅ Нажмите 'Create repository'" -ForegroundColor Green

Write-Host ""
Write-Host "2️⃣ После создания скажите мне 'ГОТОВО' для автоматического деплоя" -ForegroundColor Cyan

Write-Host ""
Write-Host "🎮 После деплоя игра будет доступна по адресу:" -ForegroundColor Magenta
Write-Host "https://denis12676.github.io/pupe-vs-lupae-game" -ForegroundColor Cyan

Write-Host ""
Write-Host "⏳ Ожидаю создания репозитория..." -ForegroundColor Yellow
