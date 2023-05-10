const user = require("../../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password, mobile, addresses } = req.body;
      if (!(name && email && password && mobile)) {
        return res.status(401).send("all inputs are required");
      }
      const userEmail = await user.findOne({
        where: {
          email,
        },
      });
      if (userEmail) {
        return res.send({
          message: "ALready Registered with this email in Our Database",
        });
      }

      const hasedPassword = await bcrypt.hash(password, 10);
      const verifyPass = await bcrypt.compare(password, hasedPassword);
      console.log(hasedPassword);

      const createUser = await user.create({
        name,
        email: email.toLowerCase(),
        password: hasedPassword,
        mobile,
        addresses,
      });
      console.log(createUser);
      //   message

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER ,
          pass: process.env.PASS_KEY 
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USER ,
        to: createUser.email,
        subject: "Registration",
        html: `
              <h1>thank for Registrasion us</h1>
              <p><span><b>Name : </b></span> ${createUser.name}</p>
              <br/>
              <p><span><b>your address : </b></sapn> ${createUser.addresses}
              <br/>
              <p><span><b>your email : </b></sapn> ${createUser.email}
              <br/>
              <p><span><b>your password : </b></sapn> ${createUser.password}
              </br>
              <p><span><b>your mobile no. : </b></sapn> ${createUser.mobile}
              `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send("There was an error sending the email");
        } else {
          console.log("Email sent: " + info.response);
          res.status(202).json({ msg: "successfull", data: createUser });
        }
      });
    } catch (error) {
      return res
        .status(403)
        .json({ msg: "failed", errorMessage: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email, password)) {
        return res.status(404).send("all input required");
      }

      const userEmail = await user.findOne({ where: { email } });
      console.log(userEmail, "user");
      if (!userEmail) {
        return res.status(404).send("you are not registered ");
      }
      //   console.log("pre");
      const verifyPass = await bcrypt.compare(password, userEmail.password);
      console.log(verifyPass);
      if (!verifyPass) {
        return res.status(406).send("you password is wrong");
      }
      const token = jwt.sign({ userEmail }, "ambuj1264", { expiresIn: "24h" });
      res
        .status(202)
        .json({ message: "Login Success", result: userEmail, token: token });
    } catch (error) {
      console.log(error);
      res.status(402).json({ error: error.message });
    }
  },
  reset: async (req, res) => {
    // Generate a password reset token
    // console.log("hello");
    const userEmail = await user.findOne({ where: { email: req.body.email } });

    if (!userEmail) {
      return res.status(404).send("you are not registered ");
    }
    const token = jwt.sign({ email: req.body.email }, "ambuj1264", {
      expiresIn: "23h",
    });

    // Send email with password reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pratik1264675@gmail.com",
        pass: "ijsawgdnwvgknpib",
      },
    });
    const mailOptions = {
      from: '"pratik1264675@email.com"',
      to: userEmail.email,
      subject: "Password Reset",
      text: `Please follow this link to reset your password: http:/localhost/reset/${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("There was an error sending the email");
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(202)
          .json("Please check your email for a password reset link");
      }
    });
  },
  resetandverify: async (req, res) => {
    // Verify the password reset token
    const token = req.params.token;
    // console.log(token, "token");
    const password = req.body.password;
    const hasedPassword = await bcrypt.hash(password, 10);
    // console.log(hasedPassword);
    // const verifyPass = await bcrypt.compare(password, hasedPassword);
    // console.log(verifyPass);
    jwt.verify(token, "ambuj1264", async (err, decoded) => {
      if (err) {
        return res.send("Invalid or expired token");
      }
      const userUpdated = await user.update(
        { password: hasedPassword,
         },
        {
          where: { email: decoded.email },
        }
      );
      console.log(decoded.email);
    });
    // const updateData= await User.findOne({email:decoded.email})
  },
};

module.exports = userController;
