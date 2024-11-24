const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const swiper = new Swiper('.swiper', {
  // Optional parameters
  slidesPerView: 3,
  direction: 'horizontal',
  loop: true,
  spaceBetween: 20,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

 // Form validation
document.getElementById('contactForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const form = this;
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  // Submit data to Google Apps Script
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyGpaEx2BRgDFoFS2rbtzHpkOLMFGqKjcP-KdjPodbkqc4XasDcxxP-oVQ2HW3b6eR0DQ/exec', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    document.getElementById('formStatus').textContent = result.message || 'Form submitted successfully!';
    form.reset();
    form.classList.remove('was-validated');
  } catch (error) {
    document.getElementById('formStatus').textContent = 'There was an error submitting the form.';
  }
});