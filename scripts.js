document.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("profileName");
  const editNameIcon = document.getElementById("editNameIcon");
  const profilePhoto = document.getElementById("profilePhoto");
  const uploadAvatar = document.getElementById("uploadAvatar");
  const ratingValue = document.getElementById("ratingValue");
  const userBalanceElement = document.getElementById("userBalance");

  let currentName = localStorage.getItem("userName") || "Имя пользователя";
  let currentPhoto =
    localStorage.getItem("userPhoto") || "https://via.placeholder.com/150";
  let currentRating = parseInt(localStorage.getItem("userRating") || "0", 10);
  let currentBalance = parseInt(localStorage.getItem("userBalance") || "0", 10);

  // Устанавливаем данные при загрузке страницы
  profileName.textContent = currentName;
  profilePhoto.src = currentPhoto;
  if (ratingValue) ratingValue.textContent = currentRating;
  if (userBalanceElement) userBalanceElement.textContent = currentBalance;

  // --- Редактирование имени ---
  editNameIcon.addEventListener("click", () => {
    profileName.setAttribute("contenteditable", "true");
    profileName.focus(); // Устанавливаем фокус на имя
    editNameIcon.style.display = "none"; // Скрываем значок редактирования
  });

  profileName.addEventListener("blur", () => {
    const newName = profileName.textContent.trim();
    if (newName && newName !== currentName) {
      currentName = newName;
      localStorage.setItem("userName", currentName); // Сохраняем новое имя
    }
    profileName.setAttribute("contenteditable", "false");
    editNameIcon.style.display = "inline"; // Показываем значок обратно
  });

  profileName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Предотвращаем перенос строки
      profileName.blur(); // Завершаем редактирование
    }
  });

  // --- Загрузка нового аватара ---
  uploadAvatar.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhotoUrl = e.target.result;
        currentPhoto = newPhotoUrl;
        profilePhoto.src = newPhotoUrl; // Обновляем аватар на странице
        localStorage.setItem("userPhoto", newPhotoUrl); // Сохраняем в localStorage
        alert("Аватар успешно обновлён!");
      };
      reader.readAsDataURL(file);
    }
  });

  // --- Работа с рейтингом и балансом ---
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
});
