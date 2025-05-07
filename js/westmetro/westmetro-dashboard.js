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
  alert(`Medical Record for ${name}\n\nDiagnosis: ${details.diagnosis}\nTreatment: ${details.treatment}\nNotes: ${details.notes}`);
}

document.addEventListener("DOMContentLoaded", () => {
  showSection("patients");

document.getElementById('serviceFilter')?.addEventListener('change', function() {
    const table = $('#servicesTable').DataTable();
    table.column(0).search(this.value).draw();
});
document.getElementById('serviceFilter')?.addEventListener('change', function() {
    const table = $('#servicesTable').DataTable();
    table.column(0).search(this.value).draw();
});
document.getElementById('addServiceBtn')?.addEventListener('click', function() {
  // This would open a modal or form in a real implementation
  alert('Add New Service form would appear here');
  // In a real implementation, this would show a form to add new services
  // with fields for service type, patient selection, doctor assignment, etc.
});
  // ✅ Initialize DataTables on all 3 tables
  ['patientTable', 'appointmentsTable', 'recordsTable', 'servicesTable'].forEach(id => {
    const table = document.getElementById(id);
    if (table) {
      new DataTable(table, {
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        pageLength: 10,
        lengthMenu: [5, 10, 25, 50]
      });
    }
  });
});
