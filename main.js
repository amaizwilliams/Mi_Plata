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
//----------------------------------------------------------------------------------------------------------
    let menuIniciarSesion
    do{
        menuIniciarSesion=parseInt(prompt("Login\n"+
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
            break;
        default:
            console.log(`La opcion seleccionada '${menuIniciarSesion}' no es valida, volver intentar`);
            break;
    }
    }while(menuIniciarSesion!=3);
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
        let nombreUsuarioRegistrarEntrada
        let passwordRegistrarEntrada
        let paswordEntradaConfirmar
        let montoInicialEntrada

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
        console.log("Registro completado. Ya puedes iniciar sesión.");
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
            5. Transferir\n
            6. Cerrar sesion
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
                transferir(nombreUsuario)
                break;
            case 6:
                console.log("Sesion cerrada con exito");
                break;
            default:
                console.log("opcion seleccionada '"+menuTransacciones+"' no valida");
                break;
        }
    }while(menuTransacciones!=6);
    }
//----------------------------------------------------------------------------------------------------------
    function retirar(nombreUsuario){
        let montoRetirarEntrada
        let errorMontoRetirarEntrada=false
        do{
            montoRetirarEntrada=parseFloat(prompt("Monto a retirar: "))
            if(montoRetirarEntrada<=0||montoRetirarEntrada>nombreUsuario.saldo){
                if(montoRetirarEntrada>nombreUsuario.saldo){
                    console.log("¡El saldo es insuficiente!");
                    errorMontoRetirarEntrada=true
                    return
                }
                console.log("¡El campo es incorrecto");
            }else{
                nombreUsuario.saldo-=montoRetirarEntrada
                nombreUsuario.movimientos.push(`${new Date().toLocaleString()} Retiro: -$${montoRetirarEntrada}`);
                actualizarStorage()
                errorMontoRetirarEntrada=true
            }
        }while(errorMontoRetirarEntrada==false);
        console.log("¡Retiro con exito!");
        console.log("Su saldo actual es de: "+nombreUsuario.saldo);

    }
//----------------------------------------------------------------------------------------------------------
        function consultarSaldo(nombreUsuario){
        console.log("--Saldo--");
        console.log("Su saldo actual: "+nombreUsuario.saldo);
    }
//----------------------------------------------------------------------------------------------------------
    function consignarSaldo(nombreUsuario){
        let montoConsignarSaldo
        let errorConsignarSaldo=false
        do{
            montoConsignarSaldo=parseFloat(prompt("Monto a consignar: "))
                if(montoConsignarSaldo<=0){
                    console.log("¡El campo es incorrecto!");
                }else{
                    nombreUsuario.saldo+=montoConsignarSaldo
                    nombreUsuario.movimientos.push(`${new Date().toLocaleString()} Consignacion: +$${montoConsignarSaldo}`);
                    actualizarStorage()
                    errorConsignarSaldo=true
                }
        }while(errorConsignarSaldo==false);
        console.log("!Consignacion con exito¡");
        console.log("Su saldo actual es de: "+nombreUsuario.saldo);
    }
//----------------------------------------------------------------------------------------------------------
    function consultarMovimientos(nombreUsuario){
    console.log(`Movimientos`);
    if(nombreUsuario.movimientos.length===0){
        console.log("No hay moviemientos");
    }
    for(let i=0; i<nombreUsuario.movimientos.length; i++){
        console.log((i+1)+". "+nombreUsuario.movimientos[i]);
    }
    }
//----------------------------------------------------------------------------------------------------------
    function transferir(nombreUsuario){
        let nombreUsuarioTransferirEntrada
        let montoTransferirEntrada
        let usuarioEncontradoTranferir=false
        let errorTransferir=false
        do{
            nombreUsuarioTransferirEntrada=prompt("usuario: ")
            montoTransferirEntrada=parseFloat(prompt("Monto: "))
        for(let i=0; i<usuariosBancarios.length; i++){
            if(nombreUsuarioTransferirEntrada===usuariosBancarios[i].nombreUsuario){
                usuarioEncontradoTranferir=true 
                if(montoTransferirEntrada>nombreUsuario.saldo){
                    console.log("Saldo insuficiente");
                    errorTransferir=true
                    break;
                }
                if(montoTransferirEntrada<=0){
                    console.log(`El campo no puede ser '${montoTransferirEntrada}'`);
                    errorTransferir=true 
                    break;
                }
                nombreUsuario.saldo-=montoTransferirEntrada
                usuariosBancarios[i].saldo+=montoTransferirEntrada
                nombreUsuario.movimientos.push(`${new Date().toLocaleString()} Transferencia enviada a ${usuariosBancarios[i].nombreUsuario}: -$${montoTransferirEntrada}`);
                usuariosBancarios[i].movimientos.push(`${new Date().toLocaleString()} Transferencia recibida de ${nombreUsuario.nombreUsuario}: +$${montoTransferirEntrada}`);
                actualizarStorage()
                errorTransferir=true
                console.log("¡Transferencia con exito!");
                console.log("Su saldo actual es: "+nombreUsuario.saldo);
            }
        }
            if(usuarioEncontradoTranferir===false){
                let salirTransferencia
                let errorSalirTransferencia=false
                do{
                    salirTransferencia= parseInt(prompt(`El usuario no existe, desea salir (1.Si / 2.No)`));
                    switch(salirTransferencia){
                        case 1:
                            errorTransferir=true
                            errorSalirTransferencia=true
                            break;
                        case 2: 
                            errorSalirTransferencia=true
                            break;
                        default:
                            console.log(`La opcion '${salirTransferencia}' no es valida`);
                            break;
                    }
                }while(errorSalirTransferencia==false);
            } 
        }while(errorTransferir===false);
    }