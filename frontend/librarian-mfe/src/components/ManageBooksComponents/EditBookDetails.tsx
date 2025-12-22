import React, { useState, useEffect } from "react";
import { Alert, DialogTitle, Dialog, DialogContent } from "@mui/material";
import { UpdateBook } from "../../service/BookAPI";

export default function EditBookDetails({
  setEditBookDetailsClicked,
  book,
}: {
  setEditBookDetailsClicked?: (value: boolean) => void;
  book?: any;
}) {
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

  // Initialize form with book data when component mounts or book changes
  useEffect(() => {
    if (book) {
      setFormData({
        isbn: book.isbn || "",
        title: book.title || "",
        author: book.author || "",
        genre: book.category || "",
        publishedYear: book.publishedYear || "",
        publisher: book.publisher || "",
        language: book.language || "",
        shelfLocation: book.shelfLocation || "",
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await UpdateBook({
        isbn: formData.isbn,
        title: formData.title,
        authorId: book.authorId,
        genre: formData.genre,
        publishedYear: parseInt(formData.publishedYear, 10),
        publisher: formData.publisher,
        language: formData.language,
        shelfLocation: formData.shelfLocation,
        available: book?.available || true,
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Book Details Updated:", formData);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setEditBookDetailsClicked && setEditBookDetailsClicked(false);
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError("Failed to update book details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle className="text-base font-semibold text-gray-800">
        Edit Book Details
      </DialogTitle>
      <button
        onClick={() =>
          setEditBookDetailsClicked && setEditBookDetailsClicked(false)
        }
        className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
      >
        X
      </button>
      <DialogContent className="pt-1">
        {submitted && (
          <Alert severity="success" className="mb-6">
            Book details have been updated successfully!
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
                placeholder="ISBN"
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
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
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
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
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
            className="w-full px-3 py-1.5 bg-black text-white rounded font-medium text-xs outline-none hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              "Update Book Details"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
