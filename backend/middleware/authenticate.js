import jwt from "jsonwebtoken";
import User from "../models/toDoSchema.js"

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // console.log(`The token is : ${JSON.stringify(token)}`);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser)
            throw new Error('User not found')

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send({ err: "Unauthorized user" })
        console.log(error);
    }
}

export default authenticate;