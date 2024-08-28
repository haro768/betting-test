import React, { useState } from 'react';
import Header from './header/index';
import Main from './main-content/index';
import Footer from './footer/index';
import Modal from './modal/index';

type BetItem = { name: string; text: string; odds: string, event_id: number };

const Dashboard = (): React.ReactElement => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [betItem, setBetItem] = useState<BetItem | null>(null);

    const openModal = (item: BetItem) => {
        setBetItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen w-screen bg-gray-100">
            <div className="min-h-full">
                <Header />
                <Main openModal={openModal} />
                <Footer />
                <Modal isOpen={isModalOpen} onClose={closeModal} event_id={betItem?.event_id} />
            </div>
        </div>
    );
};

export default Dashboard;
