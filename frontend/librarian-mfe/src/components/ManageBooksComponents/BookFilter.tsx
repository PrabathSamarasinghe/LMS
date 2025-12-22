import { useEffect, useState } from "react";
import { FetchAllGenres } from "../../service/BookAPI";
import { BookFilterProps } from "../../utils/interfaces";

export default function BookFilter({
  searchTerm,
  setSearchTerm,
  genreFilter,
  setGenreFilter,
}: BookFilterProps) {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await FetchAllGenres();
      setGenres(genres);
    };
    fetchGenres();
  }, []);

  const handleResetFilters = () => {
    setSearchTerm("");
    setGenreFilter("All");
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
            placeholder="ISBN, Title, Author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Category
          </label>
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
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
  );
}
