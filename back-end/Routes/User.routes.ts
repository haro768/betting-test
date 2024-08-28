import * as express from "express";
import { Authentication } from "../Middlewares/Authentication";
import { Authorization } from "../Middlewares/Authorization";
import { AuthController } from "../Controllers/Auth.controller";
import { UserController } from "../Controllers/User.controllers";
import { validateUserRegistration } from "../Middlewares/ValidateUserRegistration";
import { validateUserLogin } from "../Middlewares/ValidateUserAuth";

const Router = express.Router();

Router.post("/signup", validateUserRegistration, UserController.signup);
Router.post("/signin", validateUserLogin, AuthController.login);

Router.put(
    "/update/:id",
    Authentication,
    Authorization(["user", "admin"]),
    UserController.updateUser
);

Router.delete(
    "/delete/:id",
    Authentication,
    Authorization(["admin"]),
    UserController.deleteUser
);

Router.get(
    "/users",
    Authentication,
    Authorization(["admin"]),
    UserController.getUsers
);
Router.get(
    "/profile",
    Authentication,
    Authorization(["user", "admin"]),
    AuthController.getProfile
);
export { Router as UserRouter };