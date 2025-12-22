// Librarian Dashboard Queries

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

const GET_ALL_MEMBERS = `
  query GetAllUsers($type: String!) {
    GetAllUsers(type: $type) {
      id
      email
      fullname
      phone
      status
      membershipDate
    }
  }
`;

const GET_ALL_ISSUED_BOOKS = `
  query GetAllIssuedBooks {
    GetAllIssuedBooks {
      id
      memberId
      isbn
      borrowDate
      returnDate
      status
      returnedDate
    }
  }
`;

const GET_ALL_RENEW_REQUESTS = `
  query GetAllRenewRequests {
    GetAllRenewRequests {
      id
      borrowRecordId
      requestedDays
      reason
      isApproved
      isProcessed
      createdAt
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
      daysOverdue
      status
    }
  }
`;

const GET_BORROWED_RECORD_BY_ID = `
  query GetBorrowedRecordById($id: Int!) {
    GetBorrowedRecordById(id: $id) {
      id
      memberId
      isbn
      borrowDate
      returnDate
      status
      isReturned
    }
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
        id
        name
      }
      available
    }
  }
`;

const GET_MEMBER_DETAILS = `
  query GetUserById($userId: String!) {
    GetUserById(userId: $userId) {
      id
      email
      fullname
      phone
      address
      status
    }
}`;

const GET_ALL_FINES = `
query GetAllFines {
  GetAllFines {
    id
    amount
    paid
    updatedAt
  }
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

export default {
  GET_ALL_BOOKS,
  GET_ALL_MEMBERS,
  GET_ALL_ISSUED_BOOKS,
  GET_ALL_RENEW_REQUESTS,
  GET_OVERDUE_BOOKS,
  GET_BORROWED_RECORD_BY_ID,
  GET_BOOK_DETAILS,
  GET_MEMBER_DETAILS,
  GET_ALL_FINES,
  GET_REQUESTED_BOOKS,
};
