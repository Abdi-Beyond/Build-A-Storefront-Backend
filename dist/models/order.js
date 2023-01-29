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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Order = void 0;
var database_provider_1 = __importDefault(require("../database_provider"));
var Order = /** @class */ (function () {
    function Order() {
    }
    Order.prototype.current_orders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query1, con, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        query1 = 'SELECT * FROM orders WHERE status=($1)';
                        return [4 /*yield*/, database_provider_1["default"].connect()];
                    case 1:
                        con = _a.sent();
                        return [4 /*yield*/, con.query(query1, ['active'])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length === 0) {
                            con.release();
                            return [2 /*return*/, 'No active orders'];
                        }
                        con.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error('Could not load orders from database: ${err}');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.completed_orders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query2, con, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        query2 = 'SELECT * FROM orders WHERE status=($1)';
                        return [4 /*yield*/, database_provider_1["default"].connect()];
                    case 1:
                        con = _a.sent();
                        return [4 /*yield*/, con.query(query2, ['completed'])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length === 0) {
                            con.release();
                            return [2 /*return*/, 'No completed orders'];
                        }
                        con.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error('Could not load orders from database: ${err}');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.create = function (neworder) {
        return __awaiter(this, void 0, void 0, function () {
            var query, con, result1, query3, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        query = 'select * from users where id=($1)';
                        return [4 /*yield*/, database_provider_1["default"].connect()];
                    case 1:
                        con = _a.sent();
                        return [4 /*yield*/, con.query(query, [neworder.user_id])];
                    case 2:
                        result1 = _a.sent();
                        if (result1.rows.length === 0) {
                            con.release();
                            return [2 /*return*/, 'User does not exist'];
                        }
                        query3 = 'INSERT INTO orders (user_id, status)VALUES ($1, $2) RETURNING *';
                        return [4 /*yield*/, con.query(query3, [
                                neworder.user_id,
                                neworder.status,
                            ])];
                    case 3:
                        result = _a.sent();
                        con.release();
                        return [2 /*return*/, result.rows];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Could not add new order to database: ".concat(err_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.update_order = function (id, neworder) {
        return __awaiter(this, void 0, void 0, function () {
            var query, query4, con, result1, result2, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        query = 'SELECT * FROM orders WHERE id=($1)';
                        query4 = 'UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *';
                        return [4 /*yield*/, database_provider_1["default"].connect()];
                    case 1:
                        con = _a.sent();
                        return [4 /*yield*/, con.query(query, [id])];
                    case 2:
                        result1 = _a.sent();
                        if (result1.rows.length === 0) {
                            con.release();
                            return [2 /*return*/, 'Order does not exist'];
                        }
                        return [4 /*yield*/, con.query(query4, [
                                neworder.status,
                                neworder.user_id,
                                id,
                            ])];
                    case 3:
                        result2 = _a.sent();
                        con.release();
                        return [2 /*return*/, result2.rows[0]];
                    case 4:
                        err_4 = _a.sent();
                        throw new Error('Could not update order in database: ${err}');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.delete_order = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, query5, con, result1, result2, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        query = 'SELECT * FROM orders WHERE id=($1)';
                        query5 = 'DELETE FROM orders WHERE id=($1)';
                        return [4 /*yield*/, database_provider_1["default"].connect()];
                    case 1:
                        con = _a.sent();
                        return [4 /*yield*/, con.query(query, [id])];
                    case 2:
                        result1 = _a.sent();
                        if (result1.rows.length === 0) {
                            con.release();
                            return [2 /*return*/, 'Order does not exist'];
                        }
                        return [4 /*yield*/, con.query(query5, [id])];
                    case 3:
                        result2 = _a.sent();
                        con.release();
                        return [2 /*return*/, result2.rows[0]];
                    case 4:
                        err_5 = _a.sent();
                        throw new Error('Could not delete order from database: ${err}');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Order;
}());
exports.Order = Order;
