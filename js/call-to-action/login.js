$(document).ready(function () {
    $('#Login').on('submit', function (event) {
        event.preventDefault();

        const email = $('#loginEmail').val().trim();
        const password = $('#loginPassword').val();

        const users = {
            hospital: {
                westmetro: "westmetro@gmail.com",
                ciudadmedical: "ciudadmedical@gmail.com"
            },
            admin: "admin@gmail.com"
        };

        const isValidPassword = (pwd) => {
            const minLength = 8;
            const hasUpperCase = /[A-Z]/.test(pwd);
            const hasLowerCase = /[a-z]/.test(pwd);
            const hasNumbers = /[0-9]/.test(pwd);
            const hasSpecialChar = /[!*$#?@]/.test(pwd);
            return pwd.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
        };

        let userType;

        if (email === users.admin) {
            userType = 'admin';
        } else if (email === users.hospital.westmetro) {
            userType = 'westmetro';
        } else if (email === users.hospital.ciudadmedical) {
            userType = 'ciudadmedical';
        } else if (email.endsWith("@gmail.com")) {
            userType = 'patient';
        } else {
            alert("Invalid email format. Please try again.");
            return;
        }

        if (!isValidPassword(password)) {
            alert("Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and at least one special character (! * $ # ? @).");
            return;
        }
        if (userType === 'patient') {
            window.location.href = "../patient/profile.html";
        } else if (userType === 'westmetro') {
            window.location.href = "../westmetro/westmetroAdmin.html";
        } else if (userType === 'ciudadmedical') {
            window.location.href = "../ciudad/ciudadAdmin.html";
            } else if (userType === 'admin') {
                window.location.href = "../admin/admin.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
  
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      alert('Login successful!');
      window.location.href = '../../index.html'; // ✅ redirect to landing
    } else {
      alert('Please enter email and password.');
    }
  });