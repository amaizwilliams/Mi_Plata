    let usuariosBancarios = JSON.parse(localStorage.getItem('cuentas')) || [
        {
            nombreUsuario: 'adrian',
            password: '123',
            saldo: 1000,
            estado: true,
            intentos: 0,
            movimientos: []
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
                console.log(`La opcion seleccionada no es valida, volver intentar`);
                break;
        }
    }while(menuIniciarSesion!=3);
//----------------------------------------------------------------------------------------------------------
    function iniciarSesion() {
        let intentosUsuario = 0;
        let errorUsuarioEntrada = true;

        while(errorUsuarioEntrada) {
            let usuarioEntrada = prompt("Usuario:");
            if (usuarioEntrada === `` || usuarioEntrada === ` ` || usuarioEntrada === null) {
                console.log(`El campo 'Usuario' no puede estar vacio.`);
            } else {
                for (let i = 0; i < usuariosBancarios.length; i++) {
                    if (usuarioEntrada === usuariosBancarios[i].nombreUsuario) {
                        if (usuariosBancarios[i].estado === false) {
                            console.log(`Su cuenta se encuentra bloqueada.`);
                            errorUsuarioEntrada = false;
                            break;
                        } else {
                            let passwordEntrada = prompt("Contraseña:");
                            if (passwordEntrada === `` || passwordEntrada === ` ` || passwordEntrada === null) {
                                console.log(`La contraseña no puede estar vacia.`);
                            } else {
                                if (passwordEntrada === usuariosBancarios[i].password) {
                                    console.log("Sesión con éxito");
                                    transacciones(usuariosBancarios[i]);
                                    return;
                                } else {
                                    intentosUsuario ++;
                                    if (intentosUsuario < 3) {
                                        console.log(`La contraseña es incorrecta. Lleva ${intentosUsuario} intento/s`);
                                    }
                                    if (intentosUsuario === 3) {
                                        usuariosBancarios[i].estado = false;
                                        actualizarStorage();
                                        console.log(`Su cuenta a sido bloqueada por 3 intentos fallidos. Debera esperar 24 horas`);
                                        errorUsuarioEntrada = false;
                                    }
                                    break;
                                }
                            }
                        }
                    } else {
                        if (i == (usuariosBancarios.length - 1)) {
                            console.log(`El usuario '${usuarioEntrada}' no existe en el sistema`);
                        }
                    }
                }
            }
        }
    }
//----------------------------------------------------------------------------------------------------------
    function registrarUsuario(){ 
        let nombreUsuarioRegistrarEntrada
        let passwordRegistrarEntrada
        let paswordEntradaConfirmar
        let montoInicialEntrada

        let errorVacioNombreEntrada = true
        while(errorVacioNombreEntrada) {
            nombreUsuarioRegistrarEntrada=prompt("Nombre de Usuario: ")
            if(nombreUsuarioRegistrarEntrada==="" || nombreUsuarioRegistrarEntrada===" "  || nombreUsuarioRegistrarEntrada=== null){
                console.log("El campo no puede estar vacio");
            }else{
                for (let i = 0; i < usuariosBancarios.length; i++) {
                    if (nombreUsuarioRegistrarEntrada === usuariosBancarios[i].nombreUsuario) {
                        console.log(`Ya exite una cuenta con ese usuario.`);
                        errorVacioNombreEntrada = true;
                        break;
                    } else {
                        errorVacioNombreEntrada = false
                    }
                }
            }
        }

        let errorVacioContraseñaEntrada = true
        while(errorVacioContraseñaEntrada) {
            passwordRegistrarEntrada=prompt("Contraseña: ")
            if(passwordRegistrarEntrada==="" || passwordRegistrarEntrada===" " || passwordRegistrarEntrada === null){
                console.log("El campo no puede estar vacio");
            }else{
                errorVacioContraseñaEntrada = false
            }
        }

        let errorPasswordConfirmar = true
        while(errorPasswordConfirmar) {
            paswordEntradaConfirmar = prompt("Confirmar contraseña: ")
            if(paswordEntradaConfirmar==="" || paswordEntradaConfirmar===" " || paswordEntradaConfirmar === null){
                console.log("El campo no puede estar vacio");
            } else {
                if(paswordEntradaConfirmar===passwordRegistrarEntrada){
                errorPasswordConfirmar = false
                }else{
                    console.log("Las contraseñas no coisiden");
                    errorPasswordConfirmar = true
                } 
            }
        }

        let errorMontoInicalEntrada = true
        while(errorMontoInicalEntrada){
            montoInicialEntrada=prompt("Monto inicial: ")
            if(montoInicialEntrada === "" || montoInicialEntrada === " " || montoInicialEntrada === null){
                console.log(`El campo no puede estar vacio`);
            }else{
                montoInicialEntrada = parseFloat(montoInicialEntrada);
                if (montoInicialEntrada <= 0) {
                    console.log(`El campo no puede ser 0 o un numero negativo`);
                } else {
                    errorMontoInicalEntrada = false
                }
            }
        }

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
        let menuTransacciones = true
        while(menuTransacciones) {
        menuTransacciones = prompt(`--Transacciones--\n
            1. Retirar\n
            2. Consultar saldo\n
            3. Consignar\n
            4. Consultar Movimientos\n
            5. Transferir\n
            6. Cerrar sesion
            `);
            if (menuTransacciones === "" || menuTransacciones === " " || menuTransacciones === null) {
                menuTransacciones = true
                console.log(`opcion seleccionada no valida`);
            } else {
                menuTransacciones = parseInt(menuTransacciones)
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
                        menuTransacciones = false
                        console.log("Sesion cerrada con exito");
                        break;
                    default:
                        console.log("opcion seleccionada '"+menuTransacciones+"' no valida");
                        break;
                }
            }
        };
    }
//----------------------------------------------------------------------------------------------------------
    function retirar(nombreUsuario) {
        let montoRetirarEntrada
        let errorMontoRetirarEntrada = true

        while(errorMontoRetirarEntrada) {
            montoRetirarEntrada = prompt("Monto a retirar: ")
            if (montoRetirarEntrada === `` || montoRetirarEntrada === ` ` || montoRetirarEntrada === null) {
                console.log(`El campo no puede estar vacio`);
            } else {
                montoRetirarEntrada = parseFloat(montoRetirarEntrada);
                if(montoRetirarEntrada <= 0) {
                    console.log(`El monto no puede ser 0 o menor.`);
                } else {
                    if (montoRetirarEntrada > nombreUsuario.saldo){
                        console.log("¡El saldo es insuficiente!");
                    } else {
                        nombreUsuario.saldo -= montoRetirarEntrada
                        nombreUsuario.movimientos.push(`${new Date().toLocaleString()} Retiro: -$${montoRetirarEntrada}`);
                        actualizarStorage()
                        errorMontoRetirarEntrada = false;
                    }
                }
            }
        }
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
        let errorConsignarSaldo = true

        while(errorConsignarSaldo) {
            montoConsignarSaldo = prompt("Monto a consignar: ")
            if (montoConsignarSaldo === `` || montoConsignarSaldo === ` ` || montoConsignarSaldo === null) {
                console.log(`El campo no puede estar vacio`);
            } else {
                montoConsignarSaldo = parseFloat(montoConsignarSaldo);
                if(montoConsignarSaldo <= 0){
                    console.log("¡El campo es incorrecto!");
                }else{
                    nombreUsuario.saldo += montoConsignarSaldo
                    nombreUsuario.movimientos.push(`${new Date().toLocaleString()} Consignacion: +$${montoConsignarSaldo}`);
                    actualizarStorage()
                    errorConsignarSaldo = false
                }
            }
        };
        console.log("!Consignacion con exito¡");
        console.log("Su saldo actual es de: "+nombreUsuario.saldo);
    }
//----------------------------------------------------------------------------------------------------------
    function consultarMovimientos(nombreUsuario){
    console.log(`Movimientos:`);
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
        let errorTransferir = true

        while(errorTransferir) {
            montoTransferirEntrada = prompt("Ingrese el monto a tranferir: ")
            if (montoTransferirEntrada === `` || montoTransferirEntrada === ` ` || montoTransferirEntrada === null) {
                console.log(`El campo no puede estar vacio`);
            } else {
                montoTransferirEntrada = parseFloat(montoTransferirEntrada)
                if (montoTransferirEntrada <= 0) {
                    console.log(`El campo no puede ser 0 o un numero negativo`);
                } else {
                    if (montoTransferirEntrada > nombreUsuario.saldo) {
                        console.log("Saldo insuficiente");
                        errorTransferir = false
                    } else {
                        nombreUsuarioTransferirEntrada = prompt("Usuario: ")
                        if (nombreUsuarioTransferirEntrada === `` || nombreUsuarioTransferirEntrada === ` ` || nombreUsuarioTransferirEntrada === null) {
                            console.log(`El campo no puede estar vacio`);
                        } else {
                            for(let i=0; i<usuariosBancarios.length; i++) {
                                if (nombreUsuarioTransferirEntrada === usuariosBancarios[i].nombreUsuario) {
                                    nombreUsuario.saldo -= montoTransferirEntrada
                                    usuariosBancarios[i].saldo += montoTransferirEntrada
                                    nombreUsuario.movimientos.push(`${new Date().toLocaleString()} Transferencia enviada a ${usuariosBancarios[i].nombreUsuario}: -$${montoTransferirEntrada}`);
                                    usuariosBancarios[i].movimientos.push(`${new Date().toLocaleString()} Transferencia recibida de ${nombreUsuario.nombreUsuario}: +$${montoTransferirEntrada}`);
                                    actualizarStorage()
                                    errorTransferir = false;
                                    console.log("¡Transferencia con exito!");
                                    console.log("Su saldo actual es: "+nombreUsuario.saldo);
                                    break;
                                } else {
                                    if (i == (usuariosBancarios.length - 1)) {
                                        console.log(`El usuario no existe`);
                                        errorTransferir = false;
                                    }
                                }
                            }
                        }
                    }   
                }
            }
        };
    }
