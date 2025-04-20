let services = [
    {
        id: 1,
        name: "Emergency Care",
        icon: "🏥",
        details: [
            "24/7 emergency department",
            "Board-certified ER physicians",
            "Level III trauma center",
            "Average wait time: <15 minutes"
        ]
    },
    {
        id: 2,
        name: "Cardiology",
        icon: "❤️",
        details: [
            "Cardiac catheterization",
            "Echocardiography",
            "Stress testing",
            "Pacemaker implants"
        ]
    },
    {
        id: 3,
        name: "Pediatrics",
        icon: "👶",
        details: [
            "Well-child visits",
            "Vaccinations",
            "Asthma management",
            "Nutrition counseling"
        ]
    },
    {
        id: 4,
        name: "Neurology",
        icon: "🧠",
        details: [
            "EEG testing",
            "Stroke treatment",
            "Migraine management",
            "Epilepsy care"
        ]
    },
    {
        id: 5,
        name: "Orthopedics",
        icon: "🦴",
        details: [
            "Joint replacement",
            "Sports medicine",
            "Fracture care",
            "Arthroscopic surgery"
        ]
    },
    {
        id: 6,
        name: "Oncology",
        icon: "🦋",
        details: [
            "Chemotherapy",
            "Radiation therapy",
            "Cancer screening",
            "Supportive care"
        ]
    },
    {
        id: 7,
        name: "Gastroenterology",
        icon: "🧫",
        details: [
            "Colonoscopy",
            "Endoscopy",
            "IBD treatment",
            "Liver disease management"
        ]
    },
    {
        id: 8,
        name: "Pulmonology",
        icon: "🫁",
        details: [
            "Asthma treatment",
            "COPD management",
            "Sleep studies",
            "Bronchoscopy"
        ]
    },
    {
        id: 9,
        name: "Radiology",
        icon: "📷",
        details: [
            "MRI scans",
            "CT scans",
            "X-rays",
            "Ultrasound"
        ]
    },
    {
        id: 10,
        name: "General Surgery",
        icon: "🔪",
        details: [
            "Appendectomy",
            "Gallbladder removal",
            "Hernia repair",
            "Minimally invasive procedures"
        ]
    },
    {
        id: 11,
        name: "Nephrology",
        icon: "🩸",
        details: [
            "Dialysis services",
            "Kidney transplant",
            "Hypertension care",
            "Electrolyte management"
        ]
    },
    {
        id: 12,
        name: "Rheumatology",
        icon: "🦵",
        details: [
            "Arthritis treatment",
            "Lupus management",
            "Joint injections",
            "Autoimmune care"
        ]
    },
];

let doctors = [
    {
        id: 1,
        name: "Dr. Elena Vasquez",
        specialty: "Emergency Medicine",
        bio: "Trauma specialist with 12 years experience",
        image: "../../assets/images/westmetro/doctor1.jpg"
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Cardiology",
        bio: "Interventional cardiologist",
        image: "../../assets/images/westmetro/doctor2.jpg"
    },
    {
        id: 3,
        name: "Dr. Sarah Johnson",
        specialty: "Oncology",
        bio: "Breast cancer specialist",
        image: "../../assets/images/westmetro/doctor3.jpg"
    },
    {
        id: 4,
        name: "Dr. Thomas Wright",
        specialty: "Pulmonology",
        bio: "Sleep disorder expert",
        image: "../../assets/images/westmetro/doctor3.jpg"
    }

];

// Variables to track which service/doctor is being edited/deleted
let currentServiceId = null;
let currentDoctorId = null;

// DOM elements
const servicesContainer = document.getElementById('services-container');
const doctorsContainer = document.getElementById('doctors-container');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderServices();
    renderDoctors();
    setupEventListeners();
});

// Render all services
function renderServices() {
    servicesContainer.innerHTML = '';
    services.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesContainer.appendChild(serviceCard);
    });
}

// Create a service card element
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.dataset.id = service.id;
    
    const detailsList = service.details.map(detail => `<li>${detail}</li>`).join('');
    
    card.innerHTML = `
        <div class="service-header">
            <div class="service-icon">${service.icon}</div>
            <h3>${service.name}</h3>
        </div>
        <ul class="service-details">
            ${detailsList}
        </ul>
        <a href="#schedule" class="btn btn-primary">Book Consultation</a>
        <button class="edit-service-btn" onclick="openEditServiceModal(${service.id})">Edit</button>
        <button class="remove-service-btn" onclick="openDeleteServiceModal(${service.id})">Remove</button>
    `;
    
    return card;
}

// Render all doctors
function renderDoctors() {
    doctorsContainer.innerHTML = '';
    doctors.forEach(doctor => {
        const doctorCard = createDoctorCard(doctor);
        doctorsContainer.appendChild(doctorCard);
    });
}

// Create a doctor card element
function createDoctorCard(doctor) {
    const card = document.createElement('div');
    card.className = 'doctor-card';
    card.dataset.id = doctor.id;
    
    card.innerHTML = `
        <div class="doctor-image" style="background-image: url('${doctor.image}');"></div>
        <div class="doctor-info">
            <h3>${doctor.name}</h3>
            <p class="doctor-specialty">${doctor.specialty}</p>
            <p class="doctor-bio">${doctor.bio}</p>
            <a href="#schedule" class="btn btn-outline">Schedule</a>
        </div>
        <button class="edit-btn" onclick="openEditDoctorModal(${doctor.id})">Edit</button>
        <button class="remove-btn" onclick="openDeleteDoctorModal(${doctor.id})">Remove</button>
    `;
    
    return card;
}

// Setup event listeners for forms
function setupEventListeners() {
    // Add service form
    document.getElementById('addServiceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addService();
    });
    
    // Edit service form
    document.getElementById('editServiceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateService();
    });
    
    // Confirm service delete
    document.getElementById('confirm-service-delete').addEventListener('click', function() {
        deleteService();
    });
    
    // Add doctor form
    document.getElementById('addDoctorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addDoctor();
    });
    
    // Edit doctor form
    document.getElementById('editDoctorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateDoctor();
    });
    
    // Confirm doctor delete
    document.getElementById('confirm-doctor-delete').addEventListener('click', function() {
        deleteDoctor();
    });
}

// Tab navigation
function openTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show the selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Activate the clicked button
    event.currentTarget.classList.add('active');
}

// Modal functions
function openAddServiceModal() {
    document.getElementById('addServiceModal').style.display = 'flex';
}

function openEditServiceModal(id) {
    currentServiceId = id;
    const service = services.find(s => s.id === id);
    
    if (service) {
        document.getElementById('edit-service-id').value = service.id;
        document.getElementById('edit-service-name').value = service.name;
        document.getElementById('edit-service-icon').value = service.icon;
        document.getElementById('edit-service-details').value = service.details.join('\n');
        
        document.getElementById('editServiceModal').style.display = 'flex';
    }
}

function openDeleteServiceModal(id) {
    currentServiceId = id;
    document.getElementById('deleteServiceModal').style.display = 'flex';
}

function openAddDoctorModal() {
    document.getElementById('addDoctorModal').style.display = 'flex';
}

function openEditDoctorModal(id) {
    currentDoctorId = id;
    const doctor = doctors.find(d => d.id === id);
    
    if (doctor) {
        document.getElementById('edit-doctor-id').value = doctor.id;
        document.getElementById('edit-doctor-name').value = doctor.name;
        document.getElementById('edit-doctor-specialty').value = doctor.specialty;
        document.getElementById('edit-doctor-bio').value = doctor.bio;
        document.getElementById('edit-doctor-image').value = doctor.image;
        
        document.getElementById('editDoctorModal').style.display = 'flex';
    }
}

function openDeleteDoctorModal(id) {
    currentDoctorId = id;
    document.getElementById('deleteDoctorModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// CRUD operations for services
function addService() {
    const name = document.getElementById('service-name').value;
    const icon = document.getElementById('service-icon').value;
    const details = document.getElementById('service-details').value.split('\n');
    
    const newService = {
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
        name,
        icon,
        details
    };
    
    services.push(newService);
    renderServices();
    closeModal('addServiceModal');
    
    // Reset form
    document.getElementById('addServiceForm').reset();
}

function updateService() {
    const id = parseInt(document.getElementById('edit-service-id').value);
    const name = document.getElementById('edit-service-name').value;
    const icon = document.getElementById('edit-service-icon').value;
    const details = document.getElementById('edit-service-details').value.split('\n');
    
    const serviceIndex = services.findIndex(s => s.id === id);
    
    if (serviceIndex !== -1) {
        services[serviceIndex] = {
            id,
            name,
            icon,
            details
        };
        
        renderServices();
        closeModal('editServiceModal');
    }
}

function deleteService() {
    services = services.filter(s => s.id !== currentServiceId);
    renderServices();
    closeModal('deleteServiceModal');
    currentServiceId = null;
}

// CRUD operations for doctors
function addDoctor() {
    const name = document.getElementById('doctor-name').value;
    const specialty = document.getElementById('doctor-specialty').value;
    const bio = document.getElementById('doctor-bio').value;
    const image = document.getElementById('doctor-image').value;
    
    const newDoctor = {
        id: doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1,
        name,
        specialty,
        bio,
        image
    };
    
    doctors.push(newDoctor);
    renderDoctors();
    closeModal('addDoctorModal');
    
    // Reset form
    document.getElementById('addDoctorForm').reset();
}

function updateDoctor() {
    const id = parseInt(document.getElementById('edit-doctor-id').value);
    const name = document.getElementById('edit-doctor-name').value;
    const specialty = document.getElementById('edit-doctor-specialty').value;
    const bio = document.getElementById('edit-doctor-bio').value;
    const image = document.getElementById('edit-doctor-image').value;
    
    const doctorIndex = doctors.findIndex(d => d.id === id);
    
    if (doctorIndex !== -1) {
        doctors[doctorIndex] = {
            id,
            name,
            specialty,
            bio,
            image
        };
        
        renderDoctors();
        closeModal('editDoctorModal');
    }
}

function deleteDoctor() {
    doctors = doctors.filter(d => d.id !== currentDoctorId);
    renderDoctors();
    closeModal('deleteDoctorModal');
    currentDoctorId = null;
}

// Expose functions to global scope for HTML onclick attributes
window.openTab = openTab;
window.openAddServiceModal = openAddServiceModal;
window.openEditServiceModal = openEditServiceModal;
window.openDeleteServiceModal = openDeleteServiceModal;
window.openAddDoctorModal = openAddDoctorModal;
window.openEditDoctorModal = openEditDoctorModal;
window.openDeleteDoctorModal = openDeleteDoctorModal;
window.closeModal = closeModal;