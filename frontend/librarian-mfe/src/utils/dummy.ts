const chartDummies = {
    issuedBooksTrend: [
    { week: "Week 1", issued: 45, returned: 38 },
    { week: "Week 2", issued: 52, returned: 41 },
    { week: "Week 3", issued: 48, returned: 45 },
    { week: "Week 4", issued: 61, returned: 52 },
  ],
  mostBorrowedBooks: [
    { name: "Harry Potter", borrows: 28 },
    { name: "The Hobbit", borrows: 24 },
    { name: "1984", borrows: 21 },
    { name: "The Great Gatsby", borrows: 19 },
    { name: "To Kill a Mockingbird", borrows: 17 },
  ],
  genrePopularity: [
    { name: "Fantasy", value: 35, color: "#8B5CF6" },
    { name: "Classic Fiction", value: 25, color: "#3B82F6" },
    { name: "Dystopian", value: 18, color: "#EF4444" },
    { name: "Romance", value: 15, color: "#EC4899" },
    { name: "Adventure", value: 7, color: "#F59E0B" },
  ],
  monthlyNewMembers: [
    { month: "Jan", members: 12 },
    { month: "Feb", members: 18 },
    { month: "Mar", members: 15 },
    { month: "Apr", members: 22 },
    { month: "May", members: 25 },
    { month: "Jun", members: 20 },
  ]
}

const pendingActionsDummy = {
    newMemberVerifications: 2,
    booksReservedForPickup: 1,
    pendingBookRequests: 5,
    finePaymentsDue: 4,
}

const actions  = [
    { label: "Add New Book", color: "bg-black hover:bg-gray-800" , url: "/manage-books"},
    { label: "Register Member", color: "bg-black hover:bg-gray-800" , url: "/manage-members"},
    { label: "Issue Book", color: "bg-gray-800 hover:bg-black", url: "/issued-books" },
    { label: "Return Book", color: "bg-black hover:bg-gray-800", url: "/issued-books" },
    { label: "Handle Renewals", color: "bg-gray-800 hover:bg-black", url: "/issued-books" },
    { label: "Manage Books", color: "bg-black hover:bg-gray-800", url: "/manage-books" },
    { label: "Manage Members", color: "bg-gray-800 hover:bg-black", url: "/manage-members" },
    { label: "View Reports", color: "bg-black hover:bg-gray-800" },
  ];

const fines = {
    perDayFine: 50,
    fairConditionFine: 500,
    poorConditionFine: 1000
}

export { 
    chartDummies, 
    pendingActionsDummy,
    actions,
    fines 
};