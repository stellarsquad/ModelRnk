document.addEventListener("DOMContentLoaded", () => {
  const editProfileButton = document.getElementById("editProfileButton");
  const profileName = document.getElementById("profileName");
  const profilePhoto = document.getElementById("profilePhoto");

  // Обработка редактирования профиля
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
});
