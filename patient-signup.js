document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('First').value;
    const lastName = document.getElementById('Last').value;
    const middleName = document.getElementById('Middle').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword');

    function isValidPassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecialChar = /[!*$#?@]/.test(password);
        
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    }

    if (password !== confirmPassword.value) {
        confirmPassword.style.borderColor = 'red'; 
        return;
    } else {
        confirmPassword.style.borderColor = ''; 
    }

    if (!isValidPassword(password)) {
        alert("Password must be at least 8 characters long, contain uppercase and lowercase letters, numbers, and at least one special character (!*$#?@).");
        return;
    }

    let fullName = firstName;

    if (middleName) {
        fullName += ` ${middleName}`; 
    }
    fullName += ` ${lastName}`;

    const userData = {
        fullName: fullName.trim(),
        email: email,
        password: password
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    window.location.href = "Register/patient.html";
});