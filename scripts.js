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
    topUsers.push({ name: "Вы", rating: currentRating });

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
});
