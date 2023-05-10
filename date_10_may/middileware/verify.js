const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.headers.authkey;
  // console.log(token);
  if (token) {
    //token=token.split(" ")[1];
    // console.log("middelware called", token);
    const tokenVerify = jwt.verify(token, "ambuj1264", (err, valid) => {
      if (err) {
        res.staus(401).send({ result: "No token is provided" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ result: "plz add token in header" });
  }
};
module.exports = verify;
