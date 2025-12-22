import { IssuedBooksFilterProps } from "../../utils/interfaces";

export default function IssuedBooksFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateRangeFilter,
  setDateRangeFilter,
}: IssuedBooksFilterProps) {
  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setDateRangeFilter("All");
  };

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
            placeholder="ISBN, Title, Member..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Issued">Issued</option>
            <option value="Overdue">Overdue</option>
            <option value="Returned">Returned</option>
            <option value="Returned (Late)">Returned (Late)</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Due Date
          </label>
          <select
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Overdue">Overdue</option>
            <option value="DueSoon">Due Soon (7 days)</option>
          </select>
        </div>

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
  );
}
