"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var authrize_checker_jwt_1 = require("../middleware/authrize_checker_jwt");
var products_1 = require("../models/products");
var newproduct = new products_1.Product();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, newproduct.index()];
            case 1:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, newproduct.show(Number(req.params.id))];
            case 1:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product_info, products, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                product_info = {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category
                };
                return [4 /*yield*/, newproduct.create(product_info)];
            case 1:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var delete_product = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, newproduct.delete_product(Number(req.params.id))];
            case 1:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update_product = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product_info, products, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                product_info = {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category
                };
                return [4 /*yield*/, newproduct.update_product(Number(req.params.id), product_info)];
            case 1:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var category_products = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, newproduct.category_products(req.params.category)];
            case 1:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(400).json(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var popular_products = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var popular, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, newproduct.popular_products()];
            case 1:
                popular = _a.sent();
                res.json(popular);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(400).json(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var productRouter = function (app) {
    app.get('/products', index),
        app.get('/products/:id', show),
        app.post('/products/', authrize_checker_jwt_1.authorizeChecker, create),
        app["delete"]('/products/:id', authrize_checker_jwt_1.authorizeChecker, delete_product),
        app.patch('/products/:id', authrize_checker_jwt_1.authorizeChecker, update_product),
        app.get('/products/category/:category', category_products),
        app.get('/products/popular/', popular_products);
};
exports["default"] = productRouter;
