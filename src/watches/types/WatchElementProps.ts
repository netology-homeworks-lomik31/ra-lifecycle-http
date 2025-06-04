export default interface WatchElementProps {
    name: string;
    offset: number;
    currentUTC: Date;
    onDelete: () => void;
}
