const SearchBookColDefs = [
  { headerName: "ISBN", field: "isbn", width: 150 },
  { headerName: "Title", field: "title", width: 250 },
  { headerName: "Author", field: "author", width: 130 },
  { headerName: "Category", field: "category", width: 135 },
  { headerName: "Publisher", field: "publisher", width: 135 },
  { headerName: "Year", field: "publishedYear", width: 70 },
  { headerName: "Language", field: "language", width: 120 },
  { headerName: "Shelf Location", field: "shelfLocation", width: 140 },
  {
    headerName: "Available",
    field: "available",
    width: 100,
    cellRenderer: (params: any) => (
      <span style={{ color: params.value ? "green" : "red" }}>
        {params.value ? "Yes" : "No"}
      </span>
    ),
  },
];

const ReturnedBookscolDefs = [
  {
    headerName: "ISBN",
    field: "isbn",
    width: 120,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Title",
    field: "title",
    flex: 1,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Borrowed Date",
    field: "borrowDate",
    width: 140,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Returned Date",
    field: "returnDate",
    width: 140,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Late Days",
    field: "lateDays",
    width: 120,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Fine (LKR)",
    field: "fine.amount",
    width: 130,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Status",
    field: "status",
    width: 110,
    sortable: true,
    filter: true,
  },
];

export { SearchBookColDefs, ReturnedBookscolDefs };
