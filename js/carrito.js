document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify([]));
    }

    mostrarCarrito();
});

function mostrarCarrito() {
    const carritoContenido = document.getElementById('carrito-contenido');
    carritoContenido.innerHTML = '';

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.forEach(producto => {
        const precio = typeof producto.precio === 'number' ? producto.precio.toFixed(2) : 'Precio no disponible';
        const imagenSrc = producto.imagen || 'ruta_por_defecto_si_no_hay_imagen.jpg';

        const productoHTML = `
            <div class="carrito-producto">
                <img src="${imagenSrc}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <button onclick="eliminarDelCarrito('${producto.id}')">Eliminar</button>
            </div>
        `;
        carritoContenido.innerHTML += productoHTML;
    });

    if (carrito.length > 0) {
        const total = carrito.reduce((acumulador, producto) => {
            const precio = typeof producto.precio === 'number' ? producto.precio : 0;
            return acumulador + (precio * producto.cantidad);
        }, 0);

        const totalHTML = `<div class="carrito-total">Total: $${total.toFixed(2)}</div>`;
        carritoContenido.innerHTML += totalHTML;
    }
}

function eliminarDelCarrito(id) {
    console.log('Eliminando producto con ID:', id);

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoActualizado = carrito.filter(producto => producto.id !== id);

    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));

    mostrarCarrito();
}
