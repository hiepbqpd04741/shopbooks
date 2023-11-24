const Order = require("../../models/order");
const Product = require("../../models/product");
const Users = require("../../models/user");
exports.getAdmin = async (req, res) => {
  function formatNumber(num) {
    if (num == null) {
      return "0";
    }
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const totalProduct = await Product.count({});
  const totalUsers = await Users.count({});
  const totalOrder = await Order.count({});
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalPrice: { $sum: "$totalPrice" },
      },
    },
  ]);

  const totalPrice = result[0].totalPrice;

  return res.render("admin/index", {
    totalProduct: formatNumber(totalProduct),
    totalUsers: formatNumber(totalUsers),
    totalPrice: formatNumber(totalPrice),
    totalOrder: formatNumber(totalOrder),
  });
};
// list Users

exports.getListUser = (req, res) => {
  Users.find({})
    .then((users) => {
      res.render("admin/ListUsers", { listUsers: users });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateUser = (req, res, next) => {
  let userId = req.params.id;
  let level = req.body.level;
  Users.findById(userId)
    .then((huyit) => {
      huyit.level = level;
      return huyit.save();
    })
    .then((result) => {
      res.status(200).json({
        status: "1",
        message: "Cập Nhật Thành Viên Thành Công",
        category: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
// list order
exports.getListOrder = (req, res) => {
  Order.find({})
    .then((order) => {
      res.render("admin/ListOrder", { orders: order });
      console.log(order);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDetailOrder = (req, res, next) => {
  const codeOrder = req.params.codeOrder;
  Order.findOne({ codeOrder: codeOrder })
    .then((huydev) => {
      res.render("admin/DetailOrder", { detailOrders: huydev });
      console.log(huydev);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateOrder = (req, res, next) => {
  const idOrder = req.params.id;
  Order.findById(idOrder)
    .then((huyit) => {
      huyit.status = "Delivering";
      return huyit.save();
    })
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Giao Hàng Thành Công",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
