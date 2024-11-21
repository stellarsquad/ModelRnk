document.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("profileName");
  const editNameIcon = document.getElementById("editNameIcon");

  let currentName = localStorage.getItem("userName") || "Имя пользователя";

  // Устанавливаем имя при загрузке страницы
  if (profileName) profileName.textContent = currentName;

  // Обработчик для редактирования имени
  editNameIcon.addEventListener("click", () => {
    const newName = prompt("Введите новое имя:", currentName);
    if (newName && newName.trim() !== "") {
      currentName = newName.trim();
      profileName.textContent = currentName;
      localStorage.setItem("userName", currentName);
    }
  });
});

// --- Работа с заданиями ---
const taskList = document.getElementById("taskList");
const completeTaskButton = document.getElementById("completeTaskButton");

if (completeTaskButton && taskList) {
  completeTaskButton.addEventListener("click", () => {
    const firstTask = taskList.querySelector("li");
    if (firstTask) {
      const points = parseInt(firstTask.dataset.points, 10);
      const coins = points * 2; // Начисляем монеты за задание (2 монеты за 1 балл рейтинга)

      currentRating += points;
      currentBalance += coins;

      // Сохраняем обновлённые данные
      localStorage.setItem("userRating", currentRating);
      localStorage.setItem("userBalance", currentBalance);

      // Обновляем отображение
      if (ratingValue) ratingValue.textContent = currentRating;
      if (userBalanceElement) userBalanceElement.textContent = currentBalance;

      alert(
        `Вы выполнили задание "${firstTask.textContent}", получили ${points} баллов рейтинга и ${coins} монет!`
      );
      firstTask.remove();
    } else {
      alert("Все задания выполнены!");
    }
  });

  taskList.addEventListener("click", (event) => {
    const task = event.target.closest("li");
    if (task) {
      const points = parseInt(task.dataset.points, 10);
      const coins = points * 2;

      currentRating += points;
      currentBalance += coins;

      // Сохраняем обновлённые данные
      localStorage.setItem("userRating", currentRating);
      localStorage.setItem("userBalance", currentBalance);

      // Обновляем отображение
      if (ratingValue) ratingValue.textContent = currentRating;
      if (userBalanceElement) userBalanceElement.textContent = currentBalance;

      alert(
        `Вы выполнили задание "${task.textContent}", получили ${points} баллов рейтинга и ${coins} монет!`
      );
      task.remove();
    }
  });
}

// --- Баланс: Логика пополнения ---
const earnCoinsButton = document.getElementById("earnCoinsButton");
const buyCoinsButton = document.getElementById("buyCoinsButton");
const buyCoinsButton2 = document.getElementById("buyCoinsButton2");

if (earnCoinsButton) {
  earnCoinsButton.addEventListener("click", () => {
    const earnedCoins = 50; // Количество монет за нажатие
    currentBalance += earnedCoins;

    // Сохраняем обновлённый баланс
    localStorage.setItem("userBalance", currentBalance);

    // Обновляем отображение баланса
    if (userBalanceElement) {
      userBalanceElement.textContent = currentBalance;
    }

    alert(`Вы получили ${earnedCoins} монет!`);
  });
}

if (buyCoinsButton) {
  buyCoinsButton.addEventListener("click", () => {
    const coinsToAdd = parseInt(buyCoinsButton.dataset.amount, 10);
    currentBalance += coinsToAdd;
    localStorage.setItem("userBalance", currentBalance); // Сохраняем баланс
    if (userBalanceElement) {
      userBalanceElement.textContent = currentBalance; // Обновляем отображение
    }
    alert(`Вы успешно купили ${coinsToAdd} монет за 10 звёзд Telegram!`);
  });
}

if (buyCoinsButton2) {
  buyCoinsButton2.addEventListener("click", () => {
    const coinsToAdd = parseInt(buyCoinsButton2.dataset.amount, 10);
    currentBalance += coinsToAdd;
    localStorage.setItem("userBalance", currentBalance); // Сохраняем баланс
    if (userBalanceElement) {
      userBalanceElement.textContent = currentBalance; // Обновляем отображение
    }
    alert(`Вы успешно купили ${coinsToAdd} монет за 20 звёзд Telegram!`);
  });
}

// --- Топ пользователей ---
const topUsersList = document.getElementById("topUsersList");

if (topUsersList) {
  let topUsers = JSON.parse(localStorage.getItem("topUsers")) || [
    { name: "Анна", rating: 120 },
    { name: "Иван", rating: 95 },
    { name: "Мария", rating: 80 },
    { name: "Пётр", rating: 75 },
    { name: "Ольга", rating: 65 },
  ];

  // Добавляем текущего пользователя в список
  const currentUserIndex = topUsers.findIndex((user) => user.name === "Вы");
  if (currentUserIndex === -1) {
    topUsers.push({ name: "Вы", rating: currentRating });
  } else {
    topUsers[currentUserIndex].rating = currentRating; // Обновляем рейтинг текущего пользователя
  }

  // Сортируем пользователей по рейтингу
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
