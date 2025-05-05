document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtns = document.querySelectorAll('.mobile-menu-btn');
    
    mobileMenuBtns.forEach(btn => {
        const headerWrapper = btn.closest('.header-wrapper');
        
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            headerWrapper.classList.toggle('mobile-menu-open');
            this.setAttribute('aria-expanded', this.classList.contains('active'));
            
            const elementsToToggle = [
                headerWrapper.querySelector('.main-nav'),
                headerWrapper.querySelector('.auth-buttons')
            ];
            
            elementsToToggle.forEach(element => {
                if (element) {
                    element.style.display = this.classList.contains('active') ? 
                        (element.classList.contains('auth-buttons') ? 'flex' : 'block') : 
                        'none';
                }
            });
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.classList.contains('dropdown-item')) return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn.active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.closest('.header-wrapper').classList.remove('mobile-menu-open');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    
                    document.querySelectorAll('.main-nav, .auth-buttons').forEach(el => {
                        el.style.display = 'none';
                    });
                }
            }
        });
    });
  
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.hospital-card, .service-card, .doctor-card, .stat-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
  
    document.querySelectorAll('.hospital-card, .service-card, .doctor-card, .stat-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
  
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
  
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        const animateStats = () => {
            statCards.forEach(card => {
                const numberElement = card.querySelector('.stat-number');
                const targetText = numberElement.textContent;
                const is247 = targetText === '24/7';
                const targetNumber = is247 ? 24 : parseInt(targetText);
                let currentNumber = 0;
                const increment = targetNumber / 30;
                
                const updateNumber = () => {
                    currentNumber = Math.min(currentNumber + increment, targetNumber);
                    numberElement.textContent = is247 ? 
                        `${Math.floor(currentNumber)}/7` : 
                        `${Math.floor(currentNumber)}+`;
                    if (currentNumber < targetNumber) {
                        requestAnimationFrame(updateNumber);
                    }
                };
                
                updateNumber();
            });
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelector('.stats-section').style.opacity = '0';
        observer.observe(document.querySelector('.stats-section'));
    }

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 992) {
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }, 250);
    });

    const appointmentModal = document.getElementById('appointmentModal');
    const serviceModal = document.getElementById('serviceModal');
    const bookAppointmentBtn = document.querySelector('a[href="#appointment"]');
    const learnMoreBtns = document.querySelectorAll('.service-card .btn-outline');
    const modalCloses = document.querySelectorAll('.modal-close');
    const bookFromServiceBtn = document.getElementById('bookFromService');
    
    if (bookAppointmentBtn) {
        bookAppointmentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            appointmentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceCard = btn.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('h3').textContent;
            const serviceDescription = serviceCard.querySelector('p').textContent;
            
            document.getElementById('serviceModalTitle').textContent = serviceTitle;
            document.getElementById('serviceModalContent').innerHTML = `
                <p>${serviceDescription}</p>
                <div class="service-features">
                    <p><strong>Features:</strong></p>
                    <ul>
                        <li>Board-certified specialists</li>
                        <li>Flexible scheduling options</li>
                        <li>Digital health records</li>
                        <li>Follow-up care coordination</li>
                    </ul>
                </div>
            `;
            
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalCloses.forEach(btn => {
        btn.addEventListener('click', () => {
            appointmentModal.classList.remove('active');
            serviceModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    if (bookFromServiceBtn) {
        bookFromServiceBtn.addEventListener('click', () => {
            serviceModal.classList.remove('active');
            appointmentModal.classList.add('active');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    document.querySelector('.appointment-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const hospital = document.getElementById('appointmentHospital').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const reason = document.getElementById('appointmentReason').value;
        
        alert(`Appointment booked successfully!\n\nHospital: ${hospital}\nDate: ${date}\nTime: ${time}\nReason: ${reason}`);
        appointmentModal.classList.remove('active');
        document.body.style.overflow = '';
        e.target.reset();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        loginBtn.style.display = 'none';
        profileBtn.style.display = 'inline-flex'; // Show profile
    } else {
        loginBtn.style.display = 'inline-flex';
        profileBtn.style.display = 'none'; // Hide profile
    }

    // Optional: click to go to profile page
    profileBtn.addEventListener('click', () => {
        window.location.href = './pages/profile.html'; // adjust path if needed
    });
});
