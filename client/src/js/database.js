import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  // logic for a method that puts content into the database
  console.log('Put to the Database');
  // establish a connection to the database and open it for read/write access 
  const contactDB = await openDB('jate',1);

  const tx = contactDB.transaction('jate','readwrite');
// create an object store in the database that we can use to put data in 
  const store = tx.objectStore('jate');
// add the data to the object store 
  const request = store.put({id:1, value:content});
// wait for the database transaction to complete
  const result = await request;
  // show a success message
  console.log('Data saved to the database',result);
};

export const getDb = async () => {
  // logic for a method that gets content from the database 
  console.log('Get from the Database');
// establish a connection to the database and open it for read only access
  const contactDB = await openDB('jate',1);

  const tx = contactDB.transaction('jate','readonly');
// create an object store in the database that we can use to get data from 
  const store = tx.objectStore('jate');
// get the data from the object store
  const request = store.getAll();
// wait for the database transaction to complete
  const result = await request;
  // show a success message  
  console.log( 'result.value' ,result);
  // return the data
  return result?.value;
};  
initdb();
