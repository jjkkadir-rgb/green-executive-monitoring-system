// Settings JS
console.log(

"SETTINGS Loaded"

);

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("role");
      window.location.href = "/green-executive-monitoring-system/login.html";
    });
  }
});
