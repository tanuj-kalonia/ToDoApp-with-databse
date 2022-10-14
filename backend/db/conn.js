import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" })
const DB = process.env.DATABASE;

mongoose.connect(DB)
    .then(res => console.log("connection successfull"))
    .catch(err => console.log(err))
