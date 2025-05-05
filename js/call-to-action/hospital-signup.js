$(document).ready(function () {
  $('#hospitalSignUpForm').on('submit', function (event) {
    event.preventDefault();

    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    const loginEmail = $('#loginEmail').val().toLowerCase();
    const officialEmail = $('#hospitalEmail').val().toLowerCase();
    const phone = $('#hospitalPhone').val();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const isValidPassword = (pwd) => {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(pwd);
      const hasLowerCase = /[a-z]/.test(pwd);
      const hasNumbers = /[0-9]/.test(pwd);
      const hasSpecialChar = /[!*$#?@]/.test(pwd);
      return (
        pwd.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar
      );
    };

    if (!isValidPassword(password)) {
      alert(
        "Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and at least one special character (! * $ # ? @)."
      );
      return;
    }

    const phoneDigitsOnly = phone.replace(/\D/g, "");
    if (phoneDigitsOnly.length !== 11) {
      alert("Contact number must be exactly 11 digits.");
      return;
    }

    alert("Hospital registration submitted successfully!");

    if (loginEmail.includes("westmetro")) {
      window.location.href = "../westmetro/westmetroAdmin.html";
    } else if (loginEmail.includes("ciudadmedical")) {
      window.location.href = "../ciudad/ciudadAdmin.html";
    } else {
      window.location.href = "../../index.html";
    }
  });
});

document.getElementById("backBtn").addEventListener("click", function () {
  window.location.href = "../../index.html"; 
});

