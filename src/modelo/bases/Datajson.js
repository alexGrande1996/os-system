const fs = require('fs');

class Datajson{
    

    constructor(){
        this.path = "./src/data/data.json"
        this.datos;
    }


    leerBaseDatos(){
        if(! fs.existsSync(this.path)) return;

        const info = fs.readFileSync(this.path,{encoding: 'utf-8'});
        const data = JSON.parse(info);

        return data;   
    }

    guardarDatos(valor){
        if((valor == null) || (valor == 0) )return;

        const data = {
            TEMPERATURA: valor
        }
        fs.writeFileSync(this.path,JSON.stringify(data));
    }

}

module.exports = Datajson;