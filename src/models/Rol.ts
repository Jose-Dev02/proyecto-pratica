import { Schema, model } from 'mongoose';

const RolSchema = new Schema({
    name: {
        type: String,
        require: true
    }, 
})

module.exports = model("Rol", RolSchema);