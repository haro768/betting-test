import * as express from "express";
import { Authentication } from "../Middlewares/Authentication";
import { Authorization } from "../Middlewares/Authorization";
import { EventsController } from "../Controllers/Events.controller";
import {ValidateUserEventCreate} from "../Middlewares/ValidateUserEventCreate";

const Router = express.Router();

Router.get(
    "/",
    Authentication,
    Authorization(["user", "admin"]),
    EventsController.getEvents
);

Router.post(
    "/",
    ValidateUserEventCreate,
    Authentication,
    Authorization(["user", "admin"]),
    EventsController.createEvent
);

Router.get(
    "/me",
    Authentication,
    Authorization(["user", "admin"]),
    EventsController.getUserEvents
);

export { Router as EventsRouter };