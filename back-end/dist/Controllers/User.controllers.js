"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const User_entity_1 = require("../Entites/User.entity");
const Encrypt_1 = require("../Helpers/Encrypt");
const cache = __importStar(require("memory-cache"));
class UserController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = req.body;
            const encryptedPassword = yield Encrypt_1.encrypt.encryptpass(password);
            const user = new User_entity_1.User();
            user.name = name;
            user.email = email;
            user.password = encryptedPassword;
            user.role = role;
            const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
            yield userRepository.save(user);
            // userRepository.create({ Name, email, password });
            const token = Encrypt_1.encrypt.generateToken({ id: user.id });
            return res
                .status(200)
                .json({ message: "User created successfully", token, user });
        });
    }
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = cache.get("data");
            if (data) {
                console.log("serving from cache");
                return res.status(200).json({
                    data,
                });
            }
            else {
                console.log("serving from db");
                const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
                const users = yield userRepository.find();
                cache.put("data", users, 6000);
                return res.status(200).json({
                    data: users,
                });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email } = req.body;
            const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
            const user = yield userRepository.findOne({
                where: { id },
            });
            if (user) {
                user.name = name;
                user.email = email;
                yield userRepository.save(user);
            }
            res.status(200).json({ message: "udpdate", user });
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
            const user = yield userRepository.findOne({
                where: { id },
            });
            if (user) {
                yield userRepository.remove(user);
            }
            res.status(200).json({ message: "ok" });
        });
    }
}
exports.UserController = UserController;
