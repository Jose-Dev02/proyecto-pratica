import { Schema, model } from 'mongoose';

const DepartamentoSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    id_dependency: {
        type: Schema.ObjectId,
        ref: "Dependency"
    }

})

module.exports = model("Departamento", DepartamentoSchema);