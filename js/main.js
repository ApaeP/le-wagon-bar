document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuButton.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuButton.classList.remove('active');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  if (!carousel || !slides.length || !prevButton || !nextButton) return;

  let currentSlide = 1;
  let isTransitioning = false;
  const totalSlides = slides.length + 2;

  const firstSlide = slides[0].cloneNode(true);
  const lastSlide = slides[slides.length - 1].cloneNode(true);
  carousel.appendChild(firstSlide);
  carousel.insertBefore(lastSlide, slides[0]);

  carousel.classList.add('no-transition');
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  carousel.offsetHeight;
  requestAnimationFrame(() => {
    carousel.classList.remove('no-transition');
  });

  function updateCarousel(instant = false) {
    if (instant) {
      carousel.classList.add('no-transition');
    }
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    if (instant) {
      carousel.offsetHeight;
      carousel.classList.remove('no-transition');
    }
  }

  function handleTransitionEnd() {
    isTransitioning = false;

    if (currentSlide === 0) {
      carousel.classList.add('no-transition');
      currentSlide = totalSlides - 2;
      updateCarousel();
      carousel.offsetHeight;
      carousel.classList.remove('no-transition');
    }
    else if (currentSlide === totalSlides - 1) {
      carousel.classList.add('no-transition');
      currentSlide = 1;
      updateCarousel();
      carousel.offsetHeight;
      carousel.classList.remove('no-transition');
    }
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide++;
    updateCarousel();
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide--;
    updateCarousel();
  }

  carousel.addEventListener('transitionend', handleTransitionEnd);
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  let autoplayInterval = setInterval(nextSlide, 5000);

  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  });

  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoplayInterval);
  });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    autoplayInterval = setInterval(nextSlide, 5000);
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
});

const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  document.querySelectorAll('.feature-card').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
  });
};

document.addEventListener('DOMContentLoaded', observeElements);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        console.log('Données du formulaire :', data);
        alert('Message envoyé avec succès !');
        contactForm.reset();
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message :', error);
        alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
      }
    });
  }
});