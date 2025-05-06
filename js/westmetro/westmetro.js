document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Menu Functionality =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const headerWrapper = document.querySelector('.header-wrapper');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        headerWrapper.classList.toggle('mobile-menu-open');
        this.setAttribute('aria-expanded', this.classList.contains('active'));
    });

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                if (mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    headerWrapper.classList.remove('mobile-menu-open');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ===== Modal Elements =====
    const appointmentModal = document.getElementById('appointmentModal');
    const serviceModal = document.getElementById('serviceModal');
    const doctorModal = document.getElementById('doctorModal');
    const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
    const ctaBookAppointmentBtn = document.getElementById('ctaBookAppointmentBtn');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const viewProfileBtns = document.querySelectorAll('.view-profile-btn');
    const modalCloses = document.querySelectorAll('.modal-close');
    const bookFromServiceBtn = document.getElementById('bookFromService');
    const bookFromDoctorBtn = document.getElementById('bookFromDoctor');

    // ===== Modal Functions =====
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== Appointment Modal Handlers =====
    if (bookAppointmentBtn) {
        bookAppointmentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(appointmentModal);
        });
    }

    if (ctaBookAppointmentBtn) {
        ctaBookAppointmentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(appointmentModal);
        });
    }

    // ===== Service Modal Handlers =====
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const service = btn.dataset.service;
            loadServiceDetails(service);
            openModal(serviceModal);
        });
    });

    function loadServiceDetails(service) {
        const serviceDetails = getServiceDetails(service);
        document.getElementById('serviceModalTitle').textContent = serviceDetails.title;
        document.getElementById('serviceModalContent').innerHTML = `
            <div class="service-detail-content">
                <div class="service-description">
                    ${serviceDetails.description}
                </div>
                
                <div class="service-features">
                    <h4>Key Features</h4>
                    <ul>
                        ${serviceDetails.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="service-faq">
                    <h4>Frequently Asked Questions</h4>
                    ${serviceDetails.faq.map(item => `
                        <div class="service-faq-item">
                            <div class="service-faq-question">${item.question}</div>
                            <div class="service-faq-answer">${item.answer}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // ===== Doctor Modal Handlers =====
    viewProfileBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const doctor = btn.dataset.doctor;
            loadDoctorDetails(doctor);
            openModal(doctorModal);
        });
    });

    function loadDoctorDetails(doctor) {
        const doctorDetails = getDoctorDetails(doctor);
        document.getElementById('doctorModalContent').innerHTML = `
            <div class="doctor-profile">
                <div class="doctor-header">
                    <img src="../../assets/images/westmetro/${doctorDetails.image}" alt="${doctorDetails.name}" class="doctor-image-large">
                    <div>
                        <h3 class="doctor-name">${doctorDetails.name}</h3>
                        <p class="doctor-specialty-modal">${doctorDetails.specialty}</p>
                        <p>${doctorDetails.position}</p>
                        <p>${doctorDetails.experience} years of experience</p>
                    </div>
                </div>
                
                <div class="doctor-bio-full">
                    ${doctorDetails.bio}
                </div>
                
                <div class="doctor-credentials">
                    <h4>Education & Credentials</h4>
                    <ul>
                        ${doctorDetails.credentials.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="doctor-credentials">
                    <h4>Specializations</h4>
                    <ul>
                        ${doctorDetails.specializations.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // ===== Modal Close Handlers =====
    modalCloses.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(appointmentModal);
            closeModal(serviceModal);
            closeModal(doctorModal);
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(appointmentModal);
            closeModal(serviceModal);
            closeModal(doctorModal);
        }
    });

    // ===== Modal Navigation Handlers =====
    if (bookFromServiceBtn) {
        bookFromServiceBtn.addEventListener('click', () => {
            closeModal(serviceModal);
            openModal(appointmentModal);
        });
    }

    if (bookFromDoctorBtn) {
        bookFromDoctorBtn.addEventListener('click', () => {
            closeModal(doctorModal);
            openModal(appointmentModal);
        });
    }

    // ===== Appointment Form Handler =====
    document.querySelector('.appointment-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('appointmentType').value;
        const doctor = document.getElementById('appointmentDoctor').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const name = document.getElementById('patientName').value;
        const phone = document.getElementById('patientPhone').value;
        const reason = document.getElementById('appointmentReason').value;
        
        alert(`Appointment booked successfully!\n\nService: ${type}\n${doctor ? 'Doctor: ' + document.getElementById('appointmentDoctor').options[document.getElementById('appointmentDoctor').selectedIndex].text + '\n' : ''}Date: ${date}\nTime: ${time}\nName: ${name}\nPhone: ${phone}\nReason: ${reason}`);
        
        closeModal(appointmentModal);
        e.target.reset();
    });

    // ===== Service Details Data =====
    function getServiceDetails(service) {
        const services = {
            emergency: {
                title: "Emergency Care",
                description: `
                    <p>Our 24/7 Emergency Department is staffed by board-certified emergency physicians and specially trained nurses ready to handle any medical emergency. As a Level III Trauma Center, we're equipped to stabilize and treat critical patients before transfer if needed.</p>
                    <p>We pride ourselves on our average wait time of under 15 minutes, with a dedicated fast-track system for less severe cases to ensure all patients receive timely care.</p>
                `,
                features: [
                    "24/7 emergency care with no appointment needed",
                    "Board-certified emergency physicians",
                    "Level III trauma center designation",
                    "Average wait time under 15 minutes",
                    "Pediatric emergency specialists available",
                    "On-site laboratory and imaging for rapid diagnosis",
                    "Direct admission to hospital if needed"
                ],
                faq: [
                    {
                        question: "What should I bring to the ER?",
                        answer: "Please bring your ID, insurance information, list of medications, and any relevant medical records if available."
                    },
                    {
                        question: "How is emergency care prioritized?",
                        answer: "Patients are seen based on medical urgency, not arrival time. Life-threatening conditions are treated immediately."
                    },
                    {
                        question: "Do I need to call ahead?",
                        answer: "No, you can come directly to the ER. For life-threatening emergencies, call 911 for ambulance service."
                    }
                ]
            },
            cardiology: {
                title: "Cardiology",
                description: `
                    <p>Our Cardiology Department provides comprehensive heart care from prevention to advanced interventions. Led by interventional cardiologists like Dr. Michael Chen, we offer state-of-the-art diagnostic testing and treatment options.</p>
                    <p>Our cardiac catheterization lab performs over 500 procedures annually with excellent outcomes. We specialize in minimally invasive techniques for faster recovery.</p>
                `,
                features: [
                    "Cardiac catheterization and angioplasty",
                    "Non-invasive stress testing",
                    "Echocardiography and vascular ultrasound",
                    "Pacemaker and defibrillator implantation",
                    "Heart failure management program",
                    "Cardiac rehabilitation services",
                    "Preventive cardiology consultations"
                ],
                faq: [
                    {
                        question: "What's the difference between a cardiologist and cardiac surgeon?",
                        answer: "Cardiologists diagnose and treat heart conditions medically or with minimally invasive procedures, while cardiac surgeons perform open-heart surgeries."
                    },
                    {
                        question: "How often should I get my heart checked?",
                        answer: "Adults should have baseline screening at age 20, then regular checkups based on risk factors. Most people need cholesterol checks every 4-6 years."
                    },
                    {
                        question: "What are warning signs of heart problems?",
                        answer: "Chest pain or pressure, shortness of breath, palpitations, dizziness, or swelling in legs should prompt immediate evaluation."
                    }
                ]
            },
            // Other services would follow the same pattern
            // (Rest of service details omitted for brevity but would follow same structure)
        };
        
        return services[service] || {
            title: "Service Details",
            description: "<p>Detailed information about this service.</p>",
            features: ["Feature 1", "Feature 2", "Feature 3"],
            faq: [
                {question: "Question 1", answer: "Answer 1"},
                {question: "Question 2", answer: "Answer 2"}
            ]
        };
    }

    // ===== Doctor Details Data =====
    function getDoctorDetails(doctor) {
        const doctors = {
            vasquez: {
                name: "Dr. Elena Vasquez",
                image: "doctor1.jpg",
                specialty: "Emergency Medicine",
                position: "Director of Emergency Services",
                experience: "12",
                bio: `
                    <p>Dr. Vasquez is a board-certified emergency physician with extensive experience in trauma care. She completed her residency at MetroHealth Medical Center and has received multiple awards for clinical excellence.</p>
                    <p>Her research focuses on improving trauma outcomes in urban emergency departments, and she has published over 25 peer-reviewed articles. Dr. Vasquez leads our emergency department's quality improvement initiatives.</p>
                `,
                credentials: [
                    "MD, University of the Philippines College of Medicine",
                    "Residency in Emergency Medicine, MetroHealth Medical Center",
                    "Fellow, American College of Emergency Physicians",
                    "Board Certified in Emergency Medicine",
                    "Advanced Trauma Life Support Instructor"
                ],
                specializations: [
                    "Trauma resuscitation",
                    "Pediatric emergencies",
                    "Disaster medicine",
                    "Toxicology",
                    "Emergency ultrasound"
                ]
            },
            chen: {
                name: "Dr. Michael Chen",
                image: "doctor2.jpg",
                specialty: "Cardiology",
                position: "Interventional Cardiologist",
                experience: "15",
                bio: `
                    <p>Dr. Chen specializes in interventional cardiology procedures including angioplasty and stent placement. He trained at Johns Hopkins Hospital and brings cutting-edge techniques to our cardiac catheterization lab.</p>
                    <p>With over 2,000 successful procedures performed, Dr. Chen is recognized for his expertise in complex coronary interventions. He serves on several national cardiology advisory boards.</p>
                `,
                credentials: [
                    "MD, Harvard Medical School",
                    "Fellowship in Interventional Cardiology, Johns Hopkins Hospital",
                    "Fellow, American College of Cardiology",
                    "Board Certified in Cardiovascular Disease",
                    "Board Certified in Interventional Cardiology"
                ],
                specializations: [
                    "Coronary angioplasty",
                    "Structural heart interventions",
                    "Peripheral vascular interventions",
                    "Chronic total occlusion PCI",
                    "Intravascular ultrasound"
                ]
            },
            // Other doctors would follow the same pattern
            // (Rest of doctor details omitted for brevity but would follow same structure)
        };
        
        return doctors[doctor] || {
            name: "Doctor Name",
            image: "default.jpg",
            specialty: "Specialty",
            position: "Position",
            experience: "10",
            bio: "<p>Doctor biography and background information.</p>",
            credentials: ["Credential 1", "Credential 2"],
            specializations: ["Specialization 1", "Specialization 2"]
        };
    }

    // ===== Animate Elements on Scroll =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .doctor-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.service-card, .doctor-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});