import { formatMessageTime } from "../utils/formatters";
import { PinIcon, UserIcon } from "./icons";
import "../App.css";

export function ChatMessage({ message }) {
    const author = message.autor || message.name;
    const place = message.ubicacion || message.place;
    const text = message.mensaje || message.text;
    const date = message.fecha || message.createdAt;
    const isSystem = ["CENTRAL", "SISTEMA"].includes(author);

    return (
        

        <article
            className={`chat-message survivor ${message.isPending ? "pending" : ""}`}
        >
            {isSystem && (
                <div className="system-banner">
                    📡 TRANSMISIÓN DEL SISTEMA
                </div>
            )}

            <div className="message-meta">
                <span>
                    <UserIcon />
                    {author}
                </span>
                <span>
                    <PinIcon />
                    {place}
                </span>
            </div>
            <p>{text}</p>
            <time>
                {message.isPending ? "Enviando..." : formatMessageTime(date)}
            </time>
        </article>
    );
}
