document.addEventListener('DOMContentLoaded', function() {

(function(){
    let table;
  
    function showConfirmModal(message, onConfirm) {
      const modalElement = document.getElementById('confirmModal');
      if (!modalElement) {
        console.error("No se encontró el elemento #confirmModal en el DOM");
        return;
      }
      const modal = new bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: false
      });
      

      const modalBody = document.getElementById('confirmModalBody');
      modalBody.textContent = message;
      

      let confirmButton = document.getElementById('confirmModalAccept');
      const newConfirmButton = confirmButton.cloneNode(true);
      confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
      confirmButton = newConfirmButton;

      confirmButton.addEventListener('click', () => {
        onConfirm();
        modal.hide();
      });
      
      modal.show();
    }
  

    function bloquearPublicacion(titulo) {
      showConfirmModal('¿Estás seguro de que quieres bloquear esta publicación?', function() {
        let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
        const pubIndex = publicaciones.findIndex(pub => pub.titulo === titulo);
        if (pubIndex !== -1) {
          publicaciones[pubIndex].bloqueada = true;
          localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
          table.clear().rows.add(publicaciones).draw();
        }
      });
    }
    function verPublicacion(titulo) {
        let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
        let indicePublicacion = publicaciones.findIndex(pub => pub.titulo === titulo);
        
        if (indicePublicacion !== -1) {
            window.location.href = `post.html?id=${indicePublicacion}`;
        } else {
            console.error('Publicación no encontrada');
        }
    };
    function desbloquearPublicacion(titulo) {
      showConfirmModal('¿Estás seguro de que quieres desbloquear esta publicación?', function() {
        let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
        const pubIndex = publicaciones.findIndex(pub => pub.titulo === titulo);
        if (pubIndex !== -1) {
          publicaciones[pubIndex].bloqueada = false;
          localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
          table.clear().rows.add(publicaciones).draw();
        }
      });
    }
  

    function cargarPublicaciones() {
      let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
      if (!publicaciones) {
        fetch('js/publicaciones.json')
          .then(response => response.json())
          .then(data => {
            publicaciones = data.map(pub => ({ ...pub, bloqueada: false }));
            localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
            inicializarTabla(publicaciones);
          })
          .catch(error => console.error("Error al cargar publicaciones:", error));
      } else {
        inicializarTabla(publicaciones);
      }
    }
  
    function inicializarTabla(publicaciones) {
      if ($.fn.DataTable.isDataTable('#publicacionesTable')) {
        table.clear().rows.add(publicaciones).draw();
        return;
      }
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
                      <button class="btn btn-primary btn-sm w-100 ver-publicacion" data-titulo="${row.titulo}" ${bloqueada ? 'disabled' : ''}>
                        Ver
                      </button>
                    </div>
                    <div class="col-6">
                      <button class="btn ${bloqueada ? 'btn-success' : 'btn-warning'} btn-sm w-100 toggle-publicacion" data-titulo="${row.titulo}" data-bloqueada="${bloqueada}">
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
        createdRow: function(row, data) {
          if (data.bloqueada) {
            $(row).addClass('elemento-bloqueado');
          }
        }
      });
    }
  

    $(document).on('click', '.ver-publicacion', function() {
      const titulo = $(this).data('titulo');
      verPublicacion(titulo);
    });
  

    $(document).on('click', '.toggle-publicacion', function() {
      const titulo = $(this).data('titulo');
      const bloqueada = $(this).data('bloqueada');
      if (bloqueada) {
        desbloquearPublicacion(titulo);
      } else {
        bloquearPublicacion(titulo);
      }
    });
  

    $(document).ready(function(){
      cargarPublicaciones();
    });
  

    window.bloquearPublicacion = bloquearPublicacion;
    window.desbloquearPublicacion = desbloquearPublicacion;
    window.verPublicacion = verPublicacion;
  })();

    document.addEventListener('DOMContentLoaded', () => {
      cargarPublicaciones();
    });
  

    
});
