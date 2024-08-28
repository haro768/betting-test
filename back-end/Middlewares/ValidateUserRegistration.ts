import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import {AppDataSource} from "../data-source";
import {User} from "../Entites/User.entity";

const checkUserExistsByEmail = async (email: string): Promise<User | null> => {
    const userRepository = AppDataSource.getRepository(User);

    return await userRepository.findOne({
        where: { email },
    });
};

export const validateUserRegistration = [
    check('name').isString().withMessage('Name must be a string'),
    check('email')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email: string) => {
            const emailExists = await checkUserExistsByEmail(email);
            if (emailExists) {
                throw new Error('Email already in use');
            }
        }),
    check('password').isLength({ min: 6, max: 60 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0]?.msg });
        }
        next();
    }
];