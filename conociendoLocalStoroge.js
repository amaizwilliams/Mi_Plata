/* 4 Comandos Esenciales:
Guardar  -->  localStorage.setItem("clave", "valor")
Leer     -->  localStorage.getItem("clave")
DeleteOne-->  localStorage.removeItem("clave")
ClearAll -->  localStorage.clear()
 */


//* ===== OBJETOS =====
let carro = {
    marca: "chevrolet",
    modelo: "minisia",
    anio: "2010",
    color: "White",
    kilometraje: 12000
}


//* ===== FUNCIONES =====
function guardarLocalStorage() {
    localStorage.setItem("clave", JSON.stringify(carro));
}

function obtenerLocalStorage() {

}


//* LLAMAR A LA FUNCIONES
guardarLocalStorage();
