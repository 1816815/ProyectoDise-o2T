document.addEventListener('DOMContentLoaded', function() {

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const publicaciones = JSON.parse(localStorage.getItem('publicaciones')) || [];

    const numUsuarios = usuarios.length;
    const numPublicaciones = publicaciones.length;
    const numUsuariosBloqueados = usuarios.filter(u => u.bloqueado).length;
    const numPublicacionesBloqueadas = publicaciones.filter(p => p.bloqueado).length;


    document.getElementById('num-usuarios').textContent = numUsuarios;
    document.getElementById('num-publicaciones').textContent = numPublicaciones;
    document.getElementById('num-usuarios-bloqueados').textContent = numUsuariosBloqueados;
    document.getElementById('num-publicaciones-bloqueadas').textContent = numPublicacionesBloqueadas;
});
