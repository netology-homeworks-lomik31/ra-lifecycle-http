import type CardType from "./types/Cards";
import { useEffect, useState } from "react";

function Crud() {
    const [cards, setCards] = useState<CardType[]>([]);
    const [newCardContent, setNewCardContent] = useState("");

    const fetchCards = async () => {
        try {
            const data = await request("http://localhost:7070/notes");
            setCards(data);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    const deleteCard = async (id: number) => {
        try {
            await request(`http://localhost:7070/notes/${id}`, "DELETE");
            await fetchCards();
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };
    const createCard = async () => {
        if (!newCardContent.trim()) return;

        try {
            await request("http://localhost:7070/notes", "POST", {
                id: 0,
                content: newCardContent.trim(),
            });
            setNewCardContent("");
            await fetchCards();
        } catch (error) {
            console.error("Error creating card:", error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <div className="crud">
            <button onClick={fetchCards}>update</button>
            <ul className="cards">
                {cards.map(card => (
                    <li key={card.id}>
                        <div className="card">
                            <button
                                className="delete-button"
                                onClick={() => deleteCard(card.id)}
                            >
                                X
                            </button>
                            <p className="card-text">{card.content}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <textarea
                className="newCard"
                value={newCardContent}
                onChange={(e) => setNewCardContent(e.target.value)}
            />

            <button className="createButton" onClick={createCard}>
                Create
            </button>
        </div>
    );
}

async function request(url: string, method = "GET", data: object | null = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: data ? JSON.stringify(data) : undefined
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    try {
        return await response.json();
    } catch {
        return null;
    }
}

export default Crud;
