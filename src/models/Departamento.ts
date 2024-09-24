import { Schema, model } from "mongoose";

const DepartamentoSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  id_dependency: {
    type: Schema.ObjectId,
    ref: "Dependency",
    require: true,
  },
});

export default model("Departamento", DepartamentoSchema);
