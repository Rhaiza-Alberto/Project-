document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const headerWrapper = document.querySelector('.header-wrapper');
  const appointmentModal = document.getElementById('appointmentModal');
  const scheduleButtons = document.querySelectorAll('[href="#schedule"], .btn-outline, .btn-accent');
  const modalClose = document.querySelector('.modal-close');
  
  mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      headerWrapper.classList.toggle('mobile-menu-open');
      this.setAttribute('aria-expanded', this.classList.contains('active'));
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          if (this.getAttribute('href') === '#schedule') {
              e.preventDefault();
              openAppointmentModal();
              return;
          }
          
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

  function openAppointmentModal() {
      appointmentModal.classList.add('active');
      document.body.style.overflow = 'hidden';
  }

  scheduleButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          if (this.tagName === 'A' && this.getAttribute('href') !== '#schedule') {
              return;
          }
          e.preventDefault();
          openAppointmentModal();
          
          const card = this.closest('.service-card, .doctor-card');
          if (card) {
              if (card.classList.contains('service-card')) {
                  const service = card.querySelector('h3').textContent;
                  document.getElementById('appointmentType').value = service.toLowerCase().replace(' ', '-');
              } else if (card.classList.contains('doctor-card')) {
                  const doctor = card.querySelector('h3').textContent;
                  const specialty = card.querySelector('.doctor-specialty').textContent;
                  document.getElementById('appointmentDoctor').value = doctor.toLowerCase().split(' ')[1];
                  document.getElementById('appointmentType').value = specialty.toLowerCase();
              }
          }
      });
  });

  modalClose.addEventListener('click', () => {
      appointmentModal.classList.remove('active');
      document.body.style.overflow = '';
  });

  document.addEventListener('click', (e) => {
      if (e.target === appointmentModal) {
          appointmentModal.classList.remove('active');
          document.body.style.overflow = '';
      }
  });

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
      
      appointmentModal.classList.remove('active');
      document.body.style.overflow = '';
      e.target.reset();
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