import { openDB } from 'idb';

const initdb = async () =>
  openDB('data', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('data')) {
        console.log('data database already exists');
        return;
      }
      db.createObjectStore('data', { keyPath: 'id', autoIncrement: true });
      console.log('data database created');
    },
  });



export const putDb = async (content) => {
  console.log('PUT to the database');
  const todosDb = await openDB('data', 1);
  const tx = todosDb.transaction('data', 'readwrite');
  const store = tx.objectStore('data');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};


export const getDb = async () => {
  console.log('GET all from the database');
  const todosDb = await openDB('data', 1);
  const tx = todosDb.transaction('data', 'readonly');
  const store = tx.objectStore('data');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  result
  ? console.log('🚀 - data has been got', result.value)
  : console.log('🚀 - data not found');
  return result?.value
};

initdb();
