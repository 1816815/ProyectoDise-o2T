/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    const body = document.body;
    const sidebar = document.querySelector('.sb-sidenav');

    const syncButtonState = () => {
        const isMenuOpen = body.classList.contains('sb-sidenav-toggled');
        sidebarToggle.classList.toggle('open', isMenuOpen);
    };

    if (sidebar) {
        sidebar.style.visibility = 'hidden';
        body.classList.add('no-transition')
    }
    if (sidebarToggle) {
        const updateButtonState = () => {
            const isMenuOpen = body.classList.contains('sb-sidenav-toggled');
            sidebarToggle.classList.toggle('open', !isMenuOpen);
        };


        const isSidebarOpen = localStorage.getItem('sb|sidebar-toggle') === 'true';
        body.classList.toggle('sb-sidenav-toggled', isSidebarOpen);
        updateButtonState();

        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            body.classList.toggle('sb-sidenav-toggled');
            updateButtonState();
            localStorage.setItem('sb|sidebar-toggle', body.classList.contains('sb-sidenav-toggled'));
        });
    }
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const navbar = document.querySelector('.navbar');

    

    function applyMode(isDarkMode) {
        navbar.classList.toggle('navbar-dark', isDarkMode);
        navbar.classList.toggle('bg-dark', isDarkMode);
        navbar.classList.toggle('navbar-light', !isDarkMode);
        navbar.classList.toggle('bg-light', !isDarkMode);
        
        sidebar.classList.toggle('sb-sidenav-dark', isDarkMode);
        sidebar.classList.toggle('sb-sidenav-light', !isDarkMode);
        
        darkModeToggle.classList.toggle('btn-outline-light', isDarkMode);
        darkModeToggle.classList.toggle('btn-outline-dark', !isDarkMode);
        
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        darkModeToggleMobile.innerHTML = `
            <div class="sb-nav-link-icon">${isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'}</div>
            Cambiar modo
        `;
        document.querySelectorAll('.navbar .nav-link').forEach(link => {
            link.classList.toggle('text-light', isDarkMode);
            link.classList.toggle('text-dark', !isDarkMode);
        });
    
        document.querySelectorAll('.menu-toggle span').forEach(span => {
            span.classList.toggle('bg-light', isDarkMode);
            span.classList.toggle('bg-dark', !isDarkMode);
        });

    }
    

    function toggleDarkMode() {
        const isDarkMode = navbar.classList.contains('navbar-dark');
        localStorage.setItem('darkMode', !isDarkMode);
        applyMode(!isDarkMode);
    }
    

    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
        applyMode(savedMode === 'true');
    }
    
    darkModeToggle.addEventListener('click', toggleDarkMode);
    darkModeToggleMobile.addEventListener('click', toggleDarkMode);

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (sidebar) {
                sidebar.style.visibility = 'visible';
            }
            body.classList.add('page-loaded');
            body.classList.remove('no-transition')
        }, 50);
    });

});


