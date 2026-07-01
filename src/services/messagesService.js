import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const MESSAGES_COLLECTION = "MensajesSobrevivientes";

function getMessagesCollection() {
  return collection(db, MESSAGES_COLLECTION);
}

export function subscribeToMessages({ onMessages, onError }) {
  const messagesQuery = query(getMessagesCollection(), orderBy("fecha", "asc"));

  return onSnapshot(
    messagesQuery,
    { includeMetadataChanges: true },
    (snapshot) => {
      onMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          isPending: doc.metadata.hasPendingWrites,
          ...doc.data(),
        })),
      );
    },
    onError,
  );
}

export async function sendMessage({ profile, text }) {
  const payload = {
    autor: profile.name,
    ubicacion: profile.place,
    mensaje: text,
    fecha: serverTimestamp(),
  };

  console.log("Enviando mensaje a Firestore:", {
    collection: MESSAGES_COLLECTION,
    payload,
  });

  const docRef = await addDoc(getMessagesCollection(), payload);
  console.log("Mensaje guardado en Firestore:", docRef.id);

  return docRef;
}

export async function sendSystemMessage(text) {
    return addDoc(getMessagesCollection(), {
        autor: "SISTEMA",
        ubicacion: "Centro de Operaciones",
        mensaje: text,
        tipo: "SISTEMA",
        fecha: serverTimestamp(),
    });
}
