document.addEventListener('DOMContentLoaded', function() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const header = document.querySelector('header');

    if (hamburgerBtn && header) {
        hamburgerBtn.addEventListener('click', function() {
            header.classList.toggle('nav-open');

            const isExpanded = header.classList.contains('nav-open');
            hamburgerBtn.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Płynne przewijanie dla linków nawigacyjnych
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight || 70; // Wysokość nagłówka
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Opcjonalne: Zamknij mobilne menu jeśli jest otwarte
                // closeMobileMenu();
            }
        });
    });

    // Aktywne podświetlanie linków w nawigacji podczas przewijania
    const sections = document.querySelectorAll('main section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;

    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + headerHeight < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        // Upewnij się, że link odpowiadający sekcji istnieje
        const activeLink = document.querySelector(`header nav ul li a[href="#${sections[index].id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Wywołaj raz na początku, aby ustawić stan dla góry strony
    if (sections.length > 0) {
        changeLinkState();
    }
    window.addEventListener('scroll', changeLinkState);

});