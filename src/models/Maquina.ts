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
        type: Number,
        require: true
    },
    direccion_mac: {
        type: String,
        require: true
    },

})

module.exports = model("Maquina", MaquinaSchema);