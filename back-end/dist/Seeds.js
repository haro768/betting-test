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
// Sample events
const data_source_1 = require("./data-source");
const Event_entity_1 = require("./Entites/Event.entity");
const events = [
    { event_name: 'Soccer: Team A vs. Team B', odds: 1.75 },
    { event_name: 'Basketball: Team X vs. Team Y', odds: 2.10 },
    { event_name: 'Tennis: Player 1 vs. Player 2', odds: 1.90 },
    { event_name: 'Baseball: Team M vs. Team N', odds: 3.00 },
    { event_name: 'Football: Team C vs. Team D', odds: 1.50 },
];
const RunEventsSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    data_source_1.AppDataSource.initialize()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        for (const eventItem of events) {
            const event = new Event_entity_1.Event();
            event.event_name = eventItem.event_name;
            event.odds = eventItem.odds;
            const eventRepository = data_source_1.AppDataSource.getRepository(Event_entity_1.Event);
            yield eventRepository.save(event);
        }
    }))
        .catch((error) => console.log(error));
});
RunEventsSeed().then(() => {
    console.log("Successfully seeded!");
}).catch(e => {
    console.log(e);
});
