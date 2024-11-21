document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");
  const completeTaskButton = document.getElementById("completeTaskButton");
  const userBalanceElement = document.getElementById("userBalance");
  const earnCoinsButton = document.getElementById("earnCoinsButton");
  const buyCoinsButton = document.getElementById("buyCoinsButton");
  const buyCoinsButton2 = document.getElementById("buyCoinsButton2");
  const topUsersList = document.getElementById("topUsersList");

  let currentRating = parseInt(localStorage.getItem("userRating") || "0", 10);
  let currentBalance = parseInt(localStorage.getItem("userBalance") || "0", 10);

  // --- Задания ---
  if (taskList && completeTaskButton) {
    completeTaskButton.addEventListener("click", () => {
      const firstTask = taskList.querySelector("li");
      if (firstTask) {
        const points = parseInt(firstTask.dataset.points, 10);
        currentRating += points;

        localStorage.setItem("userRating", currentRating);
        alert(
          `Вы выполнили задание "${firstTask.textContent}" и получили ${points} баллов!`
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
        currentRating += points;

        localStorage.setItem("userRating", currentRating);
        alert(
          `Вы выполнили задание "${task.textContent}" и получили ${points} баллов!`
        );
        task.remove();
      }
    });
  }

  // --- Баланс ---
  if (userBalanceElement && earnCoinsButton) {
    userBalanceElement.textContent = currentBalance;

    earnCoinsButton.addEventListener("click", () => {
      currentBalance += 50;
      localStorage.setItem("userBalance", currentBalance);
      userBalanceElement.textContent = currentBalance;
      alert("Вы получили 50 монет!");
    });

    if (buyCoinsButton) {
      buyCoinsButton.addEventListener("click", () => {
        currentBalance += 100;
        localStorage.setItem("userBalance", currentBalance);
        userBalanceElement.textContent = currentBalance;
        alert("Вы купили 100 монет!");
      });
    }

    if (buyCoinsButton2) {
      buyCoinsButton2.addEventListener("click", () => {
        currentBalance += 200;
        localStorage.setItem("userBalance", currentBalance);
        userBalanceElement.textContent = currentBalance;
        alert("Вы купили 200 монет!");
      });
    }
  }

  // --- Топ пользователей ---
  if (topUsersList) {
    let topUsers = JSON.parse(localStorage.getItem("topUsers")) || [
      { name: "Анна", rating: 120 },
      { name: "Иван", rating: 95 },
      { name: "Мария", rating: 80 },
      { name: "Пётр", rating: 75 },
      { name: "Ольга", rating: 65 },
    ];

    topUsers.push({ name: "Вы", rating: currentRating });
    topUsers.sort((a, b) => b.rating - a.rating);
    localStorage.setItem("topUsers", JSON.stringify(topUsers));

    topUsers.forEach((user, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${user.name} — ${user.rating} баллов`;
      topUsersList.appendChild(li);
    });
  }
});
