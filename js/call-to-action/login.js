document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('Login').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const users = {
            hospital: { email: "hospital@gmail.com" },
            admin: { email: "admin@gmail.com" }
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

        if (email.includes("admin")) {
            userType = 'admin';
        } else if (email.includes("hospital")) {
            userType = 'hospital';
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
            window.location.href = "patient-dashboard.html";
        } else if (users[userType] && users[userType].email === email) {
            if (userType === 'hospital') {
                window.location.href = "hospital-dashboard.html";
            } else if (userType === 'admin') {
                window.location.href = "../admin/admin.html";
            }
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
});
