import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // validation
    if (!name) {
      return res.send({
        message: "Name is required...",
      });
    }
    if (!email) {
      return res.send({
        message: "Email is required...",
      });
    }
    if (!password) {
      return res.send({
        message: "Password is required...",
      });
    }
    if (!phone) {
      return res.send({
        message: "Phone number is required...",
      });
    }
    if (!address) {
      return res.send({
        message: "Address is required...",
      });
    }
    if (!answer) {
      return res.send({
        message: "Code word is required...",
      });
    }

    // check user
    const existingUser = await userModel.findOne({
      email,
    });

    // check existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered. Please Log In...",
      });
    }

    // register new user
    const hashedPassword = await hashPassword(password);

    // save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registered successfully...",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// POST Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      res.status(404).send({
        success: false,
        message: "Invalid email or password...",
      });
    }

    // check user
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered...",
      });
    }
    // compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password is invalid...",
      });
    }
    // token
    const token = await JWT.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      success: true,
      message: "Login successfully...",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while Log in...",
      error,
    });
  }
};

// forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    // validation
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required..." });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required..." });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New password is required..." });
    }

    // check email and answer
    const user = await userModel.findOne({ email, answer });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Something went wrong ☹...",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findById(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password is reset successfully 🙂...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong ☹...",
      error,
    });
  }
};

// update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // password
    if (password && password.length < 8) {
      return res.json({
        error: "Password is required and should be atleast 8 characters long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile is updated successfully 🙂...",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating profile ☹...",
      error,
    });
  }
};

// user orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyers: req.user._id })
      .populate("products", "-photo")
      .populate("buyers", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching orders ☹...",
      error,
    });
  }
};
