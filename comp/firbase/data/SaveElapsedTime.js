import db from './firestoreInit';
import { doc, updateDoc } from "firebase/firestore";

export async function saveCharStatsToFirestore(docId, stats) {
    if (!docId) {
        console.error("docId ist undefined.");
        return;
    }

    try {
        const charRef = doc(db, 'Charakter', docId);

        // Statt { stats: stats } verwenden Sie die Statistiken direkt
        await updateDoc(charRef, stats);
        console.log('Charakterdaten erfolgreich aktualisiert');
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Charakterstatistiken in Firestore: ", error);
    }
}



