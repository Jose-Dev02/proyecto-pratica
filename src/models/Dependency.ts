import { Schema, model } from 'mongoose';

const DependencySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    }, 
    telefono: {
        type: Number,
        require: true
    }

})

module.exports = model("Dependency", DependencySchema);