document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const backBtn = document.getElementById("backBtn");

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

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            let userType;

            if (email === users.admin) {
                userType = "admin";
            } else if (email === users.hospital.westmetro) {
                userType = "westmetro";
            } else if (email === users.hospital.ciudadmedical) {
                userType = "ciudadmedical";
            } else if (email.endsWith("@gmail.com")) {
                userType = "patient";
            } else {
                alert("Invalid email format. Please try again.");
                return;
            }

            if (!isValidPassword(password)) {
                alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
                return;
            }

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userType", userType);

            alert("Login successful!");

            if (userType === "patient") {
                window.location.href = "../patient/profile.html";
            } else if (userType === "westmetro") {
                window.location.href = "../westmetro/westmetroAdmin.html";
            } else if (userType === "ciudadmedical") {
                window.location.href = "../ciudad/ciudadAdmin.html";
            } else if (userType === "admin") {
                window.location.href = "../admin/admin.html";
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener("click", function () {
            window.location.href = "../../index.html";
        });
    }
});
