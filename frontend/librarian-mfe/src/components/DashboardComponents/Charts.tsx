import { Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { chartDummies } from "../../utils/dummy";
import { FetchChartData } from "../../service/DashboardAPI";

const Charts: React.FC = () => {
  const [issuedBooksTrend, setIssuedBooksTrend] = useState([]);
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState([]);
  const [genrePopularity, setGenrePopularity] = useState([]);
  const [monthlyNewMembers, setMonthlyNewMembers] = useState([]);
  useEffect(() => {
    const fetchChartData = async () => {
      // Placeholder for future API calls to fetch real chart data
      const {
        issuedBooksTrend,
        mostBorrowedBooks,
        genrePopularity,
        monthlyNewMembers,
      } = await FetchChartData();
      setIssuedBooksTrend(issuedBooksTrend);
      setMostBorrowedBooks(mostBorrowedBooks);
      setGenrePopularity(genrePopularity);
      setMonthlyNewMembers(monthlyNewMembers);
    };
    fetchChartData();
  }, []);

  const maxTrend = Math.max(
    ...issuedBooksTrend.map((book) => Math.max(book.issued, book.returned))
  );
  const maxBooks = Math.max(...mostBorrowedBooks.map((book) => book.borrows));
  const maxMembers = Math.max(
    ...monthlyNewMembers.map((member) => member.members)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Issued Books Trend */}
      <Card className="bg-white border-0 shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Issued Books Trend (Weekly)
          </h2>
          <div className="space-y-3">
            {issuedBooksTrend.map((data) => (
              <div key={data.week}>
                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                  <span>{data.week}</span>
                  <span>
                    Issued: {data.issued} | Returned: {data.returned}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div
                    className="flex-1 bg-gray-300 rounded h-6 flex items-center"
                    style={{ width: `${(data.issued / maxTrend) * 100}%` }}
                  >
                    <span className="text-xs font-bold text-black px-1">
                      {data.issued}
                    </span>
                  </div>
                  <div
                    className="flex-1 bg-gray-500 rounded h-6 flex items-center"
                    style={{ width: `${(data.returned / maxTrend) * 100}%` }}
                  >
                    <span className="text-xs font-bold text-white px-1">
                      {data.returned}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 justify-center text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span>Issued</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-600 rounded"></div>
              <span>Returned</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Most Borrowed Books */}
      <Card className="bg-white border-0 shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Most Borrowed Books
          </h2>
          <div className="space-y-3">
            {mostBorrowedBooks.map((book) => (
              <div key={book.name}>
                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                  <span>{book.name}</span>
                  <span>{book.borrows} borrows</span>
                </div>
                <div
                  className="w-full bg-gray-200 rounded h-6"
                  style={{
                    background:
                      "linear-gradient(90deg, #404040 0%, #666666 100%)",
                  }}
                >
                  <div
                    className="bg-black h-6 rounded flex items-center justify-end px-2"
                    style={{ width: `${(book.borrows / maxBooks) * 100}%` }}
                  >
                    <span className="text-xs font-bold text-white">
                      {book.borrows}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Genre Popularity */}
      <Card className="bg-white border-0 shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Genre Popularity
          </h2>
          <div className="flex flex-col gap-3">
            {genrePopularity.map((genre, idx) => (
              <div key={genre.name}>
                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                  <span>{genre.name}</span>
                  <span>{genre.value}%</span>
                </div>
                <div
                  className="w-full bg-gray-200 rounded-full h-4"
                  style={{ overflow: "hidden" }}
                >
                  <div
                    className="h-4 rounded-full flex items-center justify-end px-1"
                    style={{
                      width: `${genre.value}%`,
                      backgroundColor: idx % 2 === 0 ? "#000000" : "#666666",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly New Members */}
      <Card className="bg-white border-0 shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Monthly New Members
          </h2>
          <div className="space-y-3">
            {monthlyNewMembers.map((month) => (
              <div key={month.month}>
                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                  <span>{month.month}</span>
                  <span>{month.members} members</span>
                </div>
                <div
                  className="w-full bg-gray-200 rounded h-6"
                  style={{
                    background:
                      "linear-gradient(90deg, #262626 0%, #737373 100%)",
                  }}
                >
                  <div
                    className="bg-gray-700 h-6 rounded flex items-center justify-end px-2"
                    style={{ width: `${(month.members / maxMembers) * 100}%` }}
                  >
                    <span className="text-xs font-bold text-white">
                      {month.members}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Charts;
