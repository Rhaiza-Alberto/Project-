$(document).ready(function () {
    $('#signupForm').on('submit', function (event) {
        event.preventDefault();

        const firstName = $('#First').val();
        const lastName = $('#Last').val();
        const middleName = $('#Middle').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword');

        function isValidPassword(password) {
            const minLength = 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /[0-9]/.test(password);
            const hasSpecialChar = /[!*$#?@]/.test(password);

            return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
        }

        if (password !== confirmPassword.val()) {
            confirmPassword.css('border-color', 'red');
            return;
        } else {
            confirmPassword.css('border-color', '');
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
            fullName: $.trim(fullName),
            email: email,
            password: password
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = "../patient/profile.html";
    });
});