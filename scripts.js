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
  document.addEventListener("DOMContentLoaded", () => {
    // Логика выполнения заданий
    const taskList = document.getElementById("taskList");
    const completeTaskButton = document.getElementById("completeTaskButton");
    const ratingValue = document.getElementById("ratingValue"); // Рейтинг с главной страницы

    let currentRating = parseInt(ratingValue?.textContent || "0", 10);

    if (completeTaskButton && taskList) {
      completeTaskButton.addEventListener("click", () => {
        const task = taskList.querySelector("li"); // Берём первое задание
        if (task) {
          const points = parseInt(task.dataset.points, 10); // Получаем баллы задания
          currentRating += points;
          if (ratingValue) ratingValue.textContent = currentRating; // Обновляем рейтинг
          alert(`Вы выполнили задание и получили ${points} баллов!`);
          task.remove(); // Удаляем выполненное задание
        } else {
          alert("Все задания выполнены!");
        }
      });
    }
  });
});
