//* ===== VARIABLES =====
let marcaEntrada = prompt("Ingrese el marca del carro");
let modeloEntrada = prompt("Ingrese el modelo del carro");
let anioEntrada = prompt("Ingrese  el anio del carro");
let colorEntrada = prompt("Ingrese el color del carro");
let kilometrajeEntrada = parseInt(prompt('Ingrese el kilometraje del carro (o de su hija)'));


//* ===== OBTENER DATOS DE USUARIO




//* ===== OBJETOS =====



//* ===== FUNCIONES =====
function crearCarro (marcaEntrada, modeloEntrada, anioEntrada, colorEntrada, kilometrajeEntrada) {
    let carro = {
        marca: marcaEntrada,
        modelo: modeloEntrada,
        anio: anioEntrada,
        color: colorEntrada,
        kilometraje: kilometrajeEntrada
    }
    
    localStorage.setItem("carro", JSON.stringify(carro));

}

//* ===== LLAMAR FUNCIONES =====
crearCarro(marcaEntrada, modeloEntrada, anioEntrada, colorEntrada, kilometrajeEntrada)