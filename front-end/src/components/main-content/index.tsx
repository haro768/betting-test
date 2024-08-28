import React, { useEffect } from 'react';
import { fetchNewEvents } from "../../redux/slices/apiCalls/getEvents";
import { useAppDispatch } from "../../redux/hooks";
import { EventData } from "../../types";
import { useSelector } from 'react-redux';
import { fetchPrevEvents } from "../../redux/slices/apiCalls/getPrevEvents";
import { RootState } from "../../redux/store";
import { setEvents, setPrevEvents } from '../../redux/slices/global';

interface MainProps {
    openModal: (item: { name: string; text: string; odds: string, event_id: number}) => void;
}

const Main: React.FC<MainProps> = ({ openModal }) => {
    const data = useSelector((state: RootState) => state.user.events);
    const prevEvents = useSelector((state: RootState) => state.user.prevEvents);
    const dispatch = useAppDispatch();

    const handleFetchEvents = async () => {
        try {
            const response: EventData[] = await dispatch(fetchNewEvents()).unwrap() as EventData[];
            dispatch(setEvents(response));
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    const prevEventsFetch = async () => {
        try {
            const response = await dispatch(fetchPrevEvents()).unwrap() as EventData[];
            dispatch(setPrevEvents(response));
        } catch (error) {
            console.error('Failed to fetch previous events:', error);
        }
    };

    useEffect(() => {
        handleFetchEvents();
        prevEventsFetch();
    }, [dispatch]);

    return (
        <main className="-mt-24 pb-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="sr-only">Page title</h1>
                <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                        <section aria-labelledby="bets-title">
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <h2 className="text-lg text-custom-navy font-bold ml-6 mt-2" id="bets-title">Bets</h2>
                                <div className="p-6">
                                    <ul className="space-y-4">
                                        {data.map((item,index) => (
                                            <li key={index}
                                                className="flex items-center justify-between p-4 border-b border-gray-200">
                                                <span className="text-custom-navy flex-1">{item.event_name}</span>
                                                <span
                                                    className="text-custom-navy ml-4 flex-shrink-0">odds: {item.odds}</span>
                                                <button onClick={() => openModal({ name: item.event_name, text: '', odds: item.odds, event_id: item.event_id })}
                                                        className="ml-4 p-2 bg-indigo-500 text-white rounded">
                                                    Place Bet
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <section aria-labelledby="previous-bets-title">
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <h2 className="text-lg text-custom-navy font-bold ml-6 mt-2" id="previous-bets-title">
                                    Previous Bets
                                </h2>
                                <div className="p-6">
                                    {prevEvents.map(({event, betAmount}: any, index) => (
                                        <div key={index} className="mb-4">
                                            <p className="text-custom-navy text-left">
                                                <span className="font-semibold">Name:</span> {event.event_name}
                                            </p>
                                            <p className="text-custom-navy text-left">
                                                <span className="font-semibold">Odds:</span> {event.odds}
                                            </p>
                                            <p className="text-custom-navy text-left">
                                                <span className="font-semibold">Bet amount:</span> {betAmount}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;