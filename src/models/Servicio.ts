import { Schema, model } from "mongoose";

const ServicioSchema = new Schema({
  id_Trabajador: {
    type: Schema.ObjectId,
    ref: "Trabajador",
  },
  id_Maquina: {
    type: Schema.ObjectId,
    ref: "Maquina",
  },
  horario: {
    type: String,
    require: true,
  },
  cesn: {
    type: Boolean,
    default: false,
  },
  cesi: {
    type: Boolean,
    default: false,
  },
  chat_nacional: {
    type: Boolean,
    default: false,
  },
  chat_internacional: {
    type: Boolean,
    default: false,
  },
  internet_nacional: {
    type: Boolean,
    default: false,
  },
  internet: {
    type: Boolean,
    default: false,
  },
  cesn_pcc: {
    type: Boolean,
    default: false,
  },
  cesi_pcc: {
    type: Boolean,
    default: false,
  },
  chat_nacional_pcc: {
    type: Boolean,
    default: false,
  },
  chat_internacional_pcc: {
    type: Boolean,
    default: false,
  },
  internet_nacional_pcc: {
    type: Boolean,
    default: false,
  },
  internet_pcc: {
    type: Boolean,
    default: false,
  },
  asbse: {
    type: String,
  },
  assm: {
    type: String,
  },
  fecha_alta: {
    type: Date,
    default: Date.now(),
  },
  fecha_baja: {
    type: Date,
  },
});

export default model("Servicio", ServicioSchema);
