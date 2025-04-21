function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.style.display = section.id === id ? 'block' : 'none';
    });
  
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => link.classList.remove('active'));
  
    const activeLink = Array.from(links).find(link =>
      link.getAttribute('onclick')?.includes(id)
    );
    if (activeLink) activeLink.classList.add('active');
  }
  
  function searchPatients() {
    const input = document.getElementById("searchPatient");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("patientTable");
    const rows = table.getElementsByTagName("tr");
  
    Array.from(rows).forEach(row => {
      const nameCell = row.getElementsByTagName("td")[0];
      if (nameCell) {
        const name = nameCell.textContent || nameCell.innerText;
        row.style.display = name.toLowerCase().includes(filter) ? "" : "none";
      }
    });
  }
  
  function viewRecord(name) {
    alert(`Viewing full medical record for ${name}`);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    showSection("patients");
  });
  