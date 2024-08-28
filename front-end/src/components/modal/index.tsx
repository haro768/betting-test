import ReactDOM from 'react-dom';
import {postEventData} from "../../redux/slices/apiCalls/placeBet";
import {useState} from "react";
import {useAppDispatch} from "../../redux/hooks";
import {setPrevEvents} from "../../redux/slices/global";
import {fetchPrevEvents} from "../../redux/slices/apiCalls/getPrevEvents";
import {EventData} from "../../types";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    event_id?: number,
    odds?: number,
    betAmount?:number
}

const Modal = ({ isOpen, onClose, event_id, odds }: ModalProps) => {
    if (!isOpen) return null;

    const [betAmount, setBetAmount] = useState<number>(0);
    const dispatch = useAppDispatch();


    const postEvents = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await dispatch(postEventData({event_id, betAmount })).unwrap();
            const response = await dispatch(fetchPrevEvents()).unwrap() as EventData[];
            dispatch(setPrevEvents(response));
            onClose()
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-custom-navy dark:border-gray-700 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Place your bet
                    </h1>
                    <form className="space-y-4 md:space-y-6">
                        <div>
                            <p>
                                Betting odds {odds}
                            </p>
                        </div>
                        <div>
                            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Amount
                            </label>
                            <input
                                type="number"
                                name="amount"
                                id="amount"
                                onChange={(e)=>setBetAmount(Number(e.target.value))}
                                placeholder="Enter amount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-700 dark:focus:bg-indigo-800"
                            onClick={postEvents}
                        >
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;