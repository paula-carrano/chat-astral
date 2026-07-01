import { useState } from "react";
import { AdminComposer } from "../components/AdminComposer";
import { sendSystemMessage } from "../services/messagesService";

export function AdminPage() {
    const [question, setQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (
            !question.trim() ||
            !optionA.trim() ||
            !optionB.trim() ||
            !optionC.trim() ||
            isSending
        ) {
            return;
        }

        setIsSending(true);
        setStatus("");
        setError("");

        const message = `🗳️ VOTACIÓN

${question}

A) ${optionA}
B) ${optionB}
C) ${optionC}

Respondan escribiendo únicamente A, B o C.`;

        try {
            await sendSystemMessage(message);

            setQuestion("");
            setOptionA("");
            setOptionB("");
            setOptionC("");
            setStatus("Votación publicada.");
        } catch (e) {
            setError("No se pudo publicar la votación.");
        } finally {
            setIsSending(false);
        }
    }

    return (
        <main className="screen">
            <h1>Panel del Operador</h1>

            <AdminComposer
                question={question}
                optionA={optionA}
                optionB={optionB}
                optionC={optionC}
                onQuestionChange={setQuestion}
                onOptionAChange={setOptionA}
                onOptionBChange={setOptionB}
                onOptionCChange={setOptionC}
                onSubmit={handleSubmit}
                isSending={isSending}
            />

            {status && <p>{status}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}