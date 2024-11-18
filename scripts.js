const loginButton = document.getElementById("loginButton");

if (loginButton) {
  loginButton.addEventListener("click", () => {
    // Временно перенаправляем на главную страницу
    window.location.href = "main.html";
  });
}
