$(document).ready(function () {
  $('#hospitalSignUpForm').on('submit', function (event) {
    event.preventDefault();

    const phone = $('#hospitalPhone').val();

    // Validate that the contact number has exactly 11 digits
    const phoneDigitsOnly = phone.replace(/\D/g, "");
    if (phoneDigitsOnly.length !== 11) {
      alert("Contact number must be exactly 11 digits.");
      return;
    }

    alert("Hospital registration submitted successfully!");
    window.location.href = "../../index.html";
  });
});

// Handle back button click
const backBtn = document.getElementById("backBtn");
if (backBtn) {
  backBtn.addEventListener("click", function () {
    window.location.href = "../../index.html";
  });
}
