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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Import cors package
const ErrorHandler_1 = require("./Middlewares/ErrorHandler");
const User_routes_1 = require("./Routes/User.routes");
require("reflect-metadata");
const UserEvents_routes_1 = require("./Routes/UserEvents.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(ErrorHandler_1.ErrorHandler);
const { PORT = 3000 } = process.env;
app.use("/auth", User_routes_1.UserRouter);
app.use("/events", UserEvents_routes_1.EventsRouter);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Application home page." });
});
app.get("*", (req, res) => {
    res.status(404).json({ message: "404 Not found." });
});
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(PORT, () => {
        console.log("Server is running on http://0.0.0.0:" + PORT);
    });
    console.log("Data Source has been initialized!");
}))
    .catch((error) => console.log(error));
