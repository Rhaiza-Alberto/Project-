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
                    <img src="../../assets/images/ciudad/${doctorDetails.image}" alt="${doctorDetails.name}" class="doctor-image-large">
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
            dental: {
                title: "Dental Care Services",
                description: `
                    <p>Our dental department provides comprehensive oral health services for patients of all ages. We focus on preventive care to maintain healthy teeth and gums, while also offering advanced restorative and cosmetic procedures.</p>
                    <p>Our team of experienced dentists uses the latest technology to ensure comfortable and effective treatments, from routine cleanings to complex dental implants.</p>
                `,
                features: [
                    "Comprehensive dental exams and cleanings",
                    "Tooth-colored fillings and sealants",
                    "Root canal therapy",
                    "Dental crowns and bridges",
                    "Teeth whitening and veneers",
                    "Dental implants and dentures",
                    "Orthodontic consultations",
                    "Pediatric dental care"
                ],
                faq: [
                    {
                        question: "How often should I visit the dentist?",
                        answer: "We recommend dental checkups every 6 months for most patients, though some may need more frequent visits based on their oral health needs."
                    },
                    {
                        question: "Do you offer emergency dental services?",
                        answer: "Yes, we provide emergency dental care for issues like severe toothaches, broken teeth, and other urgent dental problems."
                    },
                    {
                        question: "What payment options are available?",
                        answer: "We accept most insurance plans and offer flexible payment options including installment plans for major procedures."
                    }
                ]
            },
            lab: {
                title: "Laboratory Services",
                description: `
                    <p>Our state-of-the-art laboratory provides accurate and timely diagnostic testing to support your healthcare needs. We utilize advanced technology and follow strict quality control measures.</p>
                    <p>With rapid turnaround times and highly trained technicians, we ensure reliable results that your doctor can trust for accurate diagnosis and treatment monitoring.</p>
                `,
                features: [
                    "Complete blood count (CBC) and chemistry panels",
                    "Hormone and thyroid testing",
                    "Microbiology and culture testing",
                    "Pathology and histology services",
                    "Rapid COVID-19 testing",
                    "Allergy testing",
                    "Genetic testing",
                    "Therapeutic drug monitoring"
                ],
                faq: [
                    {
                        question: "Do I need an appointment for lab tests?",
                        answer: "Most lab tests don't require an appointment, though some specialized tests may need scheduling. Walk-ins are welcome for routine tests."
                    },
                    {
                        question: "How long does it take to get results?",
                        answer: "Turnaround times vary by test - some results are available same day, while others may take several days. Your doctor will receive results as soon as they're available."
                    },
                    {
                        question: "Do I need to fast before blood tests?",
                        answer: "Some tests require fasting for 8-12 hours beforehand. Your doctor will provide specific instructions if fasting is needed for your tests."
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
            santos: {
                name: "Dr. Maria Santos",
                image: "doctor5.jpg",
                specialty: "Cardiology",
                position: "Senior Cardiologist",
                experience: "15",
                bio: `
                    <p>Dr. Santos is a board-certified cardiologist with over 15 years of experience in interventional cardiology. She completed her fellowship at Johns Hopkins Hospital and specializes in minimally invasive procedures.</p>
                    <p>Her research focuses on improving outcomes for patients with coronary artery disease, and she has published numerous papers in prestigious medical journals.</p>
                `,
                credentials: [
                    "MD, University of the Philippines",
                    "Residency in Internal Medicine, Philippine General Hospital",
                    "Fellowship in Cardiology, Johns Hopkins Hospital",
                    "Board Certified in Cardiovascular Disease",
                    "Fellow of the American College of Cardiology"
                ],
                specializations: [
                    "Interventional cardiology",
                    "Cardiac catheterization",
                    "Coronary angioplasty",
                    "Heart failure management",
                    "Preventive cardiology"
                ]
            },
            lim: {
                name: "Dr. James Lim",
                image: "doctor6.jpg",
                specialty: "Pediatrics",
                position: "Pediatric Specialist",
                experience: "12",
                bio: `
                    <p>Dr. Lim specializes in pediatric immunology and infectious diseases. He has published numerous papers on childhood vaccinations and preventive care strategies.</p>
                    <p>With a gentle approach and excellent bedside manner, Dr. Lim is particularly skilled at making children feel comfortable during medical visits.</p>
                `,
                credentials: [
                    "MD, University of Santo Tomas",
                    "Residency in Pediatrics, Makati Medical Center",
                    "Fellowship in Pediatric Immunology, Boston Children's Hospital",
                    "Board Certified in Pediatrics",
                    "Member of the Philippine Pediatric Society"
                ],
                specializations: [
                    "Childhood immunizations",
                    "Asthma and allergies",
                    "Infectious diseases",
                    "Newborn care",
                    "Developmental pediatrics"
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