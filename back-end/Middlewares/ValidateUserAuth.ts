import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateUserLogin = [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6, max: 60 }).withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];