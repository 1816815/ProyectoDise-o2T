document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const formularioTitulo = document.getElementById('formularioTitulo');
    const usuarioForm = document.getElementById('usuarioForm');

    if (id !== null) {
        const usuario = usuarios[id];
        if (usuario) {
            formularioTitulo.textContent = 'Editar Usuario';
            
            usuarioForm.nombre.value = usuario.Nombre;
            usuarioForm.apellidos.value = usuario.Apellidos;
            usuarioForm.email.value = usuario.email;
            usuarioForm.fechaNacimiento.value = usuario['Fecha_de_nacimiento'];
            usuarioForm.ciudadResidencia.value = usuario['Ciudad_de_residencia'];
            usuarioForm.paisResidencia.value = usuario['País_de_residencia'];
        } else {
            alert('Usuario no encontrado');
            window.location.href = '404.html';
        }
    } else {
        formularioTitulo.textContent = 'Añadir Usuario';
    }

    usuarioForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nuevoUsuario = {
            Nombre: usuarioForm.nombre.value,
            Apellidos: usuarioForm.apellidos.value,
            email: usuarioForm.email.value,
            'Fecha_de_nacimiento': usuarioForm.fechaNacimiento.value,
            'Ciudad_de_residencia': usuarioForm.ciudadResidencia.value,
            'País_de_residencia': usuarioForm.paisResidencia.value
        };

        if (id !== null) {
            usuarios[id] = nuevoUsuario;
        } else {
            usuarios.push(nuevoUsuario);
        }

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        window.location.href = 'usuarios.html';
    });
});
