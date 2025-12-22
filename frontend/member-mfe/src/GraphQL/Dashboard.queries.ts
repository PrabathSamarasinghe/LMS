// Member Dashboard Queries

const GET_MEMBER_PROFILE = `
  query GetProfile($userId: String!) {
  GetProfile(userId: $userId) {
    id
    email
    fullname
    phone
    address
    membershipDate
    type
    status
  }
}
`;

const GET_BORROWED_BOOKS = `
  query GetBorrowedBooks($memberId: String!) {
  GetBorrowedBooks(memberId: $memberId) {
    id
    isbn
    memberId
    borrowDate
    returnDate
    returnedDate
    status
    isRenewed
  }
}
`;

const GET_OVERDUE_BOOKS = `
  query GetOverdueBooksById($memberId: String!) {
    GetOverdueBooksById(memberId: $memberId) {
      id
      memberId
      isbn
      borrowDate
      returnDate
      status
    }
  }
`;

const GET_RETURNED_BOOKS = `
  query GetReturnedBooksById($memberId: String!) {
    GetReturnedBooksById(memberId: $memberId) {
      id
      memberId
      isbn
      borrowDate
      returnedDate
      status
    }
  }
`;

const GET_ALL_RENEW_REQUESTS = `
  query Query($memberId: String!) {
  GetPendingRenewalRequestsCountByMemberId(memberId: $memberId)
}
`;

const GET_TOTAL_FINES = `
  query GetTotalFinesByMemberId($memberId: String!) {
    GetTotalFinesByMemberId(memberId: $memberId)
  }
`;

const GET_BOOK_DETAILS = `
  query GetBookByISBN($isbn: String!) {
    GetBookByISBN(isbn: $isbn) {
      isbn
      title
      Genre
      publisher
      publishedYear
      language
      author {
        name
      }
    }
  }
`;

const GET_ALL_BOOKS = `
  query GetAllBooks {
    GetAllBooks {
      isbn
      title
      Genre
      publisher
      author {
        name
      }
    }
  }
`;

const GET_BOOKS_BY_GENRE = `
  query GetBooksByGenre($genre: String!) {
    GetBooksByGenre(genre: $genre) {
      isbn
      title
      Genre
      publisher
      author {
        name
      }
    }
  }
`;

export default {
  GET_MEMBER_PROFILE,
  GET_BORROWED_BOOKS,
  GET_OVERDUE_BOOKS,
  GET_RETURNED_BOOKS,
  GET_ALL_RENEW_REQUESTS,
  GET_TOTAL_FINES,
  GET_BOOK_DETAILS,
  GET_ALL_BOOKS,
  GET_BOOKS_BY_GENRE,
};
