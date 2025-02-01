document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const formularioTitulo = document.getElementById('formularioTitulo');
    const form = document.getElementById('usuarioForm');
    const sections = document.querySelectorAll('.form-section');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.querySelector('.progress-bar');
    let currentSection = 0;

    function showSection(n) {
        sections[currentSection].style.display = 'none';
        sections[n].style.display = 'block';
        currentSection = n;

        if (currentSection === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }

        if (currentSection === sections.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }

        updateProgressBar();
    }

    function updateProgressBar() {
        const progress = ((currentSection + 1) / sections.length) * 100;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
        progressBar.textContent = Math.round(progress) + '%';
    }

    prevBtn.addEventListener('click', function() {
        showSection(currentSection - 1);
    });

    nextBtn.addEventListener('click', function() {
        if (validateSection(currentSection)) {
            showSection(currentSection + 1);
        }
    });

    if (id !== null) {
        const usuario = usuarios[id];
        if (usuario) {
            formularioTitulo.textContent = 'Editar Usuario';
            
            form.nombre.value = usuario.Nombre;
            form.apellidos.value = usuario.Apellidos;
            form.email.value = usuario.email;
            form.fechaNacimiento.value = usuario['Fecha_de_nacimiento'];
            form.ciudadResidencia.value = usuario['Ciudad_de_residencia'];
            form.paisResidencia.value = usuario['País_de_residencia'];
        } else {
            alert('Usuario no encontrado');
            window.location.href = '404.html';
        }
    } else {
        formularioTitulo.textContent = 'Añadir Usuario';
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nuevoUsuario = {
            Nombre: form.nombre.value,
            Apellidos: form.apellidos.value,
            email: form.email.value,
            'Fecha_de_nacimiento': form.fechaNacimiento.value,
            'Ciudad_de_residencia': form.ciudadResidencia.value,
            'País_de_residencia': form.paisResidencia.value
        };

        if (id !== null) {
            usuarios[id] = nuevoUsuario;
        } else {
            usuarios.push(nuevoUsuario);
        }

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        window.location.href = 'usuarios.html';
    });
    function validateSection(sectionIndex) {
        const inputs = sections[sectionIndex].querySelectorAll('input');
        for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
    }
    showSection(0);
});
