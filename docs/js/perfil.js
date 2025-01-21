document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id !== null) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const usuario = usuarios[id];
        
        if (usuario) {
            const perfilDiv = document.getElementById('perfilUsuario');
            const camposFormateados = [
                "Nombre",
                "Apellidos",
                "Email",
                "Fecha de nacimiento",
                "País de residencia",
                "Ciudad de residencia",
            ];
            
            let perfilHTML = '';
            const valoresUsuario = Object.values(usuario);
            
            for (let i = 0; i < camposFormateados.length; i++) {
                perfilHTML += `
                 <div> <b>${camposFormateados[i]}:</b> ${valoresUsuario[i]} </div>
                    
                `;
            }
           
            perfilDiv.innerHTML = perfilHTML;
        } else {
            window.location.href = '404.html';
        }
    } else {
        window.location.href = '404.html';
    }
});