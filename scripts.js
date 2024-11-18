document.addEventListener("DOMContentLoaded", () => {
  // Обработка кнопки "Войти через Telegram"
  const loginButton = document.getElementById("loginButton");

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      alert("Кнопка работает!");
      // Перенаправление на главную страницу
      window.location.href = "main.html";
    });
  } else {
    console.error("Кнопка #loginButton не найдена в DOM");
  }

  // Логика редактирования профиля
  const editProfileButton = document.getElementById("editProfileButton");
  const profileName = document.getElementById("profileName");
  const profilePhoto = document.getElementById("profilePhoto");

  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
      const newName = prompt(
        "Введите новое имя:",
        profileName?.textContent || "Пользователь"
      );
      if (newName) {
        profileName.textContent = newName;
      }

      const newPhotoUrl = prompt(
        "Введите URL нового фото:",
        profilePhoto?.src || ""
      );
      if (newPhotoUrl) {
        profilePhoto.src = newPhotoUrl;
      }
    });
  } else {
    console.warn(
      "Кнопка #editProfileButton не найдена. Логика редактирования профиля не будет работать."
    );
  }
});
