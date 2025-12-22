import { RequestFilterProps } from "../../../utils/interfaces";

const RequestFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  filteredRequests,
  bookRequests,
}: RequestFilterProps) => {
  return (
    <div className="bg-white rounded-lg p-3 mb-4 shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Search Bar */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="ID, Member, ISBN, Title..."
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
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </select>
        </div>

        {/* Reset Button */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            &nbsp;
          </label>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("All");
            }}
            className="w-full px-3 py-1.5 bg-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-400 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results Counter */}
      <div className="mt-2 text-xs text-gray-600">
        Showing <span className="font-semibold">{filteredRequests.length}</span> of{" "}
        <span className="font-semibold">{bookRequests.length}</span> book requests
      </div>
    </div>
  );
};

export default RequestFilter;
