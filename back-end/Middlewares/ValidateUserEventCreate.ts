import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const ValidateUserEventCreate = [
    check('event_id').isNumeric().withMessage('Event id must be numeric'),
    check('betAmount').isNumeric().withMessage('Bet amount must be numeric'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];