// Admin Dashboard Queries

const GET_ALL_BOOKS = `
  query GetAllBooks {
    GetAllBooks {
      isbn
      title
      Genre
      available
    }
  }
`;

const GET_ALL_MEMBERS = `
  query GetAllUsers($type: String!) {
    GetAllUsers(type: $type) {
      id
      email
      fullname
      status
      membershipDate
    }
  }
`;

const GET_ALL_LIBRARIANS = `
  query GetAllUsers($type: String!) {
    GetAllUsers(type: $type) {
      id
      email
      fullname
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
      returnedDate
      status
    }
  }
`;

const GET_ALL_RENEW_REQUESTS = `
  query GetAllRenewRequests {
    GetAllRenewRequests {
      id
      borrowRecordId
      requestedDays
      isApproved
      isProcessed
      createdAt
    }
  }
`;

const GET_ACTIVITY_LOG = `
  query GetAllIssuedBooks {
    GetAllIssuedBooks {
      id
      memberId
      isbn
      borrowDate
      returnDate
      status
    }
  }
`;

const GET_BOOKS_BY_GENRE = `
  query GetBooksByGenre($Genre: String!) {
    GetBooksByGenre(Genre: $Genre) {
      isbn
      title
      Genre
    }
  }
`;

const GET_ALL_BOOK_REQUESTS = `
query GetRequestedBooks {
  GetRequestedBooks {
    title
    author
    memberId
  }
}`;

const GET_FINE_COLLECTION_STATS = `
query GetFineCollectionStats {
  GetFineCollectionStats {
    today
    thisWeek
    thisMonth
  }
}`;

const GET_ALL_UNPAID_FINES = `
query GetAllFines {
  GetAllFines {
    id
    amount
    paid
    updatedAt
  }
}`;

export default {
  GET_ALL_BOOKS,
  GET_ALL_MEMBERS,
  GET_ALL_LIBRARIANS,
  GET_ALL_ISSUED_BOOKS,
  GET_ALL_RENEW_REQUESTS,
  GET_ACTIVITY_LOG,
  GET_BOOKS_BY_GENRE,
  GET_ALL_BOOK_REQUESTS,
  GET_FINE_COLLECTION_STATS,
  GET_ALL_UNPAID_FINES,
};
