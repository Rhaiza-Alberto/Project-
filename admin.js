window.onload = () => {
  showSection('approvals');
  loadHospitalTable();
};

function loadHospitalTable() {
  console.log('Loading hospital table...');
  const tableBody = document.querySelector('#hospitalTable tbody');
  const registrations = [
    { hospitalName: "Zamboanga City Medical Center", status: "pending", loginEmail: "zcmc@example.com" },
    { hospitalName: "Brent Hospital and Colleges Inc.", status: "approved", loginEmail: "brent@example.com" },
    { hospitalName: "Ciudad Medical Zamboanga", status: "rejected", loginEmail: "cmz@example.com" }
  ];

  tableBody.innerHTML = '';

  registrations.forEach((reg) => {
    const row = document.createElement('tr');
    row.dataset.status = reg.status;
    row.dataset.email = reg.loginEmail;

    row.innerHTML = `
      <td>${reg.hospitalName || 'N/A'}</td>
      <td>
        <a href="#">DOH Cert</a> |
        <a href="#">Business Permit</a> |
        <a href="#">Logo</a>
      </td>
      <td class="status status-${reg.status}">${capitalize(reg.status)}</td>
      <td>
        <button onclick="updateRegistrationStatus(this, 'approved')">Approve</button>
        <button onclick="updateRegistrationStatus(this, 'rejected')">Reject</button>
        <button onclick="deleteRegistration(this)">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function updateRegistrationStatus(btn, status) {
  console.log(`Button clicked: Changing status to ${status}`);
  const row = btn.closest('tr');
  row.dataset.status = status;
  const statusCell = row.querySelector('.status');
  statusCell.textContent = capitalize(status);
  statusCell.className = `status status-${status}`;
}

function deleteRegistration(button) {
  console.log('Deleting registration...');
  const row = button.closest('tr');
  row.remove();
  alert("Hospital registration deleted successfully.");
}

function deleteUser(button) {
  console.log('Deleting user...');
  const row = button.closest('tr');
  row.remove();
  alert("User deleted successfully.");
}

function toggleUserStatus(button) {
  console.log('Toggling user status...');
  const row = button.closest('tr');
  const statusCell = row.querySelector('.status');
  const currentStatus = row.dataset.status;
  
  if (currentStatus === 'active') {
    row.dataset.status = 'inactive';
    statusCell.textContent = 'Inactive';
    statusCell.className = 'status status-inactive';
    button.textContent = 'Activate';
  } else {
    row.dataset.status = 'active';
    statusCell.textContent = 'Active';
    statusCell.className = 'status status-active';
    button.textContent = 'Deactivate';
  }
}

function searchUsers() {
  console.log("Searching for users...");
  const searchInput = document.getElementById('userSearch').value.toLowerCase();
  const rows = document.querySelectorAll('#userTable tbody tr');

  rows.forEach(row => {
    const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
    const email = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

    if (name.includes(searchInput) || email.includes(searchInput)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function filterStatus() {
  const filterValue = document.getElementById('filter').value;
  const rows = document.querySelectorAll('#hospitalTable tbody tr');

  rows.forEach(row => {
    const status = row.dataset.status;

    if (filterValue === 'all' || filterValue === status) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function showSection(sectionId) {
  console.log('Showing section:', sectionId);
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';

  document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
  document.querySelector(`.sidebar a[onclick*="${sectionId}"]`).classList.add('active');
}

function logout() {
  window.location.href = "login.html";
}

function exportActivity() {
  console.log("Exporting activity log...");
  alert("Activity log exported successfully.");
}
