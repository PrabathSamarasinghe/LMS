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
        name
      }
    }
  }
`;

const GET_TITLE_BY_ISBN = `
query GetBookByISBN($isbn: String!) {
  GetBookByISBN(isbn: $isbn) {
    title
  }
}`;

const REQUEST_NEW_BOOK = `
mutation UpdateBook($request: RequestNewBookInput!) {
  RequestNewBook(request: $request)
}`;

export default {
  GET_ALL_BOOKS,
  GET_TITLE_BY_ISBN,
  REQUEST_NEW_BOOK,
};
