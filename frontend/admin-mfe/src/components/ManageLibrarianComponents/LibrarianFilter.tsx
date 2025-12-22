import { LibrarianFilterProps } from "../../utils/interfaces"

export default function LibrarianFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: LibrarianFilterProps) {
  const handleResetFilters = () => {
    setSearchTerm("")
    setStatusFilter("All")
  }

  return (
    <div className="bg-white rounded-lg p-4 mb-2 shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Search Bar */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="ID, Name, Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-black focus:ring-1 focus:ring-black"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        {/* Placeholder */}
        <div></div>

        {/* Reset Button */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            &nbsp;
          </label>
          <button
            onClick={handleResetFilters}
            className="w-full px-3 py-1.5 bg-black text-white rounded text-xs font-medium hover:bg-gray-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}
