import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    apellido_1ro: {
        type: String,
        require: true
    }, 
    apellido_2do: {
        type: String,
        require: true
    },
    CI: {
        type: Number,
        require: true
    },

})

export default  model("User", UserSchema);