import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import authenticate from "./middleware/authenticate.js"
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
const PORT = 5000;

import "./db/conn.js"
import ToDoItem from "./models/toDoSchema.js"

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
})

app.post("/register", async (req, res) => {

  const { name, email, password, cPassword } = req.body;
  console.log(req.body);

  if (!name || !email || !password || !cPassword) {
    return res.status(422).send(`Please fill all the fields`);
  }

  // check if user already exists or not
  try {
    const userEixts = await ToDoItem.findOne({ email });
    if (userEixts) {
      return res.status(422).json({ err: "User already exists" });
    }
    if (password != cPassword) {
      return res.status(422).json({ err: "Password and confirm password are not matching" });
    }
    if (password.length < 8)
      return res.status(422).json({ error: "password must be atleast 8 digits" })

    const user = new ToDoItem({ name, email, password, cPassword });
    const userRegistered = await user.save();
    if (userRegistered) {
      res.status(201).json({ success: "user registered successfully" });
    }
    else res.status(422).json({ error: "Failed to register, chech you internet connection" });

  } catch (error) {
    console.log(error);
  }

})

app.post("/login", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password)
      return res.status(400).json({ error: "fill all the details" });

    const foundUser = await ToDoItem.findOne({ email });
    if (!foundUser)
      res.status(400).json({ error: "user not found" });
    else {
      const isMatch = await bcrypt.compare(password, foundUser.password);

      token = foundUser.generateAuthToken();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true
      })

      if (!isMatch)
        return res.status(400).json({ error: "incorrect details" });
      else return res.status(200).json({ success: "Logged in successfully" })
    }

  } catch (error) {
    console.log(error);
  }
})

app.get("/home", authenticate, async (req, res) => {

  const rootUser = req.rootUser;
  const { toDoList } = req.body
  // const { task, category } = toDoList[0];

  // console.log(rootUser.email);
  res.status(200).send(req.rootUser)
  // console.log(task.toDoList[0]); 

  // if (!task || !category)
  //   return res.status(422).json({ error: "task and category are mendatory" });




})

app.listen(PORT, async () => {
  console.log(`server is up at port ${PORT}`);
})

