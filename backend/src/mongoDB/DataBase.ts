import mongoose from "mongoose"

export const DataBase =  ( async () => {
    const MONGO_URL = process.env.MONGO_URL

    if(!MONGO_URL){
        console.log("Erro ao conectar ao MongoDB: URL")
        return
    }

    try {
        await mongoose.connect(MONGO_URL)
        console.log("Conectado ao MongoDB")
    } catch (error) {
        console.log("Erro ao conectar ao MongoDB:", error)
    }
})