"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_handler_1 = __importDefault(require("./handlers/user_handler"));
var product_handler_1 = __importDefault(require("./handlers/product_handler"));
var order_handler_1 = __importDefault(require("./handlers/order_handler"));
var product_in_order_1 = __importDefault(require("./handlers/product_in_order"));
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.get("/", function (_req, res) {
    res.send("Hello World");
});
(0, user_handler_1["default"])(app);
(0, product_handler_1["default"])(app);
(0, order_handler_1["default"])(app);
(0, product_handler_1["default"])(app);
(0, product_in_order_1["default"])(app);
if (process.env.NODE_ENV === 'test') {
    app.listen(3000, function () {
        console.log("starting app on: 50005");
    });
}
else {
    app.listen(50000, function () {
        console.log("starting app on: 0.0.0.0:3000");
    });
}
exports["default"] = app;
