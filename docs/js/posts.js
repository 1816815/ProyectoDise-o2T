document.addEventListener('DOMContentLoaded', function() {
    let table;
    

    function cargarPublicaciones() {
        let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
        if (!publicaciones) {
            fetch('js/publicaciones.json')
                .then(response => response.json())
                .then(data => {
                    publicaciones = data.map(pub => ({...pub, bloqueada: false}));
                    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
                    inicializarTabla(publicaciones);
                });
        } else {
            inicializarTabla(publicaciones);
        }
    }

    function inicializarTabla(publicaciones) {
        table = $('#publicacionesTable').DataTable({
            data: publicaciones,
            pageLength: 5,
            lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]],
            order: [[1, 'desc']],
            columns: [
                { 
                    data: 'titulo',
                    className: 'align-middle text-center'
                },
                { 
                    data: 'fecha',
                    className: 'align-middle text-center'
                },
                {
                    data: null,
                    render: function(data, type, row) {
                        const bloqueada = row.bloqueada;
                        return `
    <div class="container p-0">
      <div class="row g-1">
        <div class="col-6">
          <button class="btn btn-primary btn-sm w-100" onclick="verPublicacion('${row.titulo}')" ${bloqueada ? 'disabled' : ''}>Ver</button>
        </div>
        <div class="col-6">
          <button class="btn ${bloqueada ? 'btn-success' : 'btn-warning'} btn-sm w-100" onclick="${bloqueada ? 'desbloquearPublicacion' : 'bloquearPublicacion'}('${row.titulo}')">
            ${bloqueada ? 'Desbloquear' : 'Bloquear'}
          </button>
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
                if (data.bloqueada) {
                    $(row).addClass('elemento-bloqueado');
                }
            }
        });
    }

    cargarPublicaciones();

    window.bloquearPublicacion = function(titulo) {
        if (confirm('¿Estás seguro de que quieres bloquear esta publicación?')) {
            let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
            const pubIndex = publicaciones.findIndex(pub => pub.titulo === titulo);
            if (pubIndex !== -1) {
                publicaciones[pubIndex].bloqueada = true;
                localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
                table.clear().rows.add(publicaciones).draw();
            }
        }
    };

    window.desbloquearPublicacion = function(titulo) {
        if (confirm('¿Estás seguro de que quieres desbloquear esta publicación?')) {
            let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
            const pubIndex = publicaciones.findIndex(pub => pub.titulo === titulo);
            if (pubIndex !== -1) {
                publicaciones[pubIndex].bloqueada = false;
                localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
                table.clear().rows.add(publicaciones).draw();
            }
        }
    };

    window.verPublicacion = function(titulo) {
        let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
        let indicePublicacion = publicaciones.findIndex(pub => pub.titulo === titulo);
        
        if (indicePublicacion !== -1) {
            window.location.href = `post.html?id=${indicePublicacion}`;
        } else {
            console.error('Publicación no encontrada');
        }
    };
    
});
