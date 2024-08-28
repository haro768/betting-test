import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Event} from "../Entites/Event.entity";
import {UserBet} from "../Entites/UserBet.entity";
import {User} from "../Entites/User.entity";

export class EventsController {
    static async getEvents(req: Request, res: Response) {
        const eventRepository = AppDataSource.getRepository(Event);

        return res.status(200).json({data: await eventRepository.find()});
    }

    static async getUserEvents(req: Request, res: Response) {
        const userEventRepository = AppDataSource.getRepository(UserBet);

        res.status(200).json({
            data: await userEventRepository.find({
                where: {user: {id: req["currentUser"].id}},
                order: {
                    id: 'DESC',
                },
                relations: ['event'],
            })
        });
    }

    static async createEvent(req: Request, res: Response) {
        const { event_id, betAmount } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const eventRepository = AppDataSource.getRepository(Event);
        const userEventRepository = AppDataSource.getRepository(UserBet);

        const user = await userRepository.findOne({
            where: { id: req["currentUser"].id },
        });

        const event = await eventRepository.findOne({
            where: { event_id },
        });

        if (!user || !event) {
            return res.status(400).json({message: 'Event not found!'});
        }

        const userBet = new UserBet();

        userBet.user = user;
        userBet.event = event;
        userBet.betAmount = betAmount;

        await userEventRepository.save(userBet);

        return res.status(200).json({data: userBet});
    }
}