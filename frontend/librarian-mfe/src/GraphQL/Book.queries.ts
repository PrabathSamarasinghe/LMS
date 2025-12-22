const GET_ALL_BOOKS = `
  query GetAllBooks {
    GetAllBooks {
      isbn
      title
      Genre
      publisher
      publishedYear
      language
      shelfLocation
      available
      author {
        id
        name
      }
    }
  }
`;

const GET_ALL_GENRES = `
  query GetAllBooks {
    GetAllBooks{
      Genre
    }
  }
`;

const ADD_NEW_BOOK = `
  mutation AddBook($book: BookInput!) {
    AddBook(book: $book)
  }
`;

const GET_ALL_AUTHORS = `
  query GetAuthors {
    GetAuthors {
      id
      name
    }
  }`;

const UPDATE_BOOK = `
mutation UpdateBook($isbn: String!, $book: BookInput!) {
  UpdateBook(isbn: $isbn, book: $book)
}`;

const DELETE_BOOK = `
  mutation UpdateBook($isbn: String!) {
    DeleteBook(isbn: $isbn)
}`;

const ADD_AUTHOR = `
mutation UpdateBook($name: String!) {
  AddAuthor(name: $name)
}`;

const CHANGE_BOOK_AVAILABILITY = `
mutation UpdateBook( $isbn: String!) {
  ChangeAvailabilityStatus(isbn: $isbn)
}`;

const GET_REQUESTED_BOOKS = `
query GetRequestedBooks {
  GetRequestedBooks {
    id
    title
    author
    reason
    memberId
    isProcessed
    isApproved
    createdAt
  }
}`;

const PROCESS_BOOK_REQUEST = `
mutation Mutation($requestId: Int!, $isApproved: Boolean!) {
  ApproveBookRequest(requestId: $requestId, isApproved: $isApproved)
}`;

const GET_BOOK_TITLE_BY_ISBN = `
query GetBookByISBN($isbn: String!) {
  GetBookByISBN(isbn: $isbn) {
    title
  }
}`;


export default {
  GET_ALL_BOOKS,
  GET_ALL_GENRES,
  ADD_NEW_BOOK,
  GET_ALL_AUTHORS,
  UPDATE_BOOK,
  DELETE_BOOK,
  ADD_AUTHOR,
  CHANGE_BOOK_AVAILABILITY,
  GET_REQUESTED_BOOKS,
  PROCESS_BOOK_REQUEST,
  GET_BOOK_TITLE_BY_ISBN,
};
