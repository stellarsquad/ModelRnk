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

  // Работа с заданиями
  const taskList = document.getElementById("taskList");
  const completeTaskButton = document.getElementById("completeTaskButton");

  // Работа с балансом
  const earnCoinsButton = document.getElementById("earnCoinsButton");
  const buyCoinsButton = document.getElementById("buyCoinsButton");
  const buyCoinsButton2 = document.getElementById("buyCoinsButton2");

  // Переменные для рейтинга, уровня и баланса
  let currentRating = parseInt(localStorage.getItem("userRating") || "0", 10);
  let currentBalance = parseInt(localStorage.getItem("userBalance") || "0", 10);
  const levels = [0, 100, 300, 600, 1000, 1500]; // Границы уровней

  // Инициализация данных из LocalStorage
  let currentName = localStorage.getItem("userName") || "Имя пользователя";
  let currentPhoto =
    localStorage.getItem("userPhoto") || "https://via.placeholder.com/150";

  // Установка начальных данных
  if (profileName) profileName.textContent = currentName;
  if (profilePhoto) profilePhoto.src = currentPhoto;
  if (ratingValue) ratingValue.textContent = currentRating;
  if (userBalanceElement) userBalanceElement.textContent = currentBalance;

  // --- Обновление уровня и прогресса ---
  function updateLevel() {
    let userLevel = 1;
    let progress = 0;

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
    if (userLevelElement) userLevelElement.textContent = userLevel;
    if (progressBarElement) progressBarElement.style.width = `${progress}%`;
  }

  // Инициализация уровня
  updateLevel();

  // --- Редактирование имени ---
  if (editNameIcon) {
    editNameIcon.addEventListener("click", () => {
      profileName.setAttribute("contenteditable", "true");
      profileName.focus();
      editNameIcon.style.display = "none";
    });

    profileName.addEventListener("blur", () => {
      const newName = profileName.textContent.trim();
      if (newName && newName !== currentName) {
        currentName = newName;
        localStorage.setItem("userName", currentName);
      }
      profileName.setAttribute("contenteditable", "false");
      editNameIcon.style.display = "inline";
    });

    profileName.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        profileName.blur();
      }
    });
  }

  // --- Загрузка нового аватара ---
  if (uploadAvatar) {
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
  }

  // --- Работа с заданиями ---
  if (taskList && completeTaskButton) {
    completeTaskButton.addEventListener("click", () => {
      const firstTask = taskList.querySelector("li");
      if (firstTask) {
        const points = parseInt(firstTask.dataset.points, 10);
        currentRating += points;

        localStorage.setItem("userRating", currentRating);
        if (ratingValue) ratingValue.textContent = currentRating;
        updateLevel();
        alert(`Вы выполнили задание и получили ${points} баллов!`);
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
        if (ratingValue) ratingValue.textContent = currentRating;
        updateLevel();
        alert(`Вы выполнили задание и получили ${points} баллов!`);
        task.remove();
      }
    });
  }

  // --- Работа с балансом ---
  if (userBalanceElement && earnCoinsButton) {
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

  if (buyCoinsButton2) {
    buyCoinsButton2.addEventListener("click", () => {
      currentBalance += 200;
      localStorage.setItem("userBalance", currentBalance);
      userBalanceElement.textContent = currentBalance;
      alert("Вы купили 200 монет!");
    });
  }
});
