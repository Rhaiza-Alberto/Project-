
// Sample data for the dashboard
let services = [
    {
        id: "S001",
        name: "Laboratory Services",
        description: "Comprehensive cardiac evaluation including ECG and stress test.",
        image: "https://via.placeholder.com/400x200?text=Cardiac+Checkup",
        department: "Laboratory",
        doctor: "D003",
        availability: "Mon-Fri, 9AM-5PM",
        price: "$200-$500",
        duration: "1 hour",
        requirements: "Insurance card, Previous medical records, Fasting for 8 hours",
        status: "Active",
        appointments: 12,
        lastUpdated: "2023-10-15"
    },
    {
        id: "S002",
        name: "Pediatric Consultation",
        description: "General pediatric consultation for children up to 18 years.",
        image: "https://via.placeholder.com/400x200?text=Pediatric+Consultation",
        department: "Pediatrics",
        doctor: "D002",
        availability: "Mon-Sat, 8AM-6PM",
        price: "$100-$150",
        duration: "30 minutes",
        requirements: "Insurance card, Vaccination records",
        status: "Active",
        appointments: 24,
        lastUpdated: "2023-10-10"
    },
    {
        id: "S003",
        name: "Cardiology",
        description: "Magnetic Resonance Imaging for detailed internal scans.",
        image: "https://via.placeholder.com/400x200?text=MRI+Scan",
        department: "Radiology",
        doctor: "D004",
        availability: "Mon-Fri, 7AM-9PM",
        price: "$800-$1200",
        duration: "45 minutes",
        requirements: "Doctor's referral, No metal objects",
        status: "Active",
        appointments: 8,
        lastUpdated: "2023-10-05"
    }
];

let doctors = [
    {
        id: "D001",
        name: "Dr. Sarah Johnson",
        specialty: "Neurology",
        department: "Neurology",
        schedule: "Mon-Wed-Fri, 9AM-4PM",
        status: "Active",
        assignedServices: ["S005"]
    },
    {
        id: "D002",
        name: "Dr. Michael Chen",
        specialty: "Pediatrics",
        department: "Pediatrics",
        schedule: "Mon-Sat, 8AM-6PM",
        status: "Active",
        assignedServices: ["S002"]
    },
    {
        id: "D003",
        name: "Dr. Robert Williams",
        specialty: "Cardiology",
        department: "Cardiology",
        schedule: "Mon-Fri, 9AM-5PM",
        status: "Active",
        assignedServices: ["S001"]
    },
    {
        id: "D004",
        name: "Dr. Lisa Rodriguez",
        specialty: "Radiology",
        department: "Radiology",
        schedule: "Mon-Fri, 7AM-9PM",
        status: "Active",
        assignedServices: ["S003"]
    }
];

let appointments = [
    {
        id: "A001",
        patientName: "John Smith",
        service: "S001",
        doctor: "D003",
        date: "2023-11-15",
        time: "10:00",
        status: "Confirmed"
    },
    {
        id: "A002",
        patientName: "Emily Davis",
        service: "S002",
        doctor: "D002",
        date: "2023-11-16",
        time: "14:30",
        status: "Pending"
    },
    {
        id: "A003",
        patientName: "James Wilson",
        service: "S003",
        doctor: "D004",
        date: "2023-11-17",
        time: "15:45",
        status: "Completed"
    }
];

// DOM elements
const servicesTableBody = document.getElementById('servicesTableBody');
const doctorsTableBody = document.getElementById('doctorsTableBody');
const appointmentsTableBody = document.getElementById('appointmentsTableBody');
const bookingOptions = document.getElementById('bookingOptions');
const serviceInfoContainer = document.getElementById('serviceInfoContainer');

// Current selected service for doctor assignment
let currentServiceForAssignment = null;

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderServicesTable();
    renderDoctorsTable();
    renderAppointmentsTable();
    renderBookingOptions();
    
    // Load design preferences if they exist
    loadDesignPreferences();
    
    // Event listeners for modals
    document.getElementById('addServiceBtn').addEventListener('click', () => openServiceModal('add'));
    document.getElementById('addDoctorBtn').addEventListener('click', () => openDoctorModal('add'));
    document.getElementById('addAppointmentBtn').addEventListener('click', () => openAppointmentModal('add'));
    document.getElementById('editServiceInfoBtn').addEventListener('click', () => editCurrentServiceInfo());
    
    // Form submissions
    document.getElementById('serviceForm').addEventListener('submit', handleServiceFormSubmit);
    document.getElementById('doctorForm').addEventListener('submit', handleDoctorFormSubmit);
    document.getElementById('appointmentForm').addEventListener('submit', handleAppointmentFormSubmit);
    document.getElementById('patientBookingForm').addEventListener('submit', handleBookingFormSubmit);
});

// Tab navigation
function showSection(sectionId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Deactivate all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(sectionId).classList.add('active');
    
    // Activate selected tab button
    document.querySelector(`.tab-btn[data-tab="${sectionId}"]`).classList.add('active');
    
    // Hide service info container when switching tabs
    serviceInfoContainer.style.display = 'none';
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (!isExpanded) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

// Render services table
function renderServicesTable() {
    servicesTableBody.innerHTML = '';
    
    services.forEach(service => {
        const doctor = doctors.find(d => d.id === service.doctor);
        const doctorName = doctor ? doctor.name : 'Not assigned';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.id}</td>
            <td>${service.name}</td>
            <td>${service.department}</td>
            <td class="doctor-assignment">
                ${doctorName}
                <button class="assign-btn" onclick="openAssignDoctorModal('${service.id}')">Change</button>
            </td>
            <td>${service.availability}</td>
            <td><span class="status-${service.status.toLowerCase()}">${service.status}</span></td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="openServiceModal('edit', '${service.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteService('${service.id}')"><i class="fas fa-trash"></i></button>
                <button class="btn-accent" onclick="showServiceInfo('${service.id}')">View</button>
            </td>
        `;
        
        servicesTableBody.appendChild(row);
    });
}

// Render doctors table
function renderDoctorsTable() {
    doctorsTableBody.innerHTML = '';
    
    doctors.forEach(doctor => {
        const assignedServices = doctor.assignedServices.map(serviceId => {
            const service = services.find(s => s.id === serviceId);
            return service ? service.name : 'Unknown Service';
        }).join(', ');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialty}</td>
            <td>${doctor.department}</td>
            <td>${assignedServices || 'None'}</td>
            <td>${doctor.schedule}</td>
            <td><span class="status-${doctor.status.toLowerCase()}">${doctor.status}</span></td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="openDoctorModal('edit', '${doctor.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteDoctor('${doctor.id}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        doctorsTableBody.appendChild(row);
    });
}

// Render appointments table
function renderAppointmentsTable() {
    appointmentsTableBody.innerHTML = '';
    
    appointments.forEach(appointment => {
        const service = services.find(s => s.id === appointment.service);
        const doctor = doctors.find(d => d.id === appointment.doctor);
        
        const serviceName = service ? service.name : 'Unknown Service';
        const doctorName = doctor ? doctor.name : 'Unknown Doctor';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.patientName}</td>
            <td>${serviceName}</td>
            <td>${doctorName}</td>
            <td>${appointment.date} at ${appointment.time}</td>
            <td><span class="status-${appointment.status.toLowerCase()}">${appointment.status}</span></td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="openAppointmentModal('edit', '${appointment.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteAppointment('${appointment.id}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        appointmentsTableBody.appendChild(row);
    });
}

// Render booking options
function renderBookingOptions() {
    bookingOptions.innerHTML = '';
    
    services.filter(service => service.status === 'Active').forEach(service => {
        const doctor = doctors.find(d => d.id === service.doctor);
        const doctorName = doctor ? doctor.name : 'Not assigned';
        
        const card = document.createElement('div');
        card.className = 'booking-card';
        card.innerHTML = `
            <h4>${service.name}</h4>
            <p><strong>Department:</strong> ${service.department}</p>
            <p><strong>Doctor:</strong> ${doctorName}</p>
            <p><strong>Availability:</strong> ${service.availability}</p>
            <p><strong>Duration:</strong> ${service.duration}</p>
            <p><strong>Price:</strong> ${service.price}</p>
            <button class="save-btn" onclick="showBookingForm('${service.id}')">Book Now</button>
        `;
        
        bookingOptions.appendChild(card);
    });
}

// Show service information
function showServiceInfo(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    const doctor = doctors.find(d => d.id === service.doctor);
    
    // Update service info container
    document.getElementById('serviceInfoTitle').textContent = service.name;
    document.getElementById('serviceInfoImage').src = service.image;
    document.getElementById('serviceInfoImage').alt = service.name;
    document.getElementById('serviceInfoDescription').textContent = service.description;
    document.getElementById('serviceInfoDept').textContent = service.department;
    document.getElementById('serviceInfoAvailability').textContent = service.availability;
    document.getElementById('serviceInfoDoctor').textContent = doctor ? doctor.name : 'Not assigned';
    document.getElementById('serviceInfoPrice').textContent = service.price;
    document.getElementById('serviceInfoDuration').textContent = service.duration;
    document.getElementById('serviceInfoStatus').textContent = service.status;
    document.getElementById('serviceInfoStatus').className = `status-${service.status.toLowerCase()}`;
    document.getElementById('serviceInfoUpdated').textContent = service.lastUpdated || 'Never';
    document.getElementById('serviceInfoAppointments').textContent = service.appointments || 0;
    
    // Update requirements list
    const requirementsList = document.getElementById('serviceInfoRequirements');
    requirementsList.innerHTML = '';
    
    if (service.requirements) {
        service.requirements.split(',').forEach(req => {
            const li = document.createElement('li');
            li.textContent = req.trim();
            requirementsList.appendChild(li);
        });
    }
    
    // Show the container
    serviceInfoContainer.style.display = 'block';
    
    // Scroll to the container
    serviceInfoContainer.scrollIntoView({ behavior: 'smooth' });
}

// Edit current service info
function editCurrentServiceInfo() {
    const serviceTitle = document.getElementById('serviceInfoTitle').textContent;
    const service = services.find(s => s.name === serviceTitle);
    if (service) {
        openServiceModal('edit', service.id);
    }
}

// Open service modal
function openServiceModal(action, serviceId = null) {
    const modal = document.getElementById('serviceModal');
    const form = document.getElementById('serviceForm');
    
    if (action === 'add') {
        document.getElementById('serviceModalTitle').textContent = 'Add New Service';
        form.reset();
        document.getElementById('serviceId').value = 'S' + String(services.length + 1).padStart(3, '0');
    } else if (action === 'edit' && serviceId) {
        const service = services.find(s => s.id === serviceId);
        if (service) {
            document.getElementById('serviceModalTitle').textContent = 'Edit Service';
            document.getElementById('serviceId').value = service.id;
            document.getElementById('serviceName').value = service.name;
            document.getElementById('serviceDescription').value = service.description;
            document.getElementById('serviceImage').value = service.image;
            document.getElementById('serviceDepartment').value = service.department;
            document.getElementById('serviceAvailability').value = service.availability;
            document.getElementById('servicePrice').value = service.price;
            document.getElementById('serviceDuration').value = service.duration;
            document.getElementById('serviceRequirements').value = service.requirements;
            document.getElementById('serviceStatus').value = service.status;
            
            // Populate doctors dropdown
            const doctorSelect = document.getElementById('serviceDoctor');
            doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
            
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = doctor.name;
                if (doctor.id === service.doctor) {
                    option.selected = true;
                }
                doctorSelect.appendChild(option);
            });
        }
    }
    
    modal.style.display = 'flex';
}

// Handle service form submission
function handleServiceFormSubmit(e) {
    e.preventDefault();
    
    const serviceId = document.getElementById('serviceId').value;
    const isNewService = !services.some(s => s.id === serviceId);
    
    const serviceData = {
        id: serviceId,
        name: document.getElementById('serviceName').value,
        description: document.getElementById('serviceDescription').value,
        image: document.getElementById('serviceImage').value,
        department: document.getElementById('serviceDepartment').value,
        doctor: document.getElementById('serviceDoctor').value,
        availability: document.getElementById('serviceAvailability').value,
        price: document.getElementById('servicePrice').value,
        duration: document.getElementById('serviceDuration').value,
        requirements: document.getElementById('serviceRequirements').value,
        status: document.getElementById('serviceStatus').value,
        lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    if (isNewService) {
        // Add new service
        serviceData.appointments = 0;
        services.push(serviceData);
    } else {
        // Update existing service
        const index = services.findIndex(s => s.id === serviceId);
        if (index !== -1) {
            serviceData.appointments = services[index].appointments;
            services[index] = serviceData;
        }
    }
    
    closeModal('serviceModal');
    renderServicesTable();
    renderBookingOptions();
    
    // If we're editing the currently displayed service, update its info
    const currentServiceTitle = document.getElementById('serviceInfoTitle').textContent;
    if (currentServiceTitle === serviceData.name) {
        showServiceInfo(serviceData.id);
    }
}

// Open doctor modal
function openDoctorModal(action, doctorId = null) {
    const modal = document.getElementById('doctorModal');
    const form = document.getElementById('doctorForm');
    
    if (action === 'add') {
        document.getElementById('doctorModalTitle').textContent = 'Add New Doctor';
        form.reset();
        document.getElementById('doctorId').value = 'D' + String(doctors.length + 1).padStart(3, '0');
    } else if (action === 'edit' && doctorId) {
        const doctor = doctors.find(d => d.id === doctorId);
        if (doctor) {
            document.getElementById('doctorModalTitle').textContent = 'Edit Doctor';
            document.getElementById('doctorId').value = doctor.id;
            document.getElementById('doctorName').value = doctor.name;
            document.getElementById('doctorSpecialty').value = doctor.specialty;
            document.getElementById('doctorDepartment').value = doctor.department;
            document.getElementById('doctorSchedule').value = doctor.schedule;
            document.getElementById('doctorStatus').value = doctor.status;
        }
    }
    
    modal.style.display = 'flex';
}

// Handle doctor form submission
function handleDoctorFormSubmit(e) {
    e.preventDefault();
    
    const doctorId = document.getElementById('doctorId').value;
    const isNewDoctor = !doctors.some(d => d.id === doctorId);
    
    const doctorData = {
        id: doctorId,
        name: document.getElementById('doctorName').value,
        specialty: document.getElementById('doctorSpecialty').value,
        department: document.getElementById('doctorDepartment').value,
        schedule: document.getElementById('doctorSchedule').value,
        status: document.getElementById('doctorStatus').value,
        assignedServices: []
    };
    
    if (isNewDoctor) {
        // Add new doctor
        doctors.push(doctorData);
    } else {
        // Update existing doctor - preserve assigned services
        const index = doctors.findIndex(d => d.id === doctorId);
        if (index !== -1) {
            doctorData.assignedServices = doctors[index].assignedServices;
            doctors[index] = doctorData;
        }
    }
    
    closeModal('doctorModal');
    renderDoctorsTable();
    renderServicesTable();
    renderBookingOptions();
}

// Open appointment modal
function openAppointmentModal(action, appointmentId = null) {
    const modal = document.getElementById('appointmentModal');
    const form = document.getElementById('appointmentForm');
    
    if (action === 'add') {
        document.getElementById('appointmentModalTitle').textContent = 'Create New Appointment';
        form.reset();
        document.getElementById('appointmentId').value = 'A' + String(appointments.length + 1).padStart(3, '0');
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('appointmentDate').valueAsDate = tomorrow;
        
        // Populate services dropdown
        const serviceSelect = document.getElementById('appointmentService');
        serviceSelect.innerHTML = '<option value="">Select Service</option>';
        
        services.forEach(service => {
            if (service.status === 'Active') {
                const option = document.createElement('option');
                option.value = service.id;
                option.textContent = service.name;
                serviceSelect.appendChild(option);
            }
        });
        
        // Populate doctors dropdown
        const doctorSelect = document.getElementById('appointmentDoctor');
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        
        doctors.forEach(doctor => {
            if (doctor.status === 'Active') {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = doctor.name;
                doctorSelect.appendChild(option);
            }
        });
    } else if (action === 'edit' && appointmentId) {
        const appointment = appointments.find(a => a.id === appointmentId);
        if (appointment) {
            document.getElementById('appointmentModalTitle').textContent = 'Edit Appointment';
            document.getElementById('appointmentId').value = appointment.id;
            document.getElementById('appointmentPatient').value = appointment.patientName;
            
            // Populate services dropdown and select current service
            const serviceSelect = document.getElementById('appointmentService');
            serviceSelect.innerHTML = '<option value="">Select Service</option>';
            
            services.forEach(service => {
                const option = document.createElement('option');
                option.value = service.id;
                option.textContent = service.name;
                if (service.id === appointment.service) {
                    option.selected = true;
                }
                serviceSelect.appendChild(option);
            });
            
            // Populate doctors dropdown and select current doctor
            const doctorSelect = document.getElementById('appointmentDoctor');
            doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
            
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = doctor.name;
                if (doctor.id === appointment.doctor) {
                    option.selected = true;
                }
                doctorSelect.appendChild(option);
            });
            
            document.getElementById('appointmentDate').value = appointment.date;
            document.getElementById('appointmentTime').value = appointment.time;
            document.getElementById('appointmentStatus').value = appointment.status;
        }
    }
    
    modal.style.display = 'flex';
}

// Update assigned doctor when service changes
function updateAssignedDoctor() {
    const serviceId = document.getElementById('appointmentService').value;
    if (!serviceId) return;
    
    const service = services.find(s => s.id === serviceId);
    if (!service || !service.doctor) return;
    
    const doctorSelect = document.getElementById('appointmentDoctor');
    doctorSelect.value = service.doctor;
}

// Handle appointment form submission
function handleAppointmentFormSubmit(e) {
    e.preventDefault();
    
    const appointmentId = document.getElementById('appointmentId').value;
    const isNewAppointment = !appointments.some(a => a.id === appointmentId);
    
    const appointmentData = {
        id: appointmentId,
        patientName: document.getElementById('appointmentPatient').value,
        service: document.getElementById('appointmentService').value,
        doctor: document.getElementById('appointmentDoctor').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        status: document.getElementById('appointmentStatus').value
    };
    
    if (isNewAppointment) {
        // Add new appointment
        appointments.push(appointmentData);
        
        // Increment service appointment count
        const serviceIndex = services.findIndex(s => s.id === appointmentData.service);
        if (serviceIndex !== -1) {
            services[serviceIndex].appointments = (services[serviceIndex].appointments || 0) + 1;
        }
    } else {
        // Update existing appointment
        const index = appointments.findIndex(a => a.id === appointmentId);
        if (index !== -1) {
            appointments[index] = appointmentData;
        }
    }
    
    closeModal('appointmentModal');
    renderAppointmentsTable();
    renderServicesTable();
}

// Open assign doctor modal
function openAssignDoctorModal(serviceId) {
    currentServiceForAssignment = serviceId;
    const modal = document.getElementById('assignDoctorModal');
    const select = document.getElementById('doctorAssignmentSelect');
    
    // Clear and populate the select
    select.innerHTML = '<option value="">Select Doctor</option>';
    
    doctors.forEach(doctor => {
        if (doctor.status === 'Active') {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = doctor.name;
            select.appendChild(option);
        }
    });
    
    // Select current doctor if one is assigned
    const service = services.find(s => s.id === serviceId);
    if (service && service.doctor) {
        select.value = service.doctor;
    }
    
    modal.style.display = 'flex';
}

// Save doctor assignment
function saveDoctorAssignment() {
    const serviceId = currentServiceForAssignment;
    const doctorId = document.getElementById('doctorAssignmentSelect').value;
    
    if (!serviceId) return;
    
    // Find the service
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) return;
    
    // Remove service from previous doctor's assigned services
    const previousDoctorId = services[serviceIndex].doctor;
    if (previousDoctorId) {
        const previousDoctorIndex = doctors.findIndex(d => d.id === previousDoctorId);
        if (previousDoctorIndex !== -1) {
            doctors[previousDoctorIndex].assignedServices = doctors[previousDoctorIndex].assignedServices.filter(id => id !== serviceId);
        }
    }
    
    // Update service with new doctor
    services[serviceIndex].doctor = doctorId || null;
    services[serviceIndex].lastUpdated = new Date().toISOString().split('T')[0];
    
    // Add service to new doctor's assigned services
    if (doctorId) {
        const newDoctorIndex = doctors.findIndex(d => d.id === doctorId);
        if (newDoctorIndex !== -1 && !doctors[newDoctorIndex].assignedServices.includes(serviceId)) {
            doctors[newDoctorIndex].assignedServices.push(serviceId);
        }
    }
    
    closeModal('assignDoctorModal');
    renderServicesTable();
    renderDoctorsTable();
    renderBookingOptions();
    
    // If we're viewing this service, update its info
    const currentServiceTitle = document.getElementById('serviceInfoTitle').textContent;
    if (currentServiceTitle === services[serviceIndex].name) {
        showServiceInfo(services[serviceIndex].id);
    }
}

// Show booking form
function showBookingForm(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    document.getElementById('bookingServiceTitle').textContent = `Book Appointment: ${service.name}`;
    document.getElementById('bookingForm').classList.add('active');
    
    // Scroll to the form
    document.getElementById('bookingForm').scrollIntoView({ behavior: 'smooth' });
}

// Hide booking form
function hideBookingForm() {
    document.getElementById('bookingForm').classList.remove('active');
}

// Handle booking form submission
function handleBookingFormSubmit(e) {
    e.preventDefault();
    
    // Create a new appointment
    const newAppointmentId = 'A' + String(appointments.length + 1).padStart(3, '0');
    const serviceSelect = document.getElementById('appointmentService');
    const selectedService = serviceSelect ? serviceSelect.value : '';
    
    const newAppointment = {
        id: newAppointmentId,
        patientName: document.getElementById('patientName').value,
        service: selectedService,
        doctor: '', // Will be assigned by admin
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        status: 'Pending'
    };
    
    appointments.push(newAppointment);
    
    // Increment service appointment count
    if (selectedService) {
        const serviceIndex = services.findIndex(s => s.id === selectedService);
        if (serviceIndex !== -1) {
            services[serviceIndex].appointments = (services[serviceIndex].appointments || 0) + 1;
        }
    }
    
    // Reset form and show success message
    document.getElementById('patientBookingForm').reset();
    hideBookingForm();
    alert('Appointment request submitted successfully! Our staff will contact you to confirm.');
    
    renderAppointmentsTable();
    renderServicesTable();
}

// Delete service
function deleteService(serviceId) {
    if (confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
        // Remove service from doctors' assigned services
        doctors.forEach(doctor => {
            doctor.assignedServices = doctor.assignedServices.filter(id => id !== serviceId);
        });
        
        // Remove service
        services = services.filter(s => s.id !== serviceId);
        
        // Remove related appointments
        appointments = appointments.filter(a => a.service !== serviceId);
        
        renderServicesTable();
        renderDoctorsTable();
        renderAppointmentsTable();
        renderBookingOptions();
        
        // Hide service info if it's the one being deleted
        const currentServiceTitle = document.getElementById('serviceInfoTitle').textContent;
        const deletedService = services.find(s => s.name === currentServiceTitle);
        if (!deletedService) {
            serviceInfoContainer.style.display = 'none';
        }
    }
}

// Delete doctor
function deleteDoctor(doctorId) {
    if (confirm('Are you sure you want to delete this doctor? This action cannot be undone.')) {
        // Remove doctor from services
        services.forEach(service => {
            if (service.doctor === doctorId) {
                service.doctor = null;
            }
        });
        
        // Remove doctor
        doctors = doctors.filter(d => d.id !== doctorId);
        
        // Remove related appointments
        appointments = appointments.filter(a => a.doctor !== doctorId);
        
        renderDoctorsTable();
        renderServicesTable();
        renderAppointmentsTable();
        renderBookingOptions();
    }
}

// Delete appointment
function deleteAppointment(appointmentId) {
    if (confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) {
        // Decrement service appointment count if needed
        const appointment = appointments.find(a => a.id === appointmentId);
        if (appointment) {
            const serviceIndex = services.findIndex(s => s.id === appointment.service);
            if (serviceIndex !== -1 && services[serviceIndex].appointments > 0) {
                services[serviceIndex].appointments -= 1;
            }
        }
        
        // Remove appointment
        appointments = appointments.filter(a => a.id !== appointmentId);
        
        renderAppointmentsTable();
        renderServicesTable();
    }
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Load design preferences from localStorage
function loadDesignPreferences() {
    const preferences = JSON.parse(localStorage.getItem('designPreferences')) || {};
    
    if (preferences.primaryColor) {
        document.documentElement.style.setProperty('--hospital-primary', preferences.primaryColor);
        document.getElementById('primaryColor').value = preferences.primaryColor;
    }
    
    if (preferences.accentColor) {
        document.documentElement.style.setProperty('--hospital-accent', preferences.accentColor);
        document.getElementById('accentColor').value = preferences.accentColor;
    }
    
    if (preferences.secondaryColor) {
        document.documentElement.style.setProperty('--hospital-secondary', preferences.secondaryColor);
        document.getElementById('secondaryColor').value = preferences.secondaryColor;
    }
    
    if (preferences.borderRadius) {
        document.documentElement.style.setProperty('--border-radius', preferences.borderRadius + 'px');
        document.getElementById('borderRadius').value = preferences.borderRadius;
    }
    
    if (preferences.fontFamily) {
        document.documentElement.style.setProperty('--font-main', preferences.fontFamily);
        document.getElementById('fontFamily').value = preferences.fontFamily;
    }
}

// Update design in real-time
function updateDesign() {
    const primaryColor = document.getElementById('primaryColor').value;
    const accentColor = document.getElementById('accentColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    const borderRadius = document.getElementById('borderRadius').value;
    const fontFamily = document.getElementById('fontFamily').value;
    
    document.documentElement.style.setProperty('--hospital-primary', primaryColor);
    document.documentElement.style.setProperty('--hospital-accent', accentColor);
    document.documentElement.style.setProperty('--hospital-secondary', secondaryColor);
    document.documentElement.style.setProperty('--border-radius', borderRadius + 'px');
    document.documentElement.style.setProperty('--font-main', fontFamily);
    
    // Update color previews
    document.querySelector('.color-picker-preview:nth-of-type(1)').style.backgroundColor = primaryColor;
    document.querySelector('.color-picker-preview:nth-of-type(2)').style.backgroundColor = accentColor;
    document.querySelector('.color-picker-preview:nth-of-type(3)').style.backgroundColor = secondaryColor;
}

// Save design preferences to localStorage
function saveDesignPreferences() {
    const preferences = {
        primaryColor: document.getElementById('primaryColor').value,
        accentColor: document.getElementById('accentColor').value,
        secondaryColor: document.getElementById('secondaryColor').value,
        borderRadius: document.getElementById('borderRadius').value,
        fontFamily: document.getElementById('fontFamily').value
    };
    
    localStorage.setItem('designPreferences', JSON.stringify(preferences));
    alert('Design preferences saved!');
}

// Reset design to default
function resetDesign() {
    if (confirm('Reset design to default settings?')) {
        localStorage.removeItem('designPreferences');
        
        // Reset to default values
        document.documentElement.style.setProperty('--hospital-primary', '#005b96');
        document.documentElement.style.setProperty('--hospital-accent', '#b3cde0');
        document.documentElement.style.setProperty('--hospital-secondary', '#6497b1');
        document.documentElement.style.setProperty('--border-radius', '8px');
        document.documentElement.style.setProperty('--font-main', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");
        
        // Update form controls
        document.getElementById('primaryColor').value = '#005b96';
        document.getElementById('accentColor').value = '#b3cde0';
        document.getElementById('secondaryColor').value = '#6497b1';
        document.getElementById('borderRadius').value = '8';
        document.getElementById('fontFamily').value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        
        // Update color previews
        document.querySelector('.color-picker-preview:nth-of-type(1)').style.backgroundColor = '#005b96';
        document.querySelector('.color-picker-preview:nth-of-type(2)').style.backgroundColor = '#b3cde0';
        document.querySelector('.color-picker-preview:nth-of-type(3)').style.backgroundColor = '#6497b1';
    }
}

// Toggle design editor visibility
function toggleDesignEditor() {
    const content = document.getElementById('designEditorContent');
    content.classList.toggle('active');
};