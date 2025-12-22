import React, { useState } from 'react'
import { Alert, DialogTitle, Dialog, DialogContent } from '@mui/material'
import { NewBookRequest } from '../services/BookAPIs'
import useAuth from '../hooks/useAuth';

export default function RequestNewBooks({setRequestNewBooksClicked}: {setRequestNewBooksClicked?: (value: boolean) => void}) {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    isbn: '',
    reason: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await NewBookRequest({
        title: formData.bookTitle,
        author: formData.author,
        reason: formData.reason,
        memberId: auth.userId
      })
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Book Request Submitted:', formData)
      setSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ bookTitle: '', author: '', isbn: '', reason: '' })
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      setError('Failed to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle className="text-base font-semibold text-gray-800">Request New Books</DialogTitle>
      <button
        onClick={() => setRequestNewBooksClicked && setRequestNewBooksClicked(false)}
        className="absolute top-2 right-5 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      <DialogContent className="pt-1">
        {submitted && (
          <Alert severity="success" className="mb-6">
            Your book request has been submitted successfully! We'll review it shortly.
          </Alert>
        )}

        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-1">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Book Title</label>
            <input
              type="text"
              placeholder="Enter the book title"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Author</label>
              <input
                type="text"
                placeholder="Enter the author name"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">ISBN (Optional)</label>
              <input
                type="text"
                placeholder="Enter ISBN if available"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Reason for Request</label>
            <textarea
              placeholder="Tell us why you'd like this book"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={3}
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-3 py-1.5 bg-black text-white rounded font-medium text-xs outline-none hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
