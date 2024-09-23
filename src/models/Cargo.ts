import { Schema, model } from 'mongoose';

const CargoSchema = new Schema({
    name: {
        type: String,
        require: true
    },   
})

export default model("Cargo", CargoSchema);