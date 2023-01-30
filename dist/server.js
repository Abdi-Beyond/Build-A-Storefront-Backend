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
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
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
console.log(process.env.ENV);
if (process.env.ENV === 'test') {
    app.listen(50005, function () {
        console.log("starting app on: 50005");
    });
}
if (process.env.ENV === 'dev') {
    app.listen(50006, function () {
        console.log("starting app on: 0.0.0.0:3000");
    });
}
exports["default"] = app;
