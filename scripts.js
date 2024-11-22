document.addEventListener("DOMContentLoaded", () => {
  // Элементы профиля
  const profileName = document.getElementById("profileName");
  const editNameIcon = document.getElementById("editNameIcon");
  const profilePhoto = document.getElementById("profilePhoto");
  const uploadAvatar = document.getElementById("uploadAvatar");
  const ratingValue = document.getElementById("ratingValue");
  const userBalanceElement = document.getElementById("userBalance");
  const progressBarElement = document.getElementById("progressBar");
  const userLevelElement = document.getElementById("userLevel");

  // Переменные для рейтинга, уровня и баланса
  let currentRating = parseInt(localStorage.getItem("userRating") || "0", 10);
  let currentBalance = parseInt(localStorage.getItem("userBalance") || "0", 10);

  // Границы уровней
  const levels = [0, 100, 300, 600, 1000, 1500]; // Границы уровней

  // Инициализация данных из LocalStorage
  let currentName = localStorage.getItem("userName") || "Имя пользователя";
  let currentPhoto =
    localStorage.getItem("userPhoto") || "https://via.placeholder.com/150";

  // Установка начальных данных
  profileName.textContent = currentName;
  profilePhoto.src = currentPhoto;
  ratingValue.textContent = currentRating;
  userBalanceElement.textContent = currentBalance;

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
      event.preventDefault(); // Предотвращаем добавление новой строки
      profileName.blur(); // Завершаем редактирование
    }
  });

  // --- Загрузка нового аватара ---
  uploadAvatar.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhotoUrl = e.target.result;
          currentPhoto = newPhotoUrl;
          profilePhoto.src = newPhotoUrl;
          localStorage.setItem("userPhoto", newPhotoUrl);
          alert("Аватар успешно обновлён!");
        };
        reader.readAsDataURL(file);
      }
    });
    input.click();
  });

  // Обновление уровня и прогресса
  function updateLevel() {
    let userLevel = 1;
    let progress = 0;

    // Рассчитываем уровень пользователя
    for (let i = 0; i < levels.length; i++) {
      if (currentRating >= levels[i]) {
        userLevel = i + 1;
      } else {
        const prevLevel = levels[i - 1] || 0;
        const nextLevel = levels[i];
        progress =
          ((currentRating - prevLevel) / (nextLevel - prevLevel)) * 100;
        break;
      }
    }

    // Обновляем DOM
    userLevelElement.textContent = userLevel;
    progressBarElement.style.width = `${progress}%`;
  }

  // Инициализация уровня
  updateLevel();

  // --- Пример обновления рейтинга ---
  const taskList = document.getElementById("taskList");
  if (taskList) {
    taskList.addEventListener("click", (event) => {
      const task = event.target.closest("li");
      if (task) {
        const points = parseInt(task.dataset.points, 10);
        currentRating += points;

        localStorage.setItem("userRating", currentRating);
        ratingValue.textContent = currentRating;
        updateLevel(); // Обновляем уровень
        alert(`Вы выполнили задание и получили ${points} баллов!`);
        task.remove();
      }
    });
  }

  // --- Работа с балансом ---
  const earnCoinsButton = document.getElementById("earnCoinsButton");
  const buyCoinsButton = document.getElementById("buyCoinsButton");

  if (earnCoinsButton) {
    earnCoinsButton.addEventListener("click", () => {
      currentBalance += 50;
      localStorage.setItem("userBalance", currentBalance);
      userBalanceElement.textContent = currentBalance;
      alert("Вы получили 50 монет!");
    });
  }

  if (buyCoinsButton) {
    buyCoinsButton.addEventListener("click", () => {
      currentBalance += 100;
      localStorage.setItem("userBalance", currentBalance);
      userBalanceElement.textContent = currentBalance;
      alert("Вы купили 100 монет!");
    });
  }
});
