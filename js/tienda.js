function agregarAlCarrito(id, nombre, precio, imagen) {
    const producto = {
        id: id,
        nombre: nombre,
        precio: parseFloat(precio),
        imagen: imagen
    };

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`"${nombre}" se agregó al carrito`);
}
