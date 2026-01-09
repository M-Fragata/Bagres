import mongoose from "mongoose"
import { z } from 'zod'



const UserValidation = z.object({
    mail: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

const UserSchema = new mongoose.Schema({
    mail:
    {
        type: String,
        require: true
    },
    firstName:
    {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },

})

export const User = mongoose.model("User", UserSchema)