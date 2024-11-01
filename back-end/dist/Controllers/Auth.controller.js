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
exports.AuthController = void 0;
const data_source_1 = require("../data-source");
const User_entity_1 = require("../Entites/User.entity");
const Encrypt_1 = require("../Helpers/Encrypt");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res
                        .status(500)
                        .json({ message: " email and password required" });
                }
                const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
                const user = yield userRepository.findOne({ where: { email } });
                const isPasswordValid = user ? Encrypt_1.encrypt.comparepassword(user.password, password) : false;
                if (!user || !isPasswordValid) {
                    return res.status(404).json({ message: 'Please check your credentials and try again.' });
                }
                const token = Encrypt_1.encrypt.generateToken({ id: user.id });
                return res.status(200).json({ message: "Login successful", user, token });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
            const user = yield userRepository.findOne({
                where: { id: req["currentUser"].id },
            });
            return res.status(200).json(Object.assign(Object.assign({}, user), { password: undefined }));
        });
    }
}
exports.AuthController = AuthController;
