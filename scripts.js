document.addEventListener("DOMContentLoaded", () => {
  // Загружаем текущий рейтинг пользователя
  const ratingValue = document.getElementById("ratingValue");
  let currentRating = parseInt(localStorage.getItem("userRating") || "0", 10);

  // Отображаем рейтинг на странице
  if (ratingValue) {
    ratingValue.textContent = currentRating;
  }

  // Логика для страницы "Топ пользователей"
  const topUsersList = document.getElementById("topUsersList");

  if (topUsersList) {
    // Массив пользователей
    let topUsers = JSON.parse(localStorage.getItem("topUsers")) || [
      { name: "Анна", rating: 120 },
      { name: "Иван", rating: 95 },
      { name: "Мария", rating: 80 },
      { name: "Пётр", rating: 75 },
      { name: "Ольга", rating: 65 },
    ];

    // Добавляем текущего пользователя в топ
    const currentUserIndex = topUsers.findIndex((user) => user.name === "Вы");
    if (currentUserIndex === -1) {
      topUsers.push({ name: "Вы", rating: currentRating });
    } else {
      topUsers[currentUserIndex].rating = currentRating; // Обновляем рейтинг текущего пользователя
    }

    // Сортируем по рейтингу
    topUsers.sort((a, b) => b.rating - a.rating);

    // Сохраняем обновлённый список в localStorage
    localStorage.setItem("topUsers", JSON.stringify(topUsers));

    // Отображаем пользователей в списке
    topUsers.forEach((user, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${user.name} — ${user.rating} баллов`;
      topUsersList.appendChild(li);
    });
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

    taskList.addEventListener("click", (event) => {
      const task = event.target.closest("li");
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
