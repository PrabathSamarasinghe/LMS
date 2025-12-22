const GET_ALL_BORROWED_BOOKS = `
query GetBorrowedBooksById($memberId: String!) {
  GetBorrowedBooksById(memberId: $memberId) {
    id
    isbn
    memberId
    borrowDate
    returnDate
    status
    fine {
      amount
      paid
    }
    isRenewed
  }
}`;

const GET_ALL_RETURNED_BOOKS = `
query GetReturnedBooksById($memberId: String!) {
  GetReturnedBooksById(memberId: $memberId) {
    id
    isbn
    memberId
    borrowDate
    returnDate
    status
    fine {
      amount
      paid
    }
  }
}`;

const CREATE_RENEWAL_REQUEST = `
mutation CreateRenewRequest($borrowRecordId: Int!, $renewalRequest: RenewRequestInput!) {
  CreateRenewRequest(borrowRecordId: $borrowRecordId, renewalRequest: $renewalRequest)
}`;

export default {
    GET_ALL_BORROWED_BOOKS,
    GET_ALL_RETURNED_BOOKS,
    CREATE_RENEWAL_REQUEST,
}