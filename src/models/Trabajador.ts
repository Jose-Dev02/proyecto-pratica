import { Schema, model } from "mongoose";

const TrabajadorSchema = new Schema({
  id_Departamento: {
    type: Schema.ObjectId,
    ref: "Departamento",
  },
  id_Rol: {
    type: Schema.ObjectId,
    ref: "Rol",
  },
  id_Cargo: {
    type: Schema.ObjectId,
    ref: "Cargo",
  },
  id_usuario: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

export default model("Trabajador", TrabajadorSchema);
