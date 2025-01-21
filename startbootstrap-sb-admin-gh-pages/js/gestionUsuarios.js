document.addEventListener('DOMContentLoaded', function() {
    let table;
    
    function cargarUsuarios() {
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        if (!usuarios) {
            fetch('js/usuarios.json')
                .then(response => response.json())
                .then(data => {
                    usuarios = data.map(user => ({...user, bloqueado: false}));
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    inicializarTabla(usuarios);
                });
        } else {
            inicializarTabla(usuarios);
        }
    }

    function inicializarTabla(usuarios) {
        table = $('#usuariosTable').DataTable({
            data: usuarios,
            pageLength: 5,
            lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]],
            columns: [
                { 
                    data: 'Nombre',
                    className: 'align-middle text-center'
                },
                { 
                    data: 'Apellidos',
                    className: 'align-middle text-center'
                },
                { 
                    data: 'email',
                    className: 'align-middle text-center'
                },
                {
                    data: null,
                    render: function(data, type, row) {
                        const bloqueado = row.bloqueado;
                        return `
    <div class="container p-0">
      <div class="row g-1">
        <div class="col-6">
          <button class="btn btn-primary btn-sm w-100" onclick="abrirFormulario('${row.email}')" ${bloqueado ? 'disabled' : ''}>Editar Perfil</button>
        </div>
        <div class="col-6">
          <button class="btn btn-secondary btn-sm w-100" onclick="verPosts('${row.email}')" ${bloqueado ? 'disabled' : ''}>Ver Posts</button>
        </div>
      </div>
      <div class="row g-1 mt-1">
        <div class="col-6">
          <button class="btn ${bloqueado ? 'btn-success' : 'btn-warning'} btn-sm w-100" onclick="${bloqueado ? 'desbloquearUsuario' : 'bloquearUsuario'}('${row.email}')">
            ${bloqueado ? 'Desbloquear' : 'Bloquear'}
          </button>
        </div>
        <div class="col-6">
          <button class="btn btn-danger btn-sm w-100" onclick="borrarUsuario('${row.email}')">Borrar</button>
        </div>
      </div>
    </div>
  `;
                    },
                    className: 'align-middle text-center'
                }
            ],
            language: {
                url: 'https://cdn.jsdelivr.net/npm/datatables.net-plugins@1.11.5/i18n/es-ES.json'
            },
            createdRow: function(row, data, dataIndex) {
                if (data.bloqueado) {
                    $(row).addClass('elemento-bloqueado');
                }
            },
            rowCallback: function(row, data) {
                $(row).attr('data-email', data.email);
            }
        });
    }

    

    cargarUsuarios();

    window.bloquearUsuario = function(email) {
        if (confirm('¿Estás seguro de que quieres bloquear a este usuario?')) {
            let usuarios = JSON.parse(localStorage.getItem('usuarios'));
            const userIndex = usuarios.findIndex(user => user.email === email);
            if (userIndex !== -1) {
                usuarios[userIndex].bloqueado = true;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                table.clear().rows.add(usuarios).draw();
            }
        }
    };

    window.desbloquearUsuario = function(email) {
        if (confirm('¿Estás seguro de que quieres desbloquear a este usuario?')) {
            let usuarios = JSON.parse(localStorage.getItem('usuarios'));
            const userIndex = usuarios.findIndex(user => user.email === email);
            if (userIndex !== -1) {
                usuarios[userIndex].bloqueado = false;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                table.clear().rows.add(usuarios).draw();
            }
        }
    };

    window.borrarUsuario = function(email) {
        if (confirm('¿Estás seguro de que quieres borrar a este usuario?')) {
            let usuarios = JSON.parse(localStorage.getItem('usuarios'));
            usuarios = usuarios.filter(user => user.email !== email);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            table.clear().rows.add(usuarios).draw();
        }
    };


        window.abrirFormulario = function (email) {

            if (email !== undefined) {
                let usuarios = JSON.parse(localStorage.getItem('usuarios'));
                let indiceUsuario = usuarios.findIndex(u => u.email === email);
                window.location.href = `formulario.html?id=${indiceUsuario}`;
            } else {
                window.location.href = `formulario.html`;
            }
        };


    
    window.verPosts = function(email) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        let indiceUsuario = usuarios.findIndex(u => u.email === email);
        
        if (indiceUsuario !== -1) {
            window.location.href = `perfil&posts.html?id=${indiceUsuario}`;
        } else {
            console.error('Usuario no encontrado');
        }
    };
});
