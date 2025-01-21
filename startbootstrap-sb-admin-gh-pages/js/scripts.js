/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const navbar = document.querySelector('.navbar');
    const sidebar = document.querySelector('.sb-sidenav');
    

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
});

