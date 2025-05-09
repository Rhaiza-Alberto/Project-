        // Data storage (in a real app, this would be from a database)
        let services = JSON.parse(localStorage.getItem('services')) || [
            {
                id: 'SRV001',
                name: 'Emergency Care',
                department: 'Emergency Medicine',
                doctorId: 'DOC001',
                availability: '24/7',
                status: 'Active'
            },
            {
                id: 'SRV002',
                name: 'Cardiac Catheterization',
                department: 'Cardiology',
                doctorId: 'DOC002',
                availability: 'Mon-Fri, 8AM-5PM',
                status: 'Active'
            },
            {
                id: 'SRV003',
                name: 'Well-child Visits',
                department: 'Pediatrics',
                doctorId: 'DOC003',
                availability: 'Mon-Sat, 9AM-4PM',
                status: 'Active'
            }
        ];

        let doctors = JSON.parse(localStorage.getItem('doctors')) || [
            {
                id: 'DOC001',
                name: 'Dr. Elena Vasquez',
                specialty: 'Emergency Medicine',
                department: 'Emergency',
                schedule: '24/7 Shifts',
                status: 'Active'
            },
            {
                id: 'DOC002',
                name: 'Dr. Michael Chen',
                specialty: 'Cardiology',
                department: 'Cardiology',
                schedule: 'Mon-Wed, 8AM-4PM',
                status: 'Active'
            },
            {
                id: 'DOC003',
                name: 'Dr. Sarah Johnson',
                specialty: 'Pediatrics',
                department: 'Pediatrics',
                schedule: 'Tue-Thu, 9AM-5PM',
                status: 'Active'
            }
        ];

        let appointments = JSON.parse(localStorage.getItem('appointments')) || [
            {
                id: 'APT001',
                patientName: 'John Smith',
                serviceId: 'SRV002',
                doctorId: 'DOC002',
                date: '2023-11-15',
                time: '10:00',
                status: 'Pending'
            },
            {
                id: 'APT002',
                patientName: 'Maria Garcia',
                serviceId: 'SRV003',
                doctorId: 'DOC003',
                date: '2023-11-16',
                time: '14:30',
                status: 'Completed'
            }
        ];

        // Current service for doctor assignment
        let currentServiceForAssignment = null;

        // DOM Ready
        document.addEventListener('DOMContentLoaded', function() {
            renderAllTables();
            renderBookingOptions();
            
            // Add event listeners for add buttons
            document.getElementById('addServiceBtn').addEventListener('click', function() {
                openServiceModal();
            });
            
            document.getElementById('addDoctorBtn').addEventListener('click', function() {
                openDoctorModal();
            });
            
            document.getElementById('addAppointmentBtn').addEventListener('click', function() {
                openAppointmentModal();
            });
            
            // Form submissions
            document.getElementById('serviceForm').addEventListener('submit', function(e) {
                e.preventDefault();
                saveService();
            });
            
            document.getElementById('doctorForm').addEventListener('submit', function(e) {
                e.preventDefault();
                saveDoctor();
            });
            
            document.getElementById('appointmentForm').addEventListener('submit', function(e) {
                e.preventDefault();
                saveAppointment();
            });
            
            document.getElementById('patientBookingForm').addEventListener('submit', function(e) {
                e.preventDefault();
                bookAppointment();
            });
        });

        // Render all tables
        function renderAllTables() {
            renderServicesTable();
            renderDoctorsTable();
            renderAppointmentsTable();
        }

        // Save data to localStorage
        function saveData() {
            localStorage.setItem('services', JSON.stringify(services));
            localStorage.setItem('doctors', JSON.stringify(doctors));
            localStorage.setItem('appointments', JSON.stringify(appointments));
        }

        // Tab switching function
        function showSection(sectionId) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Deactivate all tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show the selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Activate the clicked tab button
            document.querySelector(`.tab-btn[data-tab="${sectionId}"]`).classList.add('active');
        }
        
        // Toggle mobile menu
        function toggleMobileMenu() {
            const menu = document.querySelector('.main-nav');
            const btn = document.querySelector('.mobile-menu-btn');
            
            menu.classList.toggle('active');
            btn.setAttribute('aria-expanded', menu.classList.contains('active'));
        }
        
        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Service functions
        function renderServicesTable() {
            const tbody = document.getElementById('servicesTableBody');
            tbody.innerHTML = '';
            
            services.forEach(service => {
                const doctor = doctors.find(d => d.id === service.doctorId);
                const doctorName = doctor ? doctor.name : 'Unassigned';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${service.id}</td>
                    <td>${service.name}</td>
                    <td>${service.department}</td>
                    <td>
                        <div class="doctor-assignment">
                            <span>${doctorName}</span>
                            <button class="assign-btn" onclick="assignDoctor('${service.id}')">Change</button>
                        </div>
                    </td>
                    <td>${service.availability}</td>
                    <td><span class="status-${service.status.toLowerCase()}">${service.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="edit-btn" onclick="editService('${service.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn" onclick="deleteService('${service.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        
        function openServiceModal(serviceId = null) {
            const modal = document.getElementById('serviceModal');
            const form = document.getElementById('serviceForm');
            const title = document.getElementById('serviceModalTitle');
            const doctorSelect = document.getElementById('serviceDoctor');
            
            // Populate doctor dropdown
            doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = `${doctor.name} (${doctor.specialty})`;
                doctorSelect.appendChild(option);
            });
            
            if (serviceId) {
                // Edit mode
                title.textContent = 'Edit Service';
                const service = services.find(s => s.id === serviceId);
                
                document.getElementById('serviceId').value = service.id;
                document.getElementById('serviceName').value = service.name;
                document.getElementById('serviceDepartment').value = service.department;
                document.getElementById('serviceDoctor').value = service.doctorId || '';
                document.getElementById('serviceAvailability').value = service.availability;
                document.getElementById('serviceStatus').value = service.status;
                document.getElementById('serviceInfo').value = service.Info;
            } else {
                // Add mode
                title.textContent = 'Add New Service';
                form.reset();
                document.getElementById('serviceId').value = '';
            }
            
            openModal('serviceModal');
        }
        
        function editService(serviceId) {
            openServiceModal(serviceId);
        }
        
        function saveService() {
            const form = document.getElementById('serviceForm');
            const serviceId = document.getElementById('serviceId').value;
            const serviceData = {
                name: document.getElementById('serviceName').value,
                department: document.getElementById('serviceDepartment').value,
                doctorId: document.getElementById('serviceDoctor').value || null,
                availability: document.getElementById('serviceAvailability').value,
                status: document.getElementById('serviceStatus').value,
                info: document.getElementById('serviceInfo').value
            };
            
            if (serviceId) {
                // Update existing service
                const index = services.findIndex(s => s.id === serviceId);
                services[index] = { ...services[index], ...serviceData };
            } else {
                // Add new service
                const newId = 'SRV' + String(services.length + 1).padStart(3, '0');
                services.push({ id: newId, ...serviceData });
            }
            
            saveData();
            renderAllTables();
            renderBookingOptions();
            closeModal('serviceModal');
            alert('Service saved successfully!');
        }
        
        function deleteService(serviceId) {
            if (confirm(`Are you sure you want to delete service ${serviceId}?`)) {
                // Check if service has appointments
                const serviceAppointments = appointments.filter(a => a.serviceId === serviceId);
                
                if (serviceAppointments.length > 0) {
                    alert(`Cannot delete service ${serviceId} because it has ${serviceAppointments.length} appointment(s). Please delete those appointments first.`);
                    return;
                }
                
                services = services.filter(s => s.id !== serviceId);
                saveData();
                renderAllTables();
                renderBookingOptions();
                alert(`Service ${serviceId} deleted successfully.`);
            }
        }
        
        function assignDoctor(serviceId) {
            currentServiceForAssignment = serviceId;
            const select = document.getElementById('doctorAssignmentSelect');
            select.innerHTML = '<option value="">Select Doctor</option>';
            
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = `${doctor.name} (${doctor.specialty})`;
                select.appendChild(option);
            });
            
            const service = services.find(s => s.id === serviceId);
            if (service.doctorId) {
                select.value = service.doctorId;
            }
            
            openModal('assignDoctorModal');
        }
        
        function saveDoctorAssignment() {
            const select = document.getElementById('doctorAssignmentSelect');
            const doctorId = select.value || null;
            
            if (currentServiceForAssignment) {
                const service = services.find(s => s.id === currentServiceForAssignment);
                service.doctorId = doctorId;
                saveData();
                renderAllTables();
                renderBookingOptions();
                closeModal('assignDoctorModal');
                alert('Doctor assignment updated!');
            }
        }
        
        // Doctor functions
        function renderDoctorsTable() {
            const tbody = document.getElementById('doctorsTableBody');
            tbody.innerHTML = '';
            
            doctors.forEach(doctor => {
                // Find services assigned to this doctor
                const assignedServices = services.filter(s => s.doctorId === doctor.id)
                    .map(s => s.name).join(', ');
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${doctor.id}</td>
                    <td>${doctor.name}</td>
                    <td>${doctor.specialty}</td>
                    <td>${doctor.department}</td>
                    <td>${assignedServices || 'None'}</td>
                    <td>${doctor.schedule}</td>
                    <td><span class="status-${doctor.status.toLowerCase()}">${doctor.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="edit-btn" onclick="editDoctor('${doctor.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn" onclick="deleteDoctor('${doctor.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        
        function openDoctorModal(doctorId = null) {
            const modal = document.getElementById('doctorModal');
            const form = document.getElementById('doctorForm');
            const title = document.getElementById('doctorModalTitle');
            
            if (doctorId) {
                // Edit mode
                title.textContent = 'Edit Doctor';
                const doctor = doctors.find(d => d.id === doctorId);
                
                document.getElementById('doctorId').value = doctor.id;
                document.getElementById('doctorName').value = doctor.name;
                document.getElementById('doctorSpecialty').value = doctor.specialty;
                document.getElementById('doctorDepartment').value = doctor.department;
                document.getElementById('doctorSchedule').value = doctor.schedule;
                document.getElementById('doctorStatus').value = doctor.status;
            } else {
                // Add mode
                title.textContent = 'Add New Doctor';
                form.reset();
                document.getElementById('doctorId').value = '';
            }
            
            openModal('doctorModal');
        }
        
        function editDoctor(doctorId) {
            openDoctorModal(doctorId);
        }
        
        function saveDoctor() {
            const form = document.getElementById('doctorForm');
            const doctorId = document.getElementById('doctorId').value;
            const doctorData = {
                name: document.getElementById('doctorName').value,
                specialty: document.getElementById('doctorSpecialty').value,
                department: document.getElementById('doctorDepartment').value,
                schedule: document.getElementById('doctorSchedule').value,
                status: document.getElementById('doctorStatus').value
            };
            
            if (doctorId) {
                // Update existing doctor
                const index = doctors.findIndex(d => d.id === doctorId);
                doctors[index] = { ...doctors[index], ...doctorData };
            } else {
                // Add new doctor
                const newId = 'DOC' + String(doctors.length + 1).padStart(3, '0');
                doctors.push({ id: newId, ...doctorData });
            }
            
            saveData();
            renderAllTables();
            renderBookingOptions();
            closeModal('doctorModal');
            alert('Doctor saved successfully!');
        }
        
        function deleteDoctor(doctorId) {
            // Check if doctor is assigned to any services
            const assignedServices = services.filter(s => s.doctorId === doctorId);
            
            if (assignedServices.length > 0) {
                alert(`Cannot delete doctor ${doctorId} because they are assigned to ${assignedServices.length} service(s). Please reassign those services first.`);
                return;
            }
            
            if (confirm(`Are you sure you want to delete doctor ${doctorId}?`)) {
                doctors = doctors.filter(d => d.id !== doctorId);
                saveData();
                renderAllTables();
                renderBookingOptions();
                alert(`Doctor ${doctorId} deleted successfully.`);
            }
        }
        
        // Appointment functions
        function renderAppointmentsTable() {
            const tbody = document.getElementById('appointmentsTableBody');
            tbody.innerHTML = '';
            
            appointments.forEach(appointment => {
                const service = services.find(s => s.id === appointment.serviceId);
                const doctor = doctors.find(d => d.id === appointment.doctorId);
                
                const serviceName = service ? service.name : 'Unknown Service';
                const doctorName = doctor ? doctor.name : 'Unknown Doctor';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${appointment.id}</td>
                    <td>${appointment.patientName}</td>
                    <td>${serviceName}</td>
                    <td>${doctorName}</td>
                    <td>${appointment.date} ${appointment.time}</td>
                    <td><span class="status-${appointment.status.toLowerCase()}">${appointment.status}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="edit-btn" onclick="editAppointment('${appointment.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn" onclick="deleteAppointment('${appointment.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        
        function openAppointmentModal(appointmentId = null) {
            const modal = document.getElementById('appointmentModal');
            const form = document.getElementById('appointmentForm');
            const title = document.getElementById('appointmentModalTitle');
            const serviceSelect = document.getElementById('appointmentService');
            const doctorSelect = document.getElementById('appointmentDoctor');
            
            // Populate service dropdown
            serviceSelect.innerHTML = '<option value="">Select Service</option>';
            services.forEach(service => {
                const option = document.createElement('option');
                option.value = service.id;
                option.textContent = `${service.name} (${service.department})`;
                serviceSelect.appendChild(option);
            });
            
            // Populate doctor dropdown
            doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = `${doctor.name} (${doctor.specialty})`;
                doctorSelect.appendChild(option);
            });
            
            if (appointmentId) {
                // Edit mode
                title.textContent = 'Edit Appointment';
                const appointment = appointments.find(a => a.id === appointmentId);
                
                document.getElementById('appointmentId').value = appointment.id;
                document.getElementById('appointmentPatient').value = appointment.patientName;
                document.getElementById('appointmentService').value = appointment.serviceId;
                document.getElementById('appointmentDoctor').value = appointment.doctorId;
                document.getElementById('appointmentDate').value = appointment.date;
                document.getElementById('appointmentTime').value = appointment.time;
                document.getElementById('appointmentStatus').value = appointment.status;
                
                // Trigger doctor update based on service
                updateAssignedDoctor();
            } else {
                // Add mode
                title.textContent = 'Create New Appointment';
                form.reset();
                document.getElementById('appointmentId').value = '';
            }
            
            openModal('appointmentModal');
        }
        
        function editAppointment(appointmentId) {
            openAppointmentModal(appointmentId);
        }
        
        function saveAppointment() {
            const form = document.getElementById('appointmentForm');
            const appointmentId = document.getElementById('appointmentId').value;
            const appointmentData = {
                patientName: document.getElementById('appointmentPatient').value,
                serviceId: document.getElementById('appointmentService').value,
                doctorId: document.getElementById('appointmentDoctor').value,
                date: document.getElementById('appointmentDate').value,
                time: document.getElementById('appointmentTime').value,
                status: document.getElementById('appointmentStatus').value
            };
            
            if (appointmentId) {
                // Update existing appointment
                const index = appointments.findIndex(a => a.id === appointmentId);
                appointments[index] = { ...appointments[index], ...appointmentData };
            } else {
                // Add new appointment
                const newId = 'APT' + String(appointments.length + 1).padStart(3, '0');
                appointments.push({ id: newId, ...appointmentData });
            }
            
            saveData();
            renderAllTables();
            closeModal('appointmentModal');
            alert('Appointment saved successfully!');
        }
        
        function deleteAppointment(appointmentId) {
            if (confirm(`Are you sure you want to delete appointment ${appointmentId}?`)) {
                appointments = appointments.filter(a => a.id !== appointmentId);
                saveData();
                renderAllTables();
                alert(`Appointment ${appointmentId} deleted successfully.`);
            }
        }
        
        function updateAssignedDoctor() {
            const serviceSelect = document.getElementById('appointmentService');
            const doctorSelect = document.getElementById('appointmentDoctor');
            const serviceId = serviceSelect.value;
            
            if (serviceId) {
                const service = services.find(s => s.id === serviceId);
                if (service && service.doctorId) {
                    doctorSelect.value = service.doctorId;
                }
            }
        }
        
        // Booking functions
        function renderBookingOptions() {
            const container = document.getElementById('bookingOptions');
            container.innerHTML = '';
            
            services.forEach(service => {
                if (service.status === 'Active') {
                    const doctor = doctors.find(d => d.id === service.doctorId);
                    const doctorName = doctor ? doctor.name : 'Not assigned';
                    
                    const card = document.createElement('div');
                    card.className = 'booking-card';
                    card.onclick = () => showBookingForm(service.id);
                    card.innerHTML = `
                        <h4>${service.name}</h4>
                        <p>${service.availability}</p>
                        <p><strong>Doctor:</strong> ${doctorName}</p>
                    `;
                    container.appendChild(card);
                }
            });
        }
        
        function showBookingForm(serviceId) {
            const form = document.getElementById('bookingForm');
            const title = document.getElementById('bookingServiceTitle');
            const service = services.find(s => s.id === serviceId);
            
            if (service) {
                title.textContent = `Book ${service.name} Appointment`;
                form.dataset.serviceId = serviceId;
                form.classList.add('active');
                form.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        function hideBookingForm() {
            document.getElementById('bookingForm').classList.remove('active');
        }
        
        function bookAppointment() {
            const form = document.getElementById('patientBookingForm');
            const serviceId = form.dataset.serviceId;
            const service = services.find(s => s.id === serviceId);
            
            if (!service) {
                alert('Service not found!');
                return;
            }
            
            const appointmentData = {
                patientName: document.getElementById('patientName').value,
                serviceId: serviceId,
                doctorId: service.doctorId || '',
                date: document.getElementById('bookingDate').value,
                time: document.getElementById('bookingTime').value,
                status: 'Pending'
            };
            
            const newId = 'APT' + String(appointments.length + 1).padStart(3, '0');
            appointments.push({ id: newId, ...appointmentData });
            
            saveData();
            renderAllTables();
            hideBookingForm();
            form.reset();
            alert('Appointment booked successfully!');
        }