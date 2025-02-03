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
            
            let perfilHTML = '<div class="container"><div class="row">';
            const valoresUsuario = Object.values(usuario);
            
            for (let i = 0; i < camposFormateados.length; i++) {
                perfilHTML += `
                    <div class="col-md-6 mb-3">
                        <div class="card perfil-card">
                            <div class="card-body">
                                <h5 class="card-title">${camposFormateados[i]}</h5>
                                <p class="card-text">${valoresUsuario[i]}</p>
                            </div>
                        </div>
                    </div>
                `;
                
                if (i === 1) {
                    perfilHTML += '</div><div class="row">';
                }
            }
            
            perfilHTML += '</div>';


            
            perfilDiv.innerHTML = perfilHTML;
        } else {
            window.location.href = '404.html';
        }
    } else {
        window.location.href = '404.html';
    }
});
