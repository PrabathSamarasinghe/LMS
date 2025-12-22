import React, { useEffect, useState } from "react";
import { Alert, DialogTitle, Dialog, DialogContent } from "@mui/material";
import { GetAllAuthors, FetchAllGenres, AddNewBook, AddAuthor } from "../../service/BookAPI";
import { AuthorDetails } from "../../utils/interfaces";

export default function AddBookDetails({
  setAddBookDetailsClicked,
  book,
}: {
  setAddBookDetailsClicked?: (value: boolean) => void;
  book?: any;
}) {

  const [authors, setAuthors] = useState<AuthorDetails[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState<string>("");

  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    publisher: "",
    language: "",
    shelfLocation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    if (name === "author") {
      setAuthorName(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if author exists in the list
      let authorId = "";
      const existingAuthor = authors.find((a) => a.name === authorName);
      
      if (existingAuthor) {
        // Author exists, use their ID
        authorId = existingAuthor.id;
      } else {
        // Author doesn't exist, add them to database
        const newAuthorResponse = await AddAuthor(authorName);        
        authorId = (newAuthorResponse).toString();
        // Update local authors list
        setAuthors((prev) => [...prev, { id: authorId, name: authorName }]);
      }

      const response = await AddNewBook({
        isbn: formData.isbn,
        title: formData.title,
        authorId: parseInt(authorId, 10),// Use the author ID here
        genre: formData.genre,
        publishedYear: parseInt(formData.publishedYear, 10),// Convert to number
        publisher: formData.publisher,
        language: formData.language,
        shelfLocation: formData.shelfLocation,
        available: true,
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setAddBookDetailsClicked && setAddBookDetailsClicked(false);
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError("Failed to add book details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const GenerateISBN = () => {
    // Generate a random 13-digit ISBN number
    const randomISBN = `9780${Math.floor(100000000 + Math.random() * 900000000).toString()}`;
    setFormData((prev) => ({
      ...prev,
      isbn: randomISBN,
    }));
  };

  const fetchAuthors = async () => {
    try {
      // Fetch authors from API
      const authors = await GetAllAuthors();
      setAuthors(authors);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchAllGenres = async () => {
    try {
      // Fetch genres from API
      const genres = await FetchAllGenres();     
      setGenres(genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchAuthors(),
          fetchAllGenres(),
          GenerateISBN()
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle className="text-base font-semibold text-gray-800">
        Edit Book Details
      </DialogTitle>
      <button
        onClick={() =>
          setAddBookDetailsClicked && setAddBookDetailsClicked(false)
        }
        className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
      >
        X
      </button>
      <DialogContent className="pt-1">
        {submitted && (
          <Alert severity="success" className="mb-6">
            Book details have been added successfully!
          </Alert>
        )}

        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-1">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                ISBN
              </label>
              <input
                type="text"
                placeholder="Book ISBN"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
                disabled
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Book title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                placeholder="Author name"
                name="author"
                value={authorName}
                onChange={handleChange}
                list="authors-list"
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <datalist id="authors-list">
                {authors.map((author) => (
                  <option key={author.id} value={author.name} />
                ))}
              </datalist>
            </div>

            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Genre
              </label>
              <input
                type="text"
                placeholder="Genre"
                name="genre"
                value={formData.genre}
                list="genres-list"
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <datalist id="genres-list">
                {genres.map((genre, index) => (
                  <option key={index} value={genre} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Published Year
              </label>
              <input
                type="number"
                placeholder="Year"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Publisher
              </label>
              <input
                type="text"
                placeholder="Publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Language
              </label>
              <input
                type="text"
                placeholder="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Shelf Location
              </label>
              <input
                type="text"
                placeholder="Shelf"
                name="shelfLocation"
                value={formData.shelfLocation}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-3 py-1.5 bg-black text-white rounded font-medium text-xs outline-none hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              "Add Book Details"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
