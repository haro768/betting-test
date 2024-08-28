"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = void 0;
const express_validator_1 = require("express-validator");
exports.validateUserLogin = [
    (0, express_validator_1.check)('email').isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.check)('password').isLength({ min: 6, max: 60 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
