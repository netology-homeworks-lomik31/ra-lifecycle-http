import type WatchElementProps from "../types/WatchElementProps";

function ClockElement({ name, offset, currentUTC, onDelete }: WatchElementProps) {
    const localTime = new Date(currentUTC.getTime() + offset * 3600 * 1000);

    return (
        <div>
            <button onClick={onDelete}>×</button>
            <div>{localTime.toISOString().substr(11, 8)}</div>
            <div>{name}</div>
        </div>
    );
};

export default ClockElement;
