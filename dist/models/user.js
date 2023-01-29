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
exports.User = void 0;
var database_provider_1 = __importDefault(require("../database_provider"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var pepper = process.env.BCRYPT_PASSWORD;
var saltRounds = process.env.SALT_ROUNDS;
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query1, con, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        query1 = 'SELECT * FROM users';
                        return [4 /*yield*/, database_provider_1["default"].connect()];
                    case 1:
                        con = _a.sent();
                        return [4 /*yield*/, con.query(query1)];
                    case 2:
                        result = _a.sent();
                        con.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error('Could not load users from database: ${err}');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query2, con, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        query2 = 'SELECT * FROM users WHERE id=($1)';
                        return [4 /*yield*/, database_provider_1["default"].connect()];
                    case 1:
                        con = _a.sent();
                        return [4 /*yield*/, con.query(query2, [id])];
                    case 2:
                        result = _a.sent();
                        con.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error('Could not load user from database: ${err}');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.create = function (newuser) {
        return __awaiter(this, void 0, void 0, function () {
            var query3, con, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        newuser.password = bcrypt_1["default"].hashSync(newuser.password + pepper, Number(saltRounds));
                        query3 = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, database_provider_1["default"].connect()];
                    case 1:
                        con = _a.sent();
                        return [4 /*yield*/, con.query(query3, [
                                newuser.firstname,
                                newuser.lastname,
                                newuser.password,
                            ])];
                    case 2:
                        result = _a.sent();
                        con.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error('Could not add new user to database: ${err}');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.update_user = function (id, newuser) {
        return __awaiter(this, void 0, void 0, function () {
            var query, query4, con, result1, result2, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        query = 'SELECT * FROM users WHERE id=($1)';
                        query4 = 'UPDATE users SET firstname=($1), lastname=($2), password=($3) WHERE id=($4) RETURNING *';
                        return [4 /*yield*/, database_provider_1["default"].connect()];
                    case 1:
                        con = _a.sent();
                        return [4 /*yield*/, con.query(query, [id])];
                    case 2:
                        result1 = _a.sent();
                        if (result1.rows.length === 0) {
                            con.release();
                            return [2 /*return*/, 'User does not exist'];
                        }
                        newuser.password = bcrypt_1["default"].hashSync(newuser.password + pepper, Number(saltRounds));
                        return [4 /*yield*/, con.query(query4, [
                                newuser.firstname,
                                newuser.lastname,
                                newuser.password,
                                id,
                            ])];
                    case 3:
                        result2 = _a.sent();
                        con.release();
                        return [2 /*return*/, result2.rows[0]];
                    case 4:
                        err_4 = _a.sent();
                        throw new Error('Could not update user in database: ${err}');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.delete_user = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, query5, con, result1, result2, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        query = 'SELECT * FROM users WHERE id=($1)';
                        query5 = 'DELETE FROM users WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, database_provider_1["default"].connect()];
                    case 1:
                        con = _a.sent();
                        return [4 /*yield*/, con.query(query, [id])];
                    case 2:
                        result1 = _a.sent();
                        if (result1.rows.length === 0) {
                            con.release();
                            return [2 /*return*/, 'User does not exist'];
                        }
                        return [4 /*yield*/, con.query(query5, [id])];
                    case 3:
                        result2 = _a.sent();
                        con.release();
                        return [2 /*return*/, result2.rows[0]];
                    case 4:
                        err_5 = _a.sent();
                        throw new Error('Could not delete user from database: ${err}');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.User = User;
