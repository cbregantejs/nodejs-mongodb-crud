import User from "../models/user";
import jwt from "jsonwebtoken";

export const singUp = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const newUser = User({
            username,
            email,
            password: await User.encryptPassword(password)
        });
        const savedUser = await newUser.save();
        console.log(savedUser)
        const SECRET = process.env.SECRET;
        const token = jwt.sign({ id: savedUser._id }, SECRET, {
            expiresIn: 86400, // 24 hours
        });
        res.status(200).json({ token });
    } catch  (error) {
        res.render('error', {messasge: error.message})
    }
}

export const singIn = async (req, res) => {
    try {
       // Request body email can be an email or username
        const userFound = await User.findOne({ email: req.body.email });
  
        if (!userFound) return res.status(400).json({ message: "User Not Found" });
        
        console.log(userFound)
        console.log(req.body.password)
        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );
        console.log(matchPassword)
  
        if (!matchPassword){
            return res.status(401).json({
                token: null,
                message: "Invalid Password",
            });
        }           
        
        const SECRET = process.env.SECRET;
        const token = jwt.sign({ id: userFound._id }, SECRET, {
            expiresIn: 86400, // 24 hours
        });
    
        res.json({ token });
    } catch (error) {
        console.log({ error });
        return res.render("error", { errorMessage: error.message });
    }
}