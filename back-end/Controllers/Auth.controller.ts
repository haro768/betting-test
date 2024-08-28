import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../Entites/User.entity";
import { encrypt } from "../Helpers/Encrypt";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(500)
                    .json({ message: " email and password required" });
            }

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { email } });

            const isPasswordValid = user ? encrypt.comparepassword(user.password, password) : false;
            if (!user || !isPasswordValid) {
                return res.status(404).json({ message: 'Please check your credentials and try again.' });
            }
            const token = encrypt.generateToken({ id: user.id });

            return res.status(200).json({ message: "Login successful", user, token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getProfile(req: Request, res: Response) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: req["currentUser"].id },
        });
        return res.status(200).json({ ...user, password: undefined });
    }
}