// Smooth scroll functionality (ready for future sections)
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        navbar.style.background = 'transparent';
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active state to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // Contact form functionality
    initializeContactForm();
});

// Contact Form Handler
function initializeContactForm() {
    const interestButtons = document.querySelectorAll('.interest-btn');
    const selectedInterestInput = document.getElementById('selectedInterest');
    const contactForm = document.getElementById('contactForm');
    
    // Handle interest button selection
    interestButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            interestButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Store selected interest
            const interest = this.getAttribute('data-interest');
            selectedInterestInput.value = interest;
        });
    });
    
    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const interest = formData.get('interest');
            const message = formData.get('message');
            
            // Validate required fields
            if (!name || !email || !message) {
                showFormError('Please fill in all required fields.');
                return;
            }
            
            // Show loading state
            showFormLoading();
            
            try {
                // Submit form data to the API
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        interest,
                        message
                    })
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    showFormSuccess('Message sent successfully! We\'ll get back to you soon.');
                    contactForm.reset();
                    // Reset interest button selection
                    interestButtons.forEach(btn => btn.classList.remove('active'));
                    selectedInterestInput.value = '';
                } else {
                    throw new Error(result.error || 'Failed to send message');
                }
                
            } catch (error) {
                console.error('Error submitting form:', error);
                showFormError('Sorry, there was an error sending your message. Please try again later.');
            }
        });
    }
}

// Show form loading state
function showFormLoading() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = '#ccc';
    submitBtn.style.cursor = 'not-allowed';
}

// Show form success message
function showFormSuccess(message = 'Message sent successfully!') {
    const submitBtn = document.querySelector('.submit-btn');
    
    submitBtn.textContent = '✓ ' + message;
    submitBtn.style.backgroundColor = '#4CAF50';
    submitBtn.style.color = '#fff';
    submitBtn.disabled = false;
    submitBtn.style.cursor = 'pointer';
    
    setTimeout(() => {
        submitBtn.textContent = 'Submit';
        submitBtn.style.backgroundColor = '#FAFAFA';
        submitBtn.style.color = '#000';
    }, 4000);
}

// Show form error message
function showFormError(message = 'An error occurred. Please try again.') {
    const submitBtn = document.querySelector('.submit-btn');
    
    submitBtn.textContent = '✗ ' + message;
    submitBtn.style.backgroundColor = '#f44336';
    submitBtn.style.color = '#fff';
    submitBtn.disabled = false;
    submitBtn.style.cursor = 'pointer';
    
    setTimeout(() => {
        submitBtn.textContent = 'Submit';
        submitBtn.style.backgroundColor = '#FAFAFA';
        submitBtn.style.color = '#000';
    }, 4000);
}

// Function to replace image placeholder (for future use)
function replaceHeroImage(imagePath) {
    const heroBackground = document.querySelector('.hero-background');
    const placeholder = document.querySelector('.hero-image-placeholder');
    
    if (placeholder && imagePath) {
        placeholder.style.background = `url('${imagePath}') center center/cover no-repeat`;
        placeholder.querySelector('span').style.display = 'none';
    }
}

// Export function for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { replaceHeroImage };
}