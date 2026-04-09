document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    let currentId = 'home';

    // Toggle Menu
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });

    // Initialize Section Visibility & Positions
    function initApp() {
        // Handle direct links to sections via URL hash
        const hash = window.location.hash.substring(1) || 'home';
        const targetSection = document.getElementById(hash) ? hash : 'home';
        
        sections.forEach(section => {
            if (section.id === targetSection) {
                section.style.transform = 'translateZ(0) rotateY(0)';
                section.style.opacity = '1';
                section.style.visibility = 'visible';
                section.classList.add('active');
            } else {
                section.style.transform = 'translateZ(-1000px) rotateY(45deg)';
                section.style.opacity = '0';
                section.style.visibility = 'hidden';
                section.classList.remove('active');
            }
        });
        currentId = targetSection;
        
        // Update Nav Links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }

    function navigateTo(targetId) {
        if (targetId === currentId || !document.getElementById(targetId)) return;

        const currentSection = document.getElementById(currentId);
        const nextSection = document.getElementById(targetId);

        // Transition Out CURRENT
        currentSection.style.transition = 'all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)';
        currentSection.style.transform = 'translateZ(-1000px) rotateY(-45deg)';
        currentSection.style.opacity = '0';
        
        setTimeout(() => {
            currentSection.style.visibility = 'hidden';
            currentSection.classList.remove('active');
        }, 800);

        // Transition In NEXT
        nextSection.style.visibility = 'visible';
        nextSection.classList.add('active');
        nextSection.style.transition = 'all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)';
        
        // Start from "far away" to animate in
        nextSection.style.transform = 'translateZ(-1000px) rotateY(45deg)';
        nextSection.style.opacity = '0';

        setTimeout(() => {
            nextSection.style.opacity = '1';
            nextSection.style.transform = 'translateZ(0) rotateY(0)';
        }, 50);

        // Update Nav Links UI
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });

        currentId = targetId;
    }

    // Nav Click Handling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Close menu
            mainNav.classList.remove('open');
            menuToggle.classList.remove('active');

            navigateTo(targetId);
            window.history.pushState(null, null, `#${targetId}`);
        });
    });

    // Support for interior buttons (Hero buttons, etc.)
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                navigateTo(targetId);
                window.history.pushState(null, null, href);
            }
        });
    });

    initApp();

    // Mouse Parallax for Background
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });
});
