const Admin = require("../model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
  async checkStatus(req, res) {
    try {
      // check if any admin available;
      const admin = await Admin.find({});

      if (admin.length === 0) {
        // there is no admin
        return res.json({
          success: false,
          status: "no_admin",
        });
      }

      // verify the token
      const token = req.cookies?.admin_token;
      if (!token) {
        return res.json({
          success: false,
          status: "logged_out",
        });
      }
      return res.json({
        success: true,
        status: "logged_in",
      });
    } catch (error) {
      console.log(error);
    }
  },

  async register(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(403).json({
          success: false,
          message: "Email and Password both required!",
        });
      }
      // check if admin already exists
      const admins = await Admin.find({});
      if (admins.length > 0) {
        return res.status(403).json({
          success: false,
          message: "You cannot create admin!",
        });
      }

      // create admin
      const hashedPassword = await bcrypt.hash(password, 12);
      const admin = new Admin({ email, password: hashedPassword });
      await admin.save();
      res.json({
        success: true,
        message: "Admin created successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(403).json({
          success: false,
          message: "Email and Password both required!",
        });
      }

      // check if admin already exists
      const [admin] = await Admin.find({ email });

      if (admin.length === 0) {
        return res.status(403).json({
          success: false,
          message: "Invalid Credentials!",
        });
      }

      // check password
      const isPasswordMatched = await bcrypt.compare(password, admin.password);
      if (isPasswordMatched) {
        const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET);
        console.log(token);
        res.cookie("admin_token", token, {
          maxAge: 31536000000,
        });
        res.send({
          success: true,
          message: "You have successfully logged in!",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Invalid Credentials!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  },
};

module.exports = authController;
