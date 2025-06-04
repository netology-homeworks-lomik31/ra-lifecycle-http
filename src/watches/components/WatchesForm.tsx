import { useRef } from 'react';

import type WatchFormProps from '../types/WatchFormProps';

function ClockForm({ onCreate }: WatchFormProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const offsetRef = useRef<HTMLInputElement>(null);

    const handleCreate = () => {
        const name = nameRef.current?.value || 'Unnamed';
        const offset = parseFloat(offsetRef.current?.value || '0');

        onCreate(name, offset);
    };

    return (
        <div>
        <input ref={nameRef} type="text" placeholder="Название" />
        <input ref={offsetRef} type="number" placeholder="Смещение в часах" />
        <button onClick={handleCreate}>Создать</button>
        </div>
    );
};

export default ClockForm;
