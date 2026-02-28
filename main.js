    let usuariosBancarios = JSON.parse(localStorage.getItem('cuentas')) || [
        {
            nombreUsuario: 'adrian123',
            password: '123',
            saldo: 1000,
            estado: true,
            intentos: 0,
            movimientos: []// 
        }
    ];
    function actualizarStorage() {
    localStorage.setItem('cuentas', JSON.stringify(usuariosBancarios));
}
    loginIniciar()
//----------------------------------------------------------------------------------------------------------
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
            registrarUsuario()
            break;
        case 3:
            console.log("Gracias por usar el sistema, vuelva pronto");
            return
            break;
        default:
            console.log(`La opcion seleccionada '${menuIniciarSesion}' no es valida, volver intentar`);
            break;
    }
    }while(menuIniciarSesion!=3);
    }
//----------------------------------------------------------------------------------------------------------
    function iniciarSesion() {
    let errorUsuarioEntrada = false;
    do {
        let usuarioEntrada = prompt("Usuario:");
        let passwordEntrada = prompt("Contraseña:");
        let usuarioEncontradoEnSistema = false;

        for (let i = 0; i < usuariosBancarios.length; i++) {
            if (usuarioEntrada === usuariosBancarios[i].nombreUsuario) {
                usuarioEncontradoEnSistema = true;
                if (passwordEntrada === usuariosBancarios[i].password && usuariosBancarios[i].estado === true) {
                    errorUsuarioEntrada = true;
                    usuariosBancarios[i].intentos = 0;
                    actualizarStorage();
                    console.log("Sesión con éxito");
                    transacciones(usuariosBancarios[i]);
                    return;
                }
            }
        }

        if (usuarioEncontradoEnSistema===true) {
            for (let i = 0; i < usuariosBancarios.length; i++) {
                if (usuarioEntrada === usuariosBancarios[i].nombreUsuario) {
                    if (usuariosBancarios[i].estado === false) {
                        console.log("Su cuenta está bloqueada por 24 horas, comunicarse con el banco");
                        return;
                    }
                    usuariosBancarios[i].intentos++;
                    actualizarStorage();
                    console.log(`Credenciales incorrectas. Llevas ${usuariosBancarios[i].intentos} intentos.`);
                    if (usuariosBancarios[i].intentos >= 3) {
                        usuariosBancarios[i].estado = false;
                        actualizarStorage();
                        console.log(`Su Cuenta '${usuariosBancarios[i].nombreUsuario}' ha sido bloqueada.`);
                        return;
                    }
                    break;
                }
            }
        }else{
            console.log("El usuario no existe en el sistema");
            let salirSistemaIniciarSesion=false;
            do{
            let salirSistema = parseInt(prompt("¿Desea salir? (1. Si / 2. No)"));
            if (salirSistema===1){
                return;
            }else if(salirSistema===2){
                salirSistemaIniciarSesion=true;
            }else{
                console.log("Opcion no valida, volver a intentar");
            }
            }while(salirSistemaIniciarSesion===false);
        }
    } while (errorUsuarioEntrada===false);
    }
//----------------------------------------------------------------------------------------------------------
    function registrarUsuario(){
    //LE FALTA VALIDAR MEJOR LOS VACIOS, POR EL MOMENTO MEDIO FUNCIONA.
    //------Variables de entrada--------
        let nombreUsuarioRegistrarEntrada
        let passwordRegistrarEntrada
        let paswordEntradaConfirmar
        let montoInicialEntrada
    //---------------------------------
        let errorVacioNombreEntrada=false
        do{
        nombreUsuarioRegistrarEntrada=prompt("Nombre de Usuario: ")
            if(nombreUsuarioRegistrarEntrada===" "){
                console.log("El campo no puede estar vacio");
            }else{
                errorVacioNombreEntrada=true
            }
        }while(errorVacioNombreEntrada==false);
        let errorVacioContraseñaEntrada = false
        do{
        passwordRegistrarEntrada=prompt("Contraseña: ")
            if(passwordRegistrarEntrada===" "){
                console.log("El campo no puede estar vacio");
            }else{
                errorVacioContraseñaEntrada=true
            }
        }while(errorVacioContraseñaEntrada==false);
        let errorPasswordConfirmar=false
        do{
        paswordEntradaConfirmar = prompt("Confirmar contraseña: ")
            if(paswordEntradaConfirmar===passwordRegistrarEntrada){
                errorPasswordConfirmar=true
                break;
            }else{
                console.log("Las contraseñas no coisiden");
            } 
            if(paswordEntradaConfirmar===" "){
                console.log("El campo no puede estar vacio");
            }
        }while(errorPasswordConfirmar==false);
        let errorMontoInicalEntrada=false
        do{
        montoInicialEntrada=parseFloat(prompt("Monto inicial: "))
            if(montoInicialEntrada<=0){
                console.log("El campo no puede ser 0 o un numero negativo");
            }else{
                errorMontoInicalEntrada=true
            }
        }while(errorMontoInicalEntrada==false);


        let nuevoUsuario = {
        nombreUsuario: nombreUsuarioRegistrarEntrada,
        password: passwordRegistrarEntrada,
        saldo: montoInicialEntrada,
        estado: true,
        intentos: 0,
        movimientos: [] 
        };

        usuariosBancarios.push(nuevoUsuario);
        actualizarStorage();

        console.log(`¡Usuario '${nombreUsuarioRegistrarEntrada}' registrado con éxito!`);
        alert("Registro completado. Ya puedes iniciar sesión.");
    }
//----------------------------------------------------------------------------------------------------------
    function transacciones(nombreUsuario){
        let menuTransacciones
        do{
        menuTransacciones = parseInt(prompt(`--Transacciones--\n
            1. Retirar\n
            2. Consultar saldo\n
            3. consignar\n
            4. Consultar Movimientos\n
            5. Cerrar Sesion\n
            `));
        switch(menuTransacciones){
            case 1: 
                retirar(nombreUsuario)
                break;
            case 2:
                consultarSaldo(nombreUsuario)
                break;
            case 3:
                consignarSaldo(nombreUsuario)
                break;
            case 4:
                consultarMovimientos(nombreUsuario)
                break;
            case 5:
                console.log("Sesion cerrada con exito");
                return
                break;
            default:
                console.log("opcion seleccionada '"+menuTransacciones+"' no valida");
                break;
        }
    }while(menuTransacciones!=5);
    }
//----------------------------------------------------------------------------------------------------------
    function retirar(nombreUsuario){
        let montoRetirarEntrada
        let errorMontoRetirarEntrada=false
        do{
            montoRetirarEntrada=parseFloat(prompt("Monto a retirar: "))
            if(montoRetirarEntrada<=0||montoRetirarEntrada>nombreUsuario.saldo){
                console.log("El campo es incorrecto");
            }else{
                nombreUsuario.saldo-=montoRetirarEntrada
                nombreUsuario.movimientos.push(`Retiro: -$${montoRetirarEntrada}`);
                actualizarStorage()
                errorMontoRetirarEntrada=true
            }
        }while(errorMontoRetirarEntrada==false);
    
        console.log("Su saldo actual es de: "+nombreUsuario.saldo);

    }
//----------------------------------------------------------------------------------------------------------
    function consultarSaldo(nombreUsuario){
        console.log("Su saldo es: "+nombreUsuario.saldo);
    }
//----------------------------------------------------------------------------------------------------------
    function consignarSaldo(nombreUsuario){
        let montoConsignarSaldo
        let errorConsignarSaldo=false
        do{
            montoConsignarSaldo=parseFloat(prompt("Monto a consignar: "))
                if(montoConsignarSaldo<=0){
                    console.log("El campo es incorrecto, volver a intentar");
                }else{
                    nombreUsuario.saldo+=montoConsignarSaldo
                    nombreUsuario.movimientos.push(`Consignacion: -$${montoConsignarSaldo}`);
                    actualizarStorage()
                    errorConsignarSaldo=true
                }
        }while(errorConsignarSaldo==false);
        console.log("!Consignacion con exito¡");
        console.log("Su saldo actual es de: "+nombreUsuario.saldo);
    }
//----------------------------------------------------------------------------------------------------------
    function consultarMovimientos(nombreUsuario) {
    console.log(`--- Historial de Movimientos de ${nombreUsuario.nombreUsuario} ---`);
    if(nombreUsuario.movimientos.length===0){
                    console.log("NO hay moviemientos");
                    return;
                }
        for(let i=0; i<nombreUsuario.movimientos.length; i++){
                console.log((i+1)+". "+nombreUsuario.movimientos[i]);
        }
}
    