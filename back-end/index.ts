import { AppDataSource } from "./data-source";
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'; // Import cors package
import { Request, Response } from "express";
import { ErrorHandler } from "./Middlewares/ErrorHandler"
import { UserRouter } from "./Routes/User.routes";
import "reflect-metadata";
import { EventsRouter } from "./Routes/UserEvents.routes";

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            currentUser?: any;
        }
    }
}

const app = express();


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions))

app.use(express.json());
app.use(ErrorHandler);

const { PORT = 3000 } = process.env;

app.use("/auth", UserRouter);
app.use("/events", EventsRouter);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Application home page." });
});

app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "404 Not found." });
});

AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log("Server is running on http://0.0.0.0:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));
