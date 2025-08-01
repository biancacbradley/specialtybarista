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
            
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = '#007cba';
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                interest: formData.get('interest'),
                message: formData.get('message')
            };
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    showFormSuccess('Message sent successfully!');
                    this.reset(); // Clear the form
                    // Reset interest buttons
                    document.querySelectorAll('.interest-btn').forEach(btn => btn.classList.remove('active'));
                    document.getElementById('selectedInterest').value = '';
                } else {
                    throw new Error(result.error || 'Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                showFormError('Failed to send message. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '#FAFAFA';
            }
        });
    }
}

// Show form success message
function showFormSuccess(message = 'Thank you! Message sent successfully.') {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = message;
    submitBtn.style.backgroundColor = '#4CAF50';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '#FAFAFA';
        submitBtn.disabled = false;
    }, 3000);
}

// Show form error message
function showFormError(message = 'Failed to send message. Please try again.') {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = message;
    submitBtn.style.backgroundColor = '#f44336';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '#FAFAFA';
        submitBtn.disabled = false;
    }, 3000);
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