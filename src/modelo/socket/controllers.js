const Datajson = require('../bases/Datajson');
const datajson = new Datajson();


const socketControllers = (socket)=>{
    

    let contador2 = 0;

    console.log("Usuario conectado",socket.id);
    socket.on('CHAT:MENSAJE:ESTADO',(data)=>{


        datos = {
            persona: data.persona,
            mensaje: data.mensaje,
            id:data.id
        }

        console.log(data);

        socket.emit('CHAT:MENSAJE:MONITOR',datos);
        socket.broadcast.emit('CHAT:MENSAJE:MONITOR',datos);
        socket.to(data.id).emit('CHAT:MENSAJE:MONITOR',datos);

    });


    // socket.on('DATOS:ARDUINO',(data)=>{
    //     socket.broadcast.emit("SERVIDOR:MAESTRO",data);
    //     socket.broadcast.emit("SERVIDOR:ANGULAR",data);
    //     socket.broadcast.emit("SERVIDOR:LOCAL",data);
    // });

    // socket.on('mensaje',(data)=>{
    //     console.log(data);
    // });

    // socket.on('DATOS:EJEMPLO:4',(data)=>{
    //     console.log(data.mensaje);
    // });

    //SERVIDOR



    //VENTILADOR
    //Captar el estado del ventilador true/false y mandar los al monitor
    socket.on('VENTILADOR:ESTADO',(data)=>{
        const datos = {
            valor:data.valor
        };


        socket.broadcast.emit('VENTILADOR:MONITOR',datos);         
    });

    //Encendido del ventilador de forma manual
    socket.on('VENTILADOR:ENCENDIDO',(data)=>{
        socket.broadcast.emit("VENTILADOR:ESTADO",{valor:1});
        socket.broadcast.emit("VENTILADOR:MONITOR",{valor:1});
        socket.emit("VENTILADOR:MONITOR",{valor:1});
    });

    socket.on('VENTILADOR:APAGADO',(data)=>{
        socket.broadcast.emit("VENTILADOR:ESTADO",{valor:0});
        socket.broadcast.emit("VENTILADOR:MONITOR",{valor:0});
        socket.emit("VENTILADOR:MONITOR",{valor:0});

    });

    

    //MOVIMIENTO
    //Captar las lecturas de movimiento y mandar los datos al monitor
    socket.on('MOVIMIENTO:ESTADO',(data)=>{
        const datos = {
            valor:data.valor
        };

        socket.broadcast.emit('MOVIMIENTO:MONITOR',datos);
    });


    //CERRADURA
    //Captar el estado de la cerradura y mandar los datos al monitor
    socket.on('CERRADURA:ESTADO',(data)=>{
        const datos = {
            valor:data.valor
        };
        socket.broadcast.emit('CERRADURA:MONITOR',datos);
    });


    //Mandar señal para el cierre de la cerradura
    socket.on('CERRADURA:ABRIR',(data)=>{
        socket.broadcast.emit('CERRADURA:ESTADO',{valor:1});
        socket.broadcast.emit('CERRADURA:MONITOR',{valor:1});
        socket.emit('CERRADURA:MONITOR',{valor:1});
    });

    socket.on('CERRADURA:CERRAR',(data)=>{
        socket.broadcast.emit('CERRADURA:ESTADO',{valor:0});
        socket.broadcast.emit('CERRADURA:MONITOR',{valor:0});
        socket.emit('CERRADURA:MONITOR',{valor:0});
    });



    //CORRIENTE
     //Captar el nivel de corriente y mandarla al monitor
     socket.on('CORRIENTE:ESTADO',(data)=>{
        const datos = {
            valor:data.valor
        };

        socket.broadcast.emit('CORRIENTE:MONITOR',datos);
    });


    //TEMPERATURA
    //Captar la temperatura del lugar y mandarla al monitor 
    socket.on('TEMPERATURA:ESTADO',(data)=>{
        const datosDB = datajson.leerBaseDatos();
        const temperaturaEnviada = data.valor;
        const temperaturaGuardada = datosDB.TEMPERATURA;


        const datos = {
            valor:data.valor
        };


        if(temperaturaEnviada < temperaturaGuardada){
            socket.broadcast.emit('VENTILADOR:ESTADO',{valor:1});
            socket.broadcast.emit('VENTILADOR:MONITOR',{valor:1});

        }

        if(temperaturaEnviada >= temperaturaGuardada){
            socket.broadcast.emit('VENTILADOR:ESTADO',{valor:0});
            socket.broadcast.emit('VENTILADOR:MONITOR',{valor:0});
        }

        socket.broadcast.emit('TEMPERATURA:MONITOR', datos);
        socket.emit('TEMPERATURA:MONITOR', datos);
    });
    


    //HUMEDAD
    //Captar la humedad del ambiente y mandarla al monitor
    socket.on('HUMEDAD:ESTADO',(data)=>{
        const datos = {
            valor:data.valor
        };
        socket.broadcast.emit('HUMEDAD:MONITOR',datos);
    });

    //ALTITUD
    //Captar la altitud del lugar y mandarla monitor
    socket.on('ALTITUD:ESTADO',(data)=>{
        const datos = {
            valor:data.valor
        };

        socket.broadcast.emit('ALTITUD:MONITOR',datos);
    });


    //Iluminacion
    //Captar el estado de la iluminicacion y mandar al monitor
    socket.on('ILUMINACION:ESTADO',(data)=>{
        const datos = {
            valor:data.valor
        };

        socket.broadcast.emit('ILUMINACION:MONITOR',datos);
    });


    //Apagado de la iluminacion 
    socket.on('ILUMINACION:ENCENDIDO',(data)=>{
        socket.broadcast.emit('ILUMINACION:ESTADO',{valor:1});
        socket.broadcast.emit('ILUMINACION:MONITOR',{valor:1});
        socket.emit('ILUMINACION:MONITOR',{valor:1});
    });

    socket.on('ILUMINACION:APAGADO',(data)=>{
        socket.broadcast.emit('ILUMINACION:ESTADO',{valor:0});
        socket.broadcast.emit('ILUMINACION:MONITOR',{valor:0});
        socket.emit('ILUMINACION:MONITOR',{valor:0});
    });
    

    






















    //Captar la señal del detector de humo 
    socket.emit('actual',{contador2});
  
    socket.on('siguiente',(data)=>{
        contador2 = data.contador2;
        socket.broadcast.emit('siguiente',{contador2});
        socket.emit('siguiente',{contador2});
    });

    socket.on('atras',(data)=>{
        contador2 = data.contador2;
        socket.broadcast.emit('atras',{contador2});
        socket.emit('atras',{contador2});
    });
  






}






module.exports = socketControllers;