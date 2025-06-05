import type CardType from "./types/Cards";
import { useEffect, useState, useRef } from "react";

function Crud() {
    const [cards, setCards] = useState<CardType[]>([]);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const deleteCard = (id: number) => {
        request(`http://localhost:7070/notes/${id}`, "DELETE").then(() => {
            request("http://localhost:7070/notes").then(data => {
                setCards(data);
            }).catch(error => {
                console.error("Error fetching cards:", error);
            });
        }).catch(error => {
            console.error("Error deleting card:", error);
        })
    }
    const createCard = () => {
        request("http://localhost:7070/notes", "POST", {
            id: 0,
            content: inputRef.current?.value || ""
        }).then(() => {
            request("http://localhost:7070/notes").then(data => {
                setCards(data);
            }).catch(error => {
                console.error("Error fetching cards:", error);
            });
        }).catch(error => {
            console.error("Error creating card:", error);
        });
        inputRef.current!.value = "";
    }
    const updateCards = () => {
        request("http://localhost:7070/notes").then(data => {
            setCards(data);
        }).catch(error => {
            console.error("Error fetching cards:", error);
        });
    }
    useEffect(() => {
        request("http://localhost:7070/notes").then(data => {
            setCards(data);
        }).catch(error => {
            console.error("Error fetching cards:", error);
        });
    }, []);

    return (
        <div className="crud">
            <button onClick={() => updateCards()}>update</button>
            <ul className="cards">
                {cards.map(card => (
                    <li key={card.id}>
                        <div className="card">
                            <button className="delete-button" onClick={() => deleteCard(card.id)}>X</button>
                            <p className="card-text">{card.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <textarea className="newCard" ref={inputRef}></textarea>
            <button className="createButton" onClick={() => createCard()}>
                Create
            </button>
        </div>
    )
}

async function request(url: string, method = "GET", data: object | null = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: data ? JSON.stringify(data) : undefined
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        let res;
        try {
            res = await response.json();
        } catch {
            res = null;
        }
        return res;
    } catch (error) {
        console.error("Request error:", error);
        throw error;
    }
}

export default Crud;
