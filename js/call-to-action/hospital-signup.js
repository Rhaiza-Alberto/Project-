document.getElementById('hospitalSignUpForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const loginEmail = document.getElementById('loginEmail').value;
    const officialEmail = document.getElementById('hospitalEmail').value;
    const phone = document.getElementById('hospitalPhone').value;

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
        return pwd.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    };

    if (!isValidPassword(password)) {
        alert("Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and at least one special character (! * $ # ? @).");
        return;
    }

    const checkHospitalEmail = (email, label) => {
        if (!email.toLowerCase().includes('hospital')) {
            alert(`${label} must contain the word 'hospital'.`);
            return false;
        }
        return true;
    };

    if (!checkHospitalEmail(loginEmail, "Login email") || !checkHospitalEmail(officialEmail, "Official email")) {
        return;
    }

    const phoneDigitsOnly = phone.replace(/\D/g, '');
    if (phoneDigitsOnly.length !== 11) {
        alert("Contact number must be exactly 11 digits.");
        return;
    }

    alert("Hospital registration submitted successfully!");
    window.location.href = "login.html";
});
