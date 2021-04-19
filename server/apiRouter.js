const apiRouter = require('express').Router();

apiRouter.use("/user", require("./user/userRouter"));
apiRouter.use("/product", require("./product/productsRouter"));
apiRouter.use("/cart", require("./cart/cartRouter"))
apiRouter.use("/admin", require("./admin/adminRouter"))
apiRouter.use("/order", require("./order/orderRouter"))

module.exports = apiRouter;