document.addEventListener("DOMContentLoaded", () => {
  // Логика для кнопки "Войти через Telegram"
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      // Временно перенаправляем на главную страницу
      window.location.href = "main.html";
    });
  }

  // Логика для редактирования профиля
  const editProfileButton = document.getElementById("editProfileButton");
  const profileName = document.getElementById("profileName");
  const profilePhoto = document.getElementById("profilePhoto");

  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
      const newName = prompt("Введите новое имя:", profileName.textContent);
      if (newName) {
        profileName.textContent = newName;
      }

      const newPhotoUrl = prompt("Введите URL нового фото:", profilePhoto.src);
      if (newPhotoUrl) {
        profilePhoto.src = newPhotoUrl;
      }
    });
  }
});
