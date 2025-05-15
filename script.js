// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const themeToggle = document.getElementById('theme-toggle');
    const navLinks = document.querySelectorAll('nav a');

    // Toggle dark mode
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update button text
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = 'Toggle Light Mode';
        } else {
            themeToggle.textContent = 'Toggle Dark Mode';
        }
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Toggle Light Mode';
    }

    // Navigation active state
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If it's not a direct link to another page
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    // Add active class to corresponding link
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});