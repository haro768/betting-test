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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserRegistration = void 0;
const express_validator_1 = require("express-validator");
const data_source_1 = require("../data-source");
const User_entity_1 = require("../Entites/User.entity");
const checkUserExistsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
    return yield userRepository.findOne({
        where: { email },
    });
});
exports.validateUserRegistration = [
    (0, express_validator_1.check)('name').isString().withMessage('Name must be a string'),
    (0, express_validator_1.check)('email')
        .isEmail().withMessage('Invalid email format')
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const emailExists = yield checkUserExistsByEmail(email);
        if (emailExists) {
            throw new Error('Email already in use');
        }
    })),
    (0, express_validator_1.check)('password').isLength({ min: 6, max: 60 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        var _a;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: (_a = errors.array()[0]) === null || _a === void 0 ? void 0 : _a.msg });
        }
        next();
    }
];
