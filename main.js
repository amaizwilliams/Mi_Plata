
let usuario=['adrian123','will']
let password=['123','321']
let estado=[true,true]
loginIniciar()

function loginIniciar(menuIniciarSesion){
do{
let menuIniciarSesion=parseInt(prompt("Login\n"+
    "1.Iniciar sesion\n"+
    "2.Registrarse\n"+
    "3.Salir\n"));
switch(menuIniciarSesion){
    case 1:
        iniciarSesion() 
        break;
    case 2:
        errorIncioSesion=true
        break;
    case 3:
        console.log("Adios");
        return
        break;
    default:
        console.log(`La opcion seleccionada '${menuIniciarSesion}' no es valida, volver intentar`);
        break;
}
}while(menuIniciarSesion!=3);
}

function iniciarSesion(usuarioEntrada, passwordEntrada){
    let contadorBloqueo=0
    let errorUsuarioEntrada=false
    do{
        if(contadorBloqueo>1){
    console.log(`Al tercer intento tu cuenta sera bloqueda.\n
        llevas ${contadorBloqueo} intentos, te queda uno`);
    }
    let usuarioEntrada=prompt(`Usario: `)
    let passwordEntrada=prompt(`Contraseña: `)
    for(let i=0; i<usuario.length; i++){
    if(usuarioEntrada===usuario[i] && passwordEntrada===password[i] && estado[i]===true){
        errorUsuarioEntrada=true;
        console.log("Sesion con exito");
        control()
        break;
    }
    if(usuarioEntrada===usuario[i] && passwordEntrada!=password[i]){
        contadorBloqueo++
    }
    if(contadorBloqueo>=3){
            estado[i]=false
            console.log("Cuenta ah sido bloqueda");
                for(let tiempoBloqueo=0; tiempoBloqueo>=300; i++){
                    estado[i]=true
                }
            return
        }
    if(usuarioEntrada==usuario[i]&&estado[i]==false){
        console.log("Su cuenta esta bloqueda");
        return
    }
    }
    if(errorUsuarioEntrada===false){
        console.log("Credenciales incorrectas, volver a intentar ");
        
    }
    
    }while(errorUsuarioEntrada==false)
}

function control(menudeControl){
    do{
    let menudeControl = parseInt(prompt(`control\n
        1. ver saldo\n
        2. consignar\n
        3. Cerrar sesion\n
        `));
    switch(menudeControl){
        case 1: 
            console.log("Ver saldo");
            break;
        case 2:
            console.log("monto");
            break;
        case 3:
            console.log("Sesion cerrada con exito");
            return
            break;
        default:
            console.log("opcion seleccionada '"+menudeControl+"' no valida");
            break;
    }
}while(menudeControl!=3);
}
