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
});