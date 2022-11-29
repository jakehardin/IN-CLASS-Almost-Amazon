// for merged promises
// import client from '../utils/client';
import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';
// const endpoint = client.databaseURL;

const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
  // GET AUTHOR
  // Create an object that has book data and an object named authorObject
});

const getAuthorDetails = async (firebaseKey) => {
  const authorObject = await getSingleAuthor(firebaseKey);
  const booksArray = await getAuthorBooks(firebaseKey);
  return { ...authorObject, booksArray };
};

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getBookDetails, deleteAuthorBooksRelationship, getAuthorDetails };
