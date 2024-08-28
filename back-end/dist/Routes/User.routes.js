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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express = __importStar(require("express"));
const Authentication_1 = require("../Middlewares/Authentication");
const Authorization_1 = require("../Middlewares/Authorization");
const Auth_controller_1 = require("../Controllers/Auth.controller");
const User_controllers_1 = require("../Controllers/User.controllers");
const ValidateUserRegistration_1 = require("../Middlewares/ValidateUserRegistration");
const ValidateUserAuth_1 = require("../Middlewares/ValidateUserAuth");
const Router = express.Router();
exports.UserRouter = Router;
Router.post("/signup", ValidateUserRegistration_1.validateUserRegistration, User_controllers_1.UserController.signup);
Router.post("/signin", ValidateUserAuth_1.validateUserLogin, Auth_controller_1.AuthController.login);
Router.put("/update/:id", Authentication_1.Authentication, (0, Authorization_1.Authorization)(["user", "admin"]), User_controllers_1.UserController.updateUser);
Router.delete("/delete/:id", Authentication_1.Authentication, (0, Authorization_1.Authorization)(["admin"]), User_controllers_1.UserController.deleteUser);
Router.get("/users", Authentication_1.Authentication, (0, Authorization_1.Authorization)(["admin"]), User_controllers_1.UserController.getUsers);
Router.get("/profile", Authentication_1.Authentication, (0, Authorization_1.Authorization)(["user", "admin"]), Auth_controller_1.AuthController.getProfile);
