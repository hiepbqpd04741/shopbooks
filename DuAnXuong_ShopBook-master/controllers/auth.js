const User = require("../models/user");
const random = require("random-token");

exports.createUser = (req, res, next) => {
  const { fullname, password, repassword, email } = req.body;
  if (fullname == "" || password == "" || repassword == "" || email == "") {
    res.status(200).json({ status: false, message: "Không Được Để Trống" });
  } else {
    if (password !== repassword) {
      return res
        .status(200)
        .json({ status: false, message: "Mật khẩu nhập lại không khớp!" });
    } else {
      // Mã hóa mật khẩu
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Có lỗi xảy ra trong quá trình mã hóa mật khẩu",
          });
        }
        var token = random(24);
        const users = new User({
          fullname,
          password: hash,
          email,
          token: token,
        });
        users
          .save()
          .then((result) => {
            res.status(201).json({
              status: true,
              message: "Đăng Ký Thành Công",
            });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      });
    }
  }
};

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (email == "" || password == "") {
    res.status(200).json({ status: false, message: "Không Được Để Trống" });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(200).json({
            status: false,
            message: "Tài khoản không tồn tại",
          });
        }

        if (password === user.password) {
          req.session.loggedin = true;
          req.session.email = email;

          res.locals.email = email; 

          console.log(res.locals.email);
          return res.status(200).json({
            status: true,
            message: "Đăng nhập thành công",
          });
        } else {
          return res
            .status(200)
            .json({ status: false, message: "Đăng nhập thất bại" });
        }
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
};
