from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

# Ваш токен бота
TOKEN = "8088923351:AAE16B5FtK4VWesULTEqNz8A0Oez4MoMFuU"

# Обработка команды /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Кнопка для запуска мини-приложения
    keyboard = [
        [
            InlineKeyboardButton(
                text="Открыть мини-приложение",
                web_app=WebAppInfo(url="https://stellarsquad.github.io/ModelRnk/")
            ),
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        "Привет! Нажмите на кнопку ниже, чтобы открыть мини-приложение:",
        reply_markup=reply_markup
    )

def main():
    # Создаём объект Application
    application = Application.builder().token(TOKEN).build()

    # Регистрация команды /start
    application.add_handler(CommandHandler("start", start))

    # Запуск бота
    print("Бот запущен и слушает команды...")
    application.run_polling()

if __name__ == "__main__":
    main()