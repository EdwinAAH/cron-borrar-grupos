
import admin from "firebase-admin";
import fs from "fs";

// Cargar credenciales
const serviceAccount = JSON.parse(fs.readFileSync("./firebase-credentials.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function borrarGrupos() {
  try {
    const usersSnapshot = await db.collection("users").get();

    const batch = db.batch();

    usersSnapshot.forEach((doc) => {
      batch.update(doc.ref, { group: null });
    });

    await batch.commit();
    console.log("Grupos borrados exitosamente.");
  } catch (error) {
    console.error("Error al borrar grupos:", error);
  }
}

borrarGrupos();
