document.addEventListener("DOMContentLoaded", () => {
  // Загружаем рейтинг из localStorage
  const ratingValue = document.getElementById("ratingValue");
  let currentRating = parseInt(localStorage.getItem("userRating") || "0", 10);

  // Отображаем рейтинг при загрузке страницы
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
