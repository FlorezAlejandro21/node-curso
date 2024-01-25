import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos online conectada");
  } catch (error) {
    console.error(error);
    throw new Error("Error al inicializar DB");
  }
};

export { dbConnection };
