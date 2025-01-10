
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userawailable = await User.findOne({ email });
    if (userawailable) {
        res.status(400);
        throw new Error("user aldready exist");
    }
    //hasspassword
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log("hassed passowrd ", hashedpassword);
    const user = await User.create({
        username,
        email,
        password: hashedpassword,
    });
    console.log(`User Created,${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("user data is not valid ");
    }
    res.json({ message: "Register the user" });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All feilds are mandatory ");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {   
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRATE,
            { expiresIn: "15m" });
        res.status(200).json({ accessToken })
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = { registerUser, loginUser, currentUser }