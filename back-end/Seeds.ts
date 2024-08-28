// Sample events
import {AppDataSource} from "./data-source";
import {Event} from "./Entites/Event.entity";

const events = [
    { event_name: 'Soccer: Team A vs. Team B', odds: 1.75 },
    { event_name: 'Basketball: Team X vs. Team Y', odds: 2.10 },
    { event_name: 'Tennis: Player 1 vs. Player 2', odds: 1.90 },
    { event_name: 'Baseball: Team M vs. Team N', odds: 3.00 },
    { event_name: 'Football: Team C vs. Team D', odds: 1.50 },
];

const RunEventsSeed = async () => {
    AppDataSource.initialize()
        .then(async () => {
            for (const eventItem of events) {
                const event = new Event();

                event.event_name = eventItem.event_name;
                event.odds = eventItem.odds;

                const eventRepository = AppDataSource.getRepository(Event);
                await eventRepository.save(event);
            }
        })
        .catch((error) => console.log(error));
};

RunEventsSeed().then(() => {
    console.log("Successfully seeded!");
}).catch(e => {
    console.log(e);
});