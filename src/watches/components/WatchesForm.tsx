import { useState } from "react";

import type WatchFormProps from "../types/WatchFormProps";

function ClockForm({ onCreate }: WatchFormProps) {
    const [name, setName] = useState("");
    const [offset, setOffset] = useState<string>(""); // храним как строку, чтобы легко очищать

    const handleCreate = () => {
        const trimmedName = name.trim() || "Unnamed";
        const parsedOffset = parseInt(offset) || 0;

        onCreate(trimmedName, parsedOffset);

        setName("");
        setOffset("");
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Смещение в часах"
                value={offset}
                onChange={(e) => setOffset(e.target.value)}
            />

            <button onClick={handleCreate}>Создать</button>
        </div>
    );
}

export default ClockForm;
