document.addEventListener("DOMContentLoaded", () => {
  // Логика для кнопки "Войти через Telegram"
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      alert("Кнопка работает!");
      window.location.href = "main.html"; // Перенаправление на главную страницу
    });
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
  }

  // Логика работы с рейтингом
  const ratingValue = document.getElementById("ratingValue"); // Элемент для отображения рейтинга
  let currentRating = parseInt(localStorage.getItem("userRating") || "0", 10); // Загружаем рейтинг из localStorage

  // Отображаем текущий рейтинг при загрузке страницы
  if (ratingValue) {
    ratingValue.textContent = currentRating;
  }

  // Логика выполнения заданий
  const taskList = document.getElementById("taskList");
  const completeTaskButton = document.getElementById("completeTaskButton");

  if (completeTaskButton && taskList) {
    completeTaskButton.addEventListener("click", () => {
      const firstTask = taskList.querySelector("li"); // Берём первое задание
      if (firstTask) {
        const points = parseInt(firstTask.dataset.points, 10); // Получаем баллы задания
        currentRating += points;
        localStorage.setItem("userRating", currentRating); // Сохраняем рейтинг в localStorage
        if (ratingValue) {
          ratingValue.textContent = currentRating; // Обновляем рейтинг на странице
        }
        alert(
          `Вы выполнили задание "${firstTask.textContent}" и получили ${points} баллов!`
        );
        firstTask.remove(); // Удаляем выполненное задание из списка
      } else {
        alert("Все задания выполнены!");
      }
    });

    // Обработчик для клика по каждому заданию
    taskList.addEventListener("click", (event) => {
      const task = event.target.closest("li"); // Определяем, на какое задание кликнули
      if (task) {
        const points = parseInt(task.dataset.points, 10);
        currentRating += points;
        localStorage.setItem("userRating", currentRating); // Сохраняем рейтинг в localStorage
        if (ratingValue) {
          ratingValue.textContent = currentRating; // Обновляем рейтинг
        }
        alert(
          `Вы выполнили задание "${task.textContent}" и получили ${points} баллов!`
        );
        task.remove(); // Удаляем задание
      }
    });
  }
});
