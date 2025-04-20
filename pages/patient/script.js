// Save blood type from dashboard to localStorage
function saveChanges() {
    const bloodType = document.getElementById("blood-dash").value;
    localStorage.setItem("bloodType", bloodType);
    alert("Profile changes have been saved.");
  }
  
  // Show tab sections
  function showSection(sectionId) {
    const sections = document.querySelectorAll(".tab-section");
    sections.forEach(section => {
      section.style.display = section.id === sectionId ? "block" : "none";
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
  