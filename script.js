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
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const interest = formData.get('interest');
            const message = formData.get('message');
            
            // Create email subject based on selected interest
            let subject = 'Contact Form Inquiry';
            if (interest) {
                subject = `${interest} - Inquiry from ${name}`;
            } else {
                subject = `Contact Inquiry from ${name}`;
            }
            
            // Create email body
            let emailBody = `Name: ${name}\n`;
            emailBody += `Email: ${email}\n`;
            if (phone) {
                emailBody += `Phone: ${phone}\n`;
            }
            if (interest) {
                emailBody += `Interest: ${interest}\n`;
            }
            emailBody += `\nMessage:\n${message}`;
            
            // Create mailto link - updated to use the new email address
            const mailtoLink = `mailto:thespecialtybarista@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message (optional)
            showFormSuccess();
        });
    }
}

// Show form success message
function showFormSuccess() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Thank you! Email client opened.';
    submitBtn.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '#FAFAFA';
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