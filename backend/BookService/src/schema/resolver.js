// Import the Prisma client to interact with the database
const prisma = require("../prisma");

// Define Query resolvers
const Query = {
  // Fetch all books along with their authors
  GetAllBooks: async () => {
    return await prisma.Book.findMany({
      include: { author: true },
    });
  },

  // Fetch a book by its ISBN along with its author
  GetBookByISBN: async (_, { isbn }) => {
    return await prisma.Book.findUnique({
      where: { isbn },
      include: { author: true },
    });
  },

  // Fetch books by a specific author using their authorId
  GetBooksByAuthor: async (_, { authorId }) => {
    return await prisma.Book.findMany({
      where: { authorId },
      include: { author: true },
    });
  },

  // Fetch books whose titles contain the given string
  GetBooksByTitle: async (_, { title }) => {
    return await prisma.Book.findMany({
      where: {
        title: { contains: title },
      },
      include: { author: true },
    });
  },

  // Fetch books by their genre
  GetBooksByGenre: async (_, { Genre }) => {
    return await prisma.Book.findMany({
      where: { Genre },
      include: { author: true },
    });
  },

  // Check if a book is available by its ISBN
  CheckAvailability: async (_, { isbn }) => {
    const book = await prisma.Book.findUnique({
      where: { isbn },
    });
    return book ? book.available : false;
  },

  // Fetch all authors
  GetAuthors: async () => {
    return await prisma.Author.findMany();
  },

  // Fetch all requested books
  GetRequestedBooks: async () => {
    return await prisma.RequestNewBook.findMany();
  },
};

// Define Mutation resolvers
const Mutation = {
  // Add a new book to the database
  AddBook: async (_, { book }) => {
    await prisma.Book.create({
      data: book,
    });
    console.log(book);
    
    return "Book added successfully";
  },

  // Update an existing book's details using its ISBN
  UpdateBook: async (_, { isbn, book }) => {
    await prisma.Book.update({
      where: { isbn },
      data: book,
    });
    return "Book updated successfully";
  },

  // Delete a book from the database using its ISBN
  DeleteBook: async (_, { isbn }) => {
    await prisma.Book.delete({
      where: { isbn },
    });
    return "Book deleted successfully";
  },

  // Add a new author to the database
  AddAuthor: async (_, { name }) => {
    const author = await prisma.Author.create({
      data: { name },
    });
    return author.id;
  },

  // Submit a request for a new book
  RequestNewBook: async (_, { request }) => {
    await prisma.RequestNewBook.create({
      data: request,
    });
    return "Book request submitted successfully";
  },

  // Approve or reject a book request
  ApproveBookRequest: async (_, { requestId, isApproved }) => {
    await prisma.RequestNewBook.update({
      where: { id: requestId },
      data: { isProcessed: true, isApproved: isApproved },
    });
    return "Book request approved successfully";
  },

  // Toggle the availability status of a book using its ISBN
  ChangeAvailabilityStatus: async (_, { isbn }) => {
    const book = await prisma.Book.findUnique({
      where: { isbn },
    });
    if (!book) {
      throw new Error("Book not found");
    }
    await prisma.Book.update({
      where: { isbn },
      data: { available: !book.available },
    });
    return "Book availability status changed successfully";
  },
};

// Export the Query and Mutation resolvers
module.exports = {
  Query,
  Mutation,
};