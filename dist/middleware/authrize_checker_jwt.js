"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authorizeChecker = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authorizeChecker = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            var token = authorizationHeader.split(' ')[1];
            var secret = process.env.TOKEN_SECRET;
            jsonwebtoken_1["default"].verify(token, secret, function (err) {
                if (err) {
                    res.status(403).send('Incorrect Token');
                }
                else {
                    next();
                }
            });
        }
        else {
            res.status(401).send('No Token Provided');
        }
    }
    catch (err) {
        throw new Error('Authetication error: ${err}');
    }
};
exports.authorizeChecker = authorizeChecker;
