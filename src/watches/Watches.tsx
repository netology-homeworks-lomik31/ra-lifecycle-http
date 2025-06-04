import { useState, useEffect } from 'react';
import Watch from './components/Watch';
import WatchesFrom from './components/WatchesForm';

import type Clock from './types/Clock';

function Watches() {
    const [clocks, setClocks] = useState<Clock[]>([]);
    const [currentUTC, setCurrentUTC] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentUTC((new Date())), 1000);
        return () => clearInterval(timer);
    }, []);

    const addClock = (name: string, offset: number) => {
        setClocks([...clocks, { id: Date.now(), name, offset }]);
    };

    const removeClock = (id: number) => {
        setClocks(clocks.filter(clock => clock.id !== id));
    };

    return (
        <div>
            <WatchesFrom onCreate={addClock} />
            {clocks.map(clock => (
                <Watch
                key={clock.id}
                name={clock.name}
                offset={clock.offset}
                currentUTC={currentUTC}
                onDelete={() => removeClock(clock.id)}
                />
            ))}
        </div>
    );
};

export default Watches;
