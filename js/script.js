/* VARIABLES */

// Objeto con los datos de la agenda
const datos = {
    id: Math.round(Math.random()*10000+1),
    nombre: '',
    telefono: '',
    direccion: ''
}

const nombreElem = document.querySelector('#nombre');
const telefonoElem = document.querySelector('#telefono');
const direccionElem = document.querySelector('#direccion');
const botonElem = document.querySelector('.boton');

const listaContactos = document.querySelector('.listado-tareas');

//Accediendo al `local storage`
const locSto = window.localStorage

const formulario = document.querySelector('.formulario');

/* EVENTOS */

// Evento `input`
nombreElem.addEventListener('input', leyendoDatos);
telefonoElem.addEventListener('input', leyendoDatos);
direccionElem.addEventListener('input', leyendoDatos);

// Evento `submit` para validar  y guardar datos del formulario
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    // Validando formulario
    const { nombre, telefono, direccion} = datos;

    if(nombre === "" || telefono === "" || direccion === "") {
        showAlert('Todos los campos son obligatorios.', 'warning');
        return;
    }
    
    showAlert('Agregando datos...') 
    
    // Guardando datos en el local storage.
    guardarContacto(locSto, datos);

});

cargarContacto(locSto, listaContactos);

validarLocalStorage(locSto, listaContactos);

/* FUNCIONES */
// Función que permite colocar cada dato de la agenda en su respectiva propiedad del objeto `datos`
function leyendoDatos(e) {
    datos[e.target.id] = e.target.value;
}

// Función que muestra en pantalla que los campos están vacíos o si los datos fueron guardados correctamente.
function showAlert(msj, warning = null){
    const alert = document.createElement('P');
    alert.textContent = msj;
    
    alert.classList.add('true');
    const verdadero = document.querySelector('.true');

    if(!verdadero){
        if(warning === 'warning'){
            alert.classList.add('warning');
        } else {
            alert.classList.add('guardado');
        }
        formulario.appendChild( alert );

        setTimeout(() => {
            alert.remove()
        }, 2000);
    }
}

// Función que valida si está vacía la local storage y muestra mensaje en el documento html.
function validarLocalStorage(locSto, parentNode){
    let divContacto = document.createElement('DIV');
    const vacio = document.createElement('P');
    vacio.textContent = 'Tu agenda de contactos está vacía.';

    if(locSto.length === 0){
        divContacto.classList.add('vacio');
        divContacto.appendChild(vacio);
        parentNode.appendChild(divContacto);
    }
}

// Función para guardar contacto en local storage
function guardarContacto(locSto, datos){

    // Pasando el objeto `datos` a string
    locSto.setItem(datos.id, JSON.stringify(datos));
    // Recargando los campos
    setTimeout(() => {
        window.location.href = '/'
    }, 1000);
}

// Función para mostrar los contactos guardados en LS en el documento HTML
function cargarContacto(locSto, parentNode){
    let llaves = Object.keys(locSto);
    for (let llave of llaves) {
        let contact = JSON.parse(locSto.getItem(llave));
        mostrarContacto(parentNode, contact, locSto);
    }
};

// Función que muestra los datos en pantalla
function mostrarContacto(parentNode, contact, locSto){
    let divContacto = document.createElement('DIV');
    let nombreContacto = document.createElement('H3');
    let telContacto = document.createElement('P');
    let dirContacto = document.createElement('P');
    let iconBorrar = document.createElement('SPAN');

    nombreContacto.textContent = contact.nombre;
    telContacto.textContent = contact.telefono;
    dirContacto.textContent = contact.direccion;
    iconBorrar.textContent = 'delete_forever'; 

    divContacto.classList.add('lista-contactos');
    iconBorrar.classList.add('material-icons', 'icono');

    // Borrando datos de usuario con el icono trash rojo
    iconBorrar.addEventListener('click', () =>  {
       locSto.removeItem(contact.id);
       window.location.href = '/';
    });

    divContacto.appendChild(nombreContacto);
    divContacto.appendChild(telContacto);
    divContacto.appendChild(dirContacto);
    divContacto.appendChild(iconBorrar);

    parentNode.appendChild(divContacto);

}


