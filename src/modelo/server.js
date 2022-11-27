const express = require('express');
const cors = require('cors');
const socketControllers = require('./socket/controllers');


class Server{
    



    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = require('http').createServer(this.app); 
        this.io = require('socket.io')(this.server,{
            cors: {
                origin:"*",
                methods: ["GET", "POST","UPDATE","DELETE"]
            }
        });

        this.middlewares();
        this.socket();


    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }


    listen(){
        this.server.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto",this.port);
        });
    }
    
    socket(){
        this.io.on('connection',socketControllers); 
    }
    

   

}

module.exports = Server;