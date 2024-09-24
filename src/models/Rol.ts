import { Schema, model } from "mongoose";

const RolSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

export default model("Rol", RolSchema);
