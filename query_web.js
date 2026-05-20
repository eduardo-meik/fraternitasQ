const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, orderBy, getDocs, limit } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyBlp7QPdk4shM-dTCwQQ3r6DFoYnvAkkx0',
  authDomain: 'fraternitasv2.firebaseapp.com',
  projectId: 'fraternitasv2',
  storageBucket: 'fraternitasv2.firebasestorage.app',
  messagingSenderId: '232482492510',
  appId: '1:232482492510:web:d778cccb738aa573d424cf',
  measurementId: 'G-Y7MFP4LXL6'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  try {
    const q = query(
      collection(db, 'respuestas_fraternidad'),
      where('submission_timestamp', '>', '2026-05-15T23:59:59Z'),
      orderBy('submission_timestamp', 'desc'),
      limit(5)
    );

    const querySnapshot = await getDocs(q);
    console.log('COUNT:' + querySnapshot.size);
    querySnapshot.forEach(doc => {
      console.log('TIMESTAMP:' + doc.data().submission_timestamp);
    });
  } catch (error) {
    console.error('ERROR:' + error.message);
    process.exit(1);
  }
}

run();
