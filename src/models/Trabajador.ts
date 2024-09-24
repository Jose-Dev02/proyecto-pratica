import { Schema, model } from 'mongoose';

const TrabajadorSchema = new Schema({

    id_Departamento: {
        type: Schema.ObjectId,
        ref: "Departamento"
    },
    id_Rol: {
        type: Schema.ObjectId,
        ref: "Rol"
    },
    id_Cargo: {
        type: Schema.ObjectId,
        ref: "Cargo"
    },
    telefono: {
        type: Number,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    id_usuario: {
        type: Schema.ObjectId,
        ref:"User"
    },

})

module.exports = model("Trabajador", TrabajadorSchema);