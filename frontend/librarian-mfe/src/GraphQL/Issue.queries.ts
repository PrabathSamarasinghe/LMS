const ISSUE_BOOK = `
mutation Mutation($issueBookInput: IssueBookInput!) {
  IssueABook(issueBookInput: $issueBookInput)
}`;

const GET_TOTAL_FINES = `
query Query($memberId: String!) {
  GetTotalFinesByMemberId(memberId: $memberId)
}`;

const GET_BOOK_COUNT = `
query Query($memberId: String!) {
  GetAllBookCountByMemberId(memberId: $memberId)
}`;

const GET_ALL_ISSUED_BOOKS = `
query GetAllIssuedBooks {
  GetAllIssuedBooks {
    id
    isbn
    memberId
    borrowDate
    returnDate
    returnedDate
    status
    fine {
      amount
      paid
    }
  }
}`;

const ACCEPT_RETURN_BOOK = `
mutation ReturnABook($returnBookInput: ReturnBookInput!) {
  ReturnABook(returnBookInput: $returnBookInput)
}`;

const GET_ISBN_BY_ID = `
query Query($getBookIsbnByIdId: Int!) {
  GetBookIsbnById(id: $getBookIsbnByIdId)
}`;

const APPROVE_RENEWAL_REQUEST = `
mutation Mutation($requestId: Int!, $isApproved: Boolean!) {
  ApproveRenewRequest(requestId: $requestId, isApproved: $isApproved)
}`;

const GET_ALL_RENEWAL_REQUESTS = `
query GetAllRenewRequests {
  GetAllRenewRequests {
    id
    borrowRecordId
    createdAt
    reason
    isApproved
    isProcessed
    requestedDays
    borrowRecord {
      isbn
      memberId
      borrowDate
      returnDate
    }
  }
}`;

const PAY_FINE = `
mutation Mutation($borrowRecordId: Int!) {
  PayFine(borrowRecordId: $borrowRecordId)
}`;


export default {
  ISSUE_BOOK,
  GET_TOTAL_FINES,
  GET_BOOK_COUNT,
  GET_ALL_ISSUED_BOOKS,
  ACCEPT_RETURN_BOOK,
  GET_ISBN_BY_ID,
  APPROVE_RENEWAL_REQUEST,
  GET_ALL_RENEWAL_REQUESTS,
  PAY_FINE,
};
