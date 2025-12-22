import React, { useState, useEffect } from "react";
import { Alert, DialogTitle, Dialog, DialogContent } from "@mui/material";
import { FetchAllUsers } from "../../service/UserAPI";
import { FetchAllBooks } from "../../service/BookAPI";
import { IssueABook } from "../../service/IssueBooksAPI";
import { BooksOption, User } from "../../utils/interfaces";


export default function IssueNewBook({
  setIssueNewBookClicked,
}: {
  setIssueNewBookClicked?: (value: boolean) => void;
}) {

  const [members, setMembers] = useState<User[]>([]);
  const [books, setBooks] = useState<BooksOption[]>([]);
  
  const fetchUsers = async () => {
    const users = await FetchAllUsers("member");
    const memberOptions = users.map((user) => ({
      id: user.id,
      fullname: user.fullname,
    }));
    setMembers(memberOptions);
  };

  const fetchBooks = async () => {
    const allBooks = await FetchAllBooks();
    const bookOptions = allBooks
      .filter((book) => book.available === true)
      .map((book) => ({
        isbn: book.isbn,
        title: book.title,
      }));
    setBooks(bookOptions);
  };

  useEffect(() => {
    const ExecuteFunctions = async () => {
      await Promise.all([
        fetchBooks(),
        fetchUsers()
      ]);
    };
    ExecuteFunctions();
  },[]);

  const [formData, setFormData] = useState({
    memberId: "",
    memberName: "",
    isbn: "",
    title: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedMember = members.find((member) => member.id === selectedId);
    setFormData((prev) => ({
      ...prev,
      memberId: selectedId,
      memberName: selectedMember?.fullname || "",
    }));
  };

  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIsbn = e.target.value;
    const selectedBook = books.find((book) => book.isbn === selectedIsbn);
    setFormData((prev) => ({
      ...prev,
      isbn: selectedIsbn,
      title: selectedBook?.title || "",
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (
      !formData.memberId ||
      !formData.isbn ||
      !formData.issueDate ||
      !formData.dueDate
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Validate due date is after issue date
    if (new Date(formData.dueDate) <= new Date(formData.issueDate)) {
      setError("Due date must be after issue date");
      setLoading(false);
      return;
    }

    try {
      await IssueABook({
        memberId:  `M${formData.memberId.toString().padStart(3, '0')}`,
        isbn: formData.isbn,
        issueDate: new Date(formData.issueDate).toISOString(),
        dueDate: new Date(formData.dueDate).toISOString(),
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIssueNewBookClicked && setIssueNewBookClicked(false);
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError("Failed to issue book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle className="text-base font-semibold text-gray-800">
        Issue New Book
      </DialogTitle>
      <button
        onClick={() =>
          setIssueNewBookClicked && setIssueNewBookClicked(false)
        }
        className="absolute top-2 right-5 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      <DialogContent className="pt-1">
        {submitted && (
          <Alert severity="success" className="mb-6">
            Book has been issued successfully!
          </Alert>
        )}

        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-1">
          {/* Member Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Select Member
            </label>
            <select
              value={formData.memberId}
              onChange={handleMemberChange}
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">-- Select Member --</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.fullname} (M{member.id.toString().padStart(3, '0')})
                </option>
              ))}
            </select>
          </div>

          {/* Book Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Select Book
            </label>
            <select
              value={formData.isbn}
              onChange={handleBookChange}
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">-- Select Book --</option>
              {books.map((book) => (
                <option key={book.isbn} value={book.isbn}>
                  {book.title} ({book.isbn})
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Issue Date
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-3 py-1.5 bg-black text-white rounded font-medium text-xs outline-none hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Issuing...
              </>
            ) : (
              "Issue Book"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
