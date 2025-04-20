let services = [
    {
        id: 1,
        name: "Dental Care",
        icon: "🦷",
        details: [
            "Teeth cleaning & whitening",
            "Dental implants",
            "Orthodontics",
            "Pediatric dentistry"
        ]
    },
    {
        id: 2,
        name: "Laboratory Services",
        icon: "🔬",
        details: [
            "Blood tests",
            "Urinalysis",
            "Microbiology",
            "Pathology"
        ]
    },
    {
        id: 3,
        name: "Pharmacy",
        icon: "💊",
        details: [
            "Prescription fulfillment",
            "OTC medications",
            "Compounding services",
            "Free delivery within city"
        ]
    },
    {
        id: 4,
        name: "Pediatrics",
        icon: "👶",
        details: [
            "Well-child checkups",
            "Vaccinations",
            "Asthma management",
            "Nutrition counseling"
        ]
    },
    {
        id: 5,
        name: "Cardiology",
        icon: "❤️",
        details: [
            "Echocardiography",
            "Stress testing",
            "Holter monitoring",
            "Cardiac rehabilitation"
        ]
    },
    {
        id: 6,
        name: "Dermatology",
        icon: "🧴",
        details: [
            "Acne treatment",
            "Skin cancer screening",
            "Psoriasis management",
            "Cosmetic procedures"
        ]
    },
    {
        id: 7,
        name: "Ophthalmology",
        icon: "👁️",
        details: [
            "Eye exams",
            "Cataract screening",
            "Glaucoma treatment",
            "LASIK consultations"
        ]
    },
    {
        id: 8,
        name: "Physical Therapy",
        icon: "🦿",
        details: [
            "Post-surgical rehab",
            "Sports injury recovery",
            "Chronic pain management",
            "Stroke rehabilitation"
        ]
    },
    {
        id: 9,
        name: "Maternity Care",
        icon: "🤰",
        details: [
            "Prenatal checkups",
            "Ultrasound services",
            "Childbirth classes",
            "Postpartum care"
        ]
    },
    {
        id: 10,
        name: "ENT Services",
        icon: "👂",
        details: [
            "Hearing tests",
            "Tonsillectomy",
            "Sinus treatment",
            "Allergy management"
        ]
    },
    {
        id: 11,
        name: "Internal Medicine",
        icon: "🩺",
        details: [
            "Chronic disease management",
            "Health screenings",
            "Preventive care",
            "Geriatric consultations"
        ]
    },
    {
        id: 12,
        name: "Mental Health",
        icon: "🧠",
        details: [
            "Psychiatric evaluations",
            "Anxiety/depression treatment",
            "Counseling services",
            "Stress management"
        ]
    },
];

let doctors = [
    {
        id: 1,
        name: "Dr. Maria Santos",
        specialty: "Cardiology",
        bio: "15+ years experience in interventional cardiology",
        image: "../../assets/images/ciudad/doctor5.jpg"
    },
    {
        id: 2,
        name: "Dr. James Lim",
        specialty: "Pediatrics",
        bio: "Specializes in childhood immunology",
        image: "../../assets/images/ciudad/doctor6.jpg"
    },
    {
        id: 3,
        name: "Dr. Sofia Reyes",
        specialty: "Dermatology",
        bio: "Cosmetic dermatology specialist",
        image: "../../assets/images/ciudad/doctor7.jpg"
    },
    {
        id: 4,
        name: "Dr. Roberto Cruz",
        specialty: "ENT",
        bio: "Hearing restoration expert",
        image: "../../assets/images/ciudad/doctor8.jpg"
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

function toggleService(id) {
    const serviceIndex = services.findIndex(s => s.id === id);
    if (serviceIndex !== -1) {
        services[serviceIndex].active = !services[serviceIndex].active;
        renderServices();
    }
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

services = services.map(service => {
    if (service.active === undefined) {
        service.active = true;
    }
    return service;
});

// CRUD operations for services
function addService() {
    const name = document.getElementById('service-name').value;
    const icon = document.getElementById('service-icon').value;
    const details = document.getElementById('service-details').value.split('\n');
    
    const newService = {
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
        name,
        icon,
        details,
        active: true // Default to active when adding new service
    };
    
    services.push(newService);
    renderServices();
    closeModal('addServiceModal');
    
    // Reset form
    document.getElementById('addServiceForm').reset();
}
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = `service-card ${service.active ? '' : 'inactive'}`;
    card.dataset.id = service.id;
    
    const detailsList = service.details.map(detail => `<li>${detail}</li>`).join('');
    
    card.innerHTML = `
        <div class="service-header">
            <div class="service-icon">${service.icon}</div>
            <h3>${service.name}</h3>
            <span class="status-badge">${service.active ? 'Active' : 'Inactive'}</span>
        </div>
        <ul class="service-details">
            ${detailsList}
        </ul>
        <a href="#schedule" class="btn btn-primary">Book Consultation</a>
        <button class="toggle-service-btn" onclick="toggleService(${service.id})">
            ${service.active ? 'Deactivate' : 'Activate'}
        </button>
        <button class="edit-service-btn" onclick="openEditServiceModal(${service.id})">Edit</button>
        <button class="remove-service-btn" onclick="openDeleteServiceModal(${service.id})">Remove</button>
    `;
    
    return card;
}

// Add the toggleService function
function toggleService(id) {
    const serviceIndex = services.findIndex(s => s.id === id);
    if (serviceIndex !== -1) {
        services[serviceIndex].active = !services[serviceIndex].active;
        renderServices();
    }
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
            details,
            active: services[serviceIndex].active // Preserve the active status
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
window.toggleService = toggleService;
window.closeModal = closeModal;