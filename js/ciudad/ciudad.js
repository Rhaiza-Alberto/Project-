document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const headerWrapper = document.querySelector('.header-wrapper');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        headerWrapper.classList.toggle('mobile-menu-open');
        this.setAttribute('aria-expanded', this.classList.contains('active'));
        
        const mainNav = headerWrapper.querySelector('.main-nav');
        if (mainNav) {
            mainNav.style.display = this.classList.contains('active') ? 'block' : 'none';
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
                    
                    const mainNav = headerWrapper.querySelector('.main-nav');
                    if (mainNav) mainNav.style.display = 'none';
                }
            }
        });
    });
  
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