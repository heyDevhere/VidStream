import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash, img: req.body.inputs?.imgUrl });
    await newUser.save();
    res.status(200).send("User has been Registered!");

  } catch (err) {
    // next(createError(402,"user already exist"));
    res.status(200).send("User already Exist!");
    console.log(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(404, "wrong credentials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    user.tokens.push({ token });

    await user.save();
    console.log(user);

    const { password, ...others } = user._doc;
    // we have a tcken and we can send it to user to do that we use cookie

    // secure !! other 2rd party will not use our cookie
    res.cookie('access_token', token, {
      expires: new Date(Date.now() + 25892000000), // Adjust expiry time as needed
      httpOnly: true,
      secure: false, // Should be false in development (localhost)
      sameSite: 'Lax' // or 'None' if dealing with cross-domain requests
    }).status(200).json(others)


  } catch (err) {
    next(createError(404, "error"));
  }
};


export const googleAuth = async (req, res, next) => {
  // if user already exit means that user has signed up and registered that means his email id is present in db
  // now that user wants to sign in using google so we check tht whether that user alraeady exist or not and if yes then we assign that already existing user a tocken 

  // if that user does not exist in the dp that means this is the new user , so we first save that user in teh db and then assign that newuser a tocken (cookie)
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      user.tokens.push({ token });

      await user.save();
      res.cookie('access_token', token, {
        expires: new Date(Date.now() + 25892000000), // Adjust expiry time as needed
        httpOnly: true,
        secure: false, // Should be false in development (localhost)
        sameSite: 'Lax' // or 'None' if dealing with cross-domain requests    
       })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      user.tokens.push({ token });

      await user.save();
      res.cookie('access_token', token, {
        expires: new Date(Date.now() + 25892000000), // Adjust expiry time as needed
        httpOnly: true,
        secure: false, // Should be false in development (localhost)
        sameSite: 'Lax' // or 'None' if dealing with cross-domain requests
      })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    console.log("err in server");
    console.log(err);
    next(err);
  }
};


