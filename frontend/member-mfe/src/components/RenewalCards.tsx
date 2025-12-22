import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

const RenewalCards = ({ openDialog, handleCloseDialog, selectedBook, requestedDays, setRequestedDays, renewReason, setRenewReason, handleSubmitRenewal }) => {
  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle className="text-base font-semibold text-gray-800">
          Request Renewal - {selectedBook?.title}
        </DialogTitle>
        <button
          onClick={handleCloseDialog}
          className="absolute top-2 right-5 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <DialogContent className="pt-1">
          <form className="space-y-1">
            {/* Book Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Book Title
              </label>
              <input
                type="text"
                value={selectedBook?.title}
                disabled
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 bg-gray-50"
              />
            </div>

            {/* Due Date and Days Left */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="text"
                  value={selectedBook?.returnDate}
                  disabled
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 bg-gray-50"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Days Left
                </label>
                <input
                  type="text"
                  value={selectedBook?.daysLeft}
                  disabled
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 bg-gray-50"
                />
              </div>
            </div>

            {/* Request additional days */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Request Additional Days
              </label>
              <select
                value={requestedDays}
                onChange={(e) => setRequestedDays(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="21">21 days</option>
                <option value="30">30 days</option>
              </select>
            </div>

            {/* Reason for Renewal */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Reason for Renewal
              </label>
              <textarea
                value={renewReason}
                onChange={(e) => setRenewReason(e.target.value)}
                placeholder="Please explain why you need to renew this book..."
                rows={2}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={handleCloseDialog}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitRenewal}
                className="flex-1 px-3 py-1.5 bg-black text-white rounded text-xs font-medium hover:bg-gray-800 transition-colors"
              >
                Submit Renewal
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RenewalCards
