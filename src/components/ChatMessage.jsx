import { formatMessageTime } from "../utils/formatters";
import { PinIcon, UserIcon } from "./icons";

export function ChatMessage({ message }) {
    const author = message.autor || message.name;
    const place = message.ubicacion || message.place;
    const text = message.mensaje || message.text;
    const date = message.fecha || message.createdAt;

    return (
        <article
            className={`chat-message survivor ${message.isPending ? "pending" : ""}`}
        >
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
