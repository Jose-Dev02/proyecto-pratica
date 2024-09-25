import mongoose from "mongoose";

const finder_service = async (table: mongoose.Model<any>, find: String) => {
  try {
    const response = await table
      .find({
        $or: [
          { name: { $regex: find, $options: "i" } },
          { telefono: { $regex: find, $options: "i" } },
          { direccion: { $regex: find, $options: "i" } },
          { CI: { $regex: find, $options: "i" } },
          { apellido_1ro: { $regex: find, $options: "i" } },
          { apellido_2do: { $regex: find, $options: "i" } },
          { direccion_ip: { $regex: find, $options: "i" } },
        ],
      })
      .sort();
    if (response.length <= 0) throw new Error("Any data were found!!");

    return { count: response.length, data: response };
  } catch (Error: any) {
    return Error.message;
  }
};

export default finder_service;
