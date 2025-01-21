document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id !== null) {
        fetch(`posts/post-${id}.html`)
            .then(response => response.text())
            .then(html => {
                document.getElementById('postContent').innerHTML = html;
            })
            .catch(error => {
                console.error('Error al cargar el post:', error);
            });
    } else {
        console.error('ID de publicación no proporcionado');
    }
});