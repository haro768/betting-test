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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const data_source_1 = require("../data-source");
const Event_entity_1 = require("../Entites/Event.entity");
const UserBet_entity_1 = require("../Entites/UserBet.entity");
const User_entity_1 = require("../Entites/User.entity");
class EventsController {
    static getEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRepository = data_source_1.AppDataSource.getRepository(Event_entity_1.Event);
            return res.status(200).json({ data: yield eventRepository.find() });
        });
    }
    static getUserEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEventRepository = data_source_1.AppDataSource.getRepository(UserBet_entity_1.UserBet);
            res.status(200).json({
                data: yield userEventRepository.find({
                    where: { user: { id: req["currentUser"].id } },
                    order: {
                        id: 'DESC',
                    },
                    relations: ['event'],
                })
            });
        });
    }
    static createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { event_id, betAmount } = req.body;
            const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
            const eventRepository = data_source_1.AppDataSource.getRepository(Event_entity_1.Event);
            const userEventRepository = data_source_1.AppDataSource.getRepository(UserBet_entity_1.UserBet);
            const user = yield userRepository.findOne({
                where: { id: req["currentUser"].id },
            });
            const event = yield eventRepository.findOne({
                where: { event_id },
            });
            if (!user || !event) {
                return res.status(400).json({ message: 'Event not found!' });
            }
            const userBet = new UserBet_entity_1.UserBet();
            userBet.user = user;
            userBet.event = event;
            userBet.betAmount = betAmount;
            yield userEventRepository.save(userBet);
            return res.status(200).json({ data: userBet });
        });
    }
}
exports.EventsController = EventsController;
