// Save blood type from dashboard to localStorage
function saveChanges() {
  const bloodType = document.getElementById("blood-dash").value;
  localStorage.setItem("bloodType", bloodType);

  const alertPlaceholder = document.getElementById("save-alert");
  if (alertPlaceholder) {
    alertPlaceholder.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        Profile changes have been saved.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  } else {
    alert("Profile changes have been saved.");
  }
}

// Show tab sections using Bootstrap's display utility
function showSection(sectionId) {
  const sections = document.querySelectorAll(".tab-section");
  sections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.remove("d-none");
    } else {
      section.classList.add("d-none");
    }
  });
}

// Navigate to dashboard
function goToDashboard() {
  window.location.href = "dashboard.html";
}

// Navigate to profile
function goToProfile() {
  window.location.href = "profile.html";
}

// Sync blood type display on profile & dashboard
document.addEventListener("DOMContentLoaded", () => {
  const bloodDisplay = document.getElementById("blood-display");
  const bloodDropdown = document.getElementById("blood-dash");
  const stored = localStorage.getItem("bloodType");

  if (bloodDisplay) {
    bloodDisplay.textContent = stored || "Not Set";
  }

  if (bloodDropdown && stored) {
    bloodDropdown.value = stored;
  }
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (email && password) {
            // Set login flag
            localStorage.setItem('isLoggedIn', 'true');
            alert('Login successful!');
            window.location.href = '../../index.html'; // adjust if needed
        } else {
            alert('Please enter valid credentials.');
        }
    });
}

document.getElementById('backToLanding').addEventListener('click', function () {
  window.location.href = '../../index.html'; // Back to landing
});
