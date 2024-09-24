import { Schema, model } from 'mongoose';

const MaquinaSchema = new Schema({
    id_Departamento: {
        type: Schema.ObjectId,
        ref:"Departamento"
    },
    name: {
        type: String,
        require: true
    }, 
    direccion_ip: {
        type: String,
        require: true
    },
    direccion_mac: {
        type: String,
        require: true
    },

})

export default  model("Maquina", MaquinaSchema);