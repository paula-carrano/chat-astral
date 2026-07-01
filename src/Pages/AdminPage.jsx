import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AdminComposer } from "../components/AdminComposer";
import { sendSystemMessage } from "../services/messagesService";

export function AdminPage() {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (!message.trim() || isSending) {
            return;
        }

        setIsSending(true);
        setStatus("");
        setError("");

        try {
            await sendSystemMessage(message);

            setMessage("");
            setStatus("Evento enviado.");
        } catch (e) {
            setError("No se pudo enviar el evento.");
        } finally {
            setIsSending(false);
        }
    }

    return (
        <main className="screen">
            <h1>Panel del Operador</h1>

            <AdminComposer
                message={message}
                onMessageChange={setMessage}
                onSubmit={handleSubmit}
                isSending={isSending}
            />

            {status && <p>{status}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}