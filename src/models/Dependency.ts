import { Schema, model } from "mongoose";

const DependencySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  direccion: {
    type: String,
    require: true,
  },
  telefono: {
    type: String,
    require: true,
  },
});

export default model("Dependency", DependencySchema);
