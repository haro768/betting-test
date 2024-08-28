"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserEventCreate = void 0;
const express_validator_1 = require("express-validator");
exports.ValidateUserEventCreate = [
    (0, express_validator_1.check)('event_id').isNumeric().withMessage('Event id must be numeric'),
    (0, express_validator_1.check)('betAmount').isNumeric().withMessage('Bet amount must be numeric'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
