// Array para almacenar los nombres de los amigos
let amigos = [];
const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();
    
    // Validar que el nombre no esté vacío
    if (nombre === '') {
        alert('Por favor, escribe un nombre válido.');
        return;
    }
    
    // Validar que el nombre contenga solo letras y caracteres especiales del español
    if (!soloLetras.test(nombre)) {
        alert('El nombre solo puede contener letras y espacios.');
        return;
    }
    
    // Validar que el nombre no esté duplicado
    if (amigos.includes(nombre)) {
        alert('Este nombre ya está en la lista.');
        return;
    }
    
    // Agregar el nombre al array
    amigos.push(nombre);
    
    // Limpiar el input
    input.value = '';
    
    // Actualizar la lista visual
    actualizarListaAmigos();
    
    // Verificar si se puede habilitar el botón de sortear
    verificarBotonSortear();
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    amigos.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

// Función para verificar si se debe habilitar el botón de sortear
function verificarBotonSortear() {
    const botonSortear = document.getElementById('sortearAmigo');
    
    if (amigos.length >= 2) {
        botonSortear.disabled = false;
        botonSortear.style.opacity = '1';
        botonSortear.style.cursor = 'pointer';
    } else {
        botonSortear.disabled = true;
        botonSortear.style.opacity = '0.5';
        botonSortear.style.cursor = 'not-allowed';
    }
}

// Función para sortear un amigo secreto
function sortearAmigo() {
    // Verificar que hay al menos 2 amigos
    if (amigos.length < 2) {
        alert('Necesitas al menos 2 amigos para realizar el sorteo.');
        return;
    }
    
    // Generar un índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio];
    
    // Mostrar el resultado
    mostrarResultado(amigoSorteado);
}

// Función para mostrar el resultado del sorteo
function mostrarResultado(amigoSorteado) {
    const resultado = document.getElementById('resultado');
    const listaAmigos = document.getElementById('listaAmigos');
    const buttonContainer = document.querySelector('.button-container');
    
    // Ocultar la lista de amigos
    listaAmigos.style.display = 'none';
    
    // Agregar más espacio antes del resultado
    resultado.style.marginTop = '40px';
    
    // Mostrar el resultado
    resultado.innerHTML = `El amigo secreto sorteado es: ${amigoSorteado}`;
    
    // Crear y mostrar el botón de "Nuevo intento"
    let nuevoIntentoBtn = document.getElementById('nuevoIntento');
    if (!nuevoIntentoBtn) {
        nuevoIntentoBtn = document.createElement('button');
        nuevoIntentoBtn.id = 'nuevoIntento';
        nuevoIntentoBtn.textContent = 'Nuevo intento';
        nuevoIntentoBtn.className = 'button-retry';
        nuevoIntentoBtn.onclick = reiniciarJuego;
        buttonContainer.appendChild(nuevoIntentoBtn);
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    location.reload();
}

// Función para manejar la tecla Enter en el input
function manejarEnter(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el event listener para la tecla Enter
    const input = document.getElementById('amigo');
    input.addEventListener('keypress', manejarEnter);
    
    // Deshabilitar el botón de sortear inicialmente
    verificarBotonSortear();
    
    // Enfocar el input al cargar la página
    input.focus();
});