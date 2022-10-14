import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
    },
    cPassword: {
        type: String,
        required: true,
    },
    toDoList: [
        {
            task: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

listSchema.pre("save", async function (next) {
    console.log("Hello from the middleware");
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.cPassword = await bcrypt.hash(this.cPassword, 10);
    }
    next();
})

listSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const ToDoList = mongoose.model("ToDoList", listSchema)
export default ToDoList;