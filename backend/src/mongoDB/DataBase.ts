import mongoose from "mongoose";

export const DataBase =  ( async () => {
    const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://Fragata:m4th3us1@cluster0.bdixruu.mongodb.net/?appName=Cluster0";
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.log("Erro ao conectar ao MongoDB:", error);
    }
})