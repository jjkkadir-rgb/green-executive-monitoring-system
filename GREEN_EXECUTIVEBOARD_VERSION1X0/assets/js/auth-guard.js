(function() {
  const role = localStorage.getItem("role");
  if (!role) {
    const redirectUrl = "/green-executive-monitoring-system/login.html";
    window.location.replace(redirectUrl);
  }
})();
