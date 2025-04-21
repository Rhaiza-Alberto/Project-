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

function viewRecord(name) {
  alert(`Viewing full medical record for ${name}`);
}

document.addEventListener("DOMContentLoaded", () => {
  showSection("patients");

  // ✅ Initialize DataTables on all 3 tables
  ['patientTable', 'appointmentsTable', 'recordsTable'].forEach(id => {
    const table = document.getElementById(id);
    if (table) {
      new DataTable(table, {
        responsive: true,
        paging: true,
        searching: true,
        ordering: true
      });
    }
  });
});
