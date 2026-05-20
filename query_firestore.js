const admin = require('firebase-admin');

// Inicializar la app usando las credenciales predeterminadas (requiere login o GOOGLE_APPLICATION_CREDENTIALS)
// Sin embargo, para un script local rápido tras 'firebase login', usaremos una aproximación directa 
// si es posible, o simplemente reportaremos si necesitamos credenciales.
// Dado que 'firebase firestore:indexes' funcionó, el CLI tiene acceso.
// Intentaremos usar firebase-admin con el id del proyecto.

admin.initializeApp({
  projectId: 'fraternitasv2'
});

const db = admin.firestore();

async function run() {
  try {
    const querySnapshot = await db.collection('respuestas_fraternidad')
      .where('submission_timestamp', '>', '2026-05-15T23:59:59Z')
      .orderBy('submission_timestamp', 'desc')
      .get();

    console.log('COUNT:' + querySnapshot.size);
    const docs = querySnapshot.docs.slice(0, 5);
    docs.forEach(doc => {
      console.log('TIMESTAMP:' + doc.data().submission_timestamp);
    });
  } catch (error) {
    console.error('ERROR:' + error.message);
    process.exit(1);
  }
}

run();
