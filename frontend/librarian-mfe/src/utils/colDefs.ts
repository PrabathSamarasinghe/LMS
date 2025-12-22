  const ManageMembersColumnDefs = [
    { headerName: "Member ID", field: "id", width: 100, sortable: true, filter: true },
    { headerName: "Full Name", field: "fullname", width: 150, sortable: true, filter: true },
    { headerName: "Email", field: "email", width: 180, sortable: true, filter: true },
    { headerName: "Phone", field: "phone", width: 130, sortable: true, filter: true },
    { headerName: "Address", field: "address", width: 150, sortable: true, filter: true },
    { headerName: "Date of Birth", field: "dateOfBirth", width: 130, sortable: true, filter: true },
    { headerName: "Gender", field: "gender", width: 100, sortable: true, filter: true },
    { headerName: "NIC", field: "nic", width: 120, sortable: true, filter: true },
    {
      headerName: "Membership Date",
      field: "membershipDate",
      width: 140,
      sortable: true,
      filter: true,
    },
    { headerName: "Total Fines (Rs)", field: "totalFines", width: 130, sortable: true, filter: true },
    {
      headerName: "Books Issued",
      field: "totalBooksIssued",
      width: 120,
      sortable: true,
      filter: true,
    },
    { headerName: "Status", field: "status", width: 110, sortable: true, filter: true },
    { headerName: "Registered By", field: "registeredBy", width: 140, sortable: true, filter: true },
  ];

export { ManageMembersColumnDefs };