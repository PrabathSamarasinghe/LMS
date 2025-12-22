import React, { useState, useMemo, useEffect } from "react";
import { GridParcel } from "@gtn/utility";
import LibrarianFilter from "../components/ManageLibrarianComponents/LibrarianFilter";
import RegisterNewLibrarian from "../components/ManageLibrarianComponents/RegisterNewLibrarian";
import { FetchAllLibrarians } from "../service/UserAPI";
import { ManageLibrarianColumnDefs } from "../utils/colDefs";
import { User } from "../utils/interfaces";

const ManageLibrarian = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [librarians, setLibrarians] = useState<User[]>([]);

  useEffect(() => {
    const loadLibrarians = async () => {
      const fetchedLibrarians = await FetchAllLibrarians();
      setLibrarians(fetchedLibrarians);
    };
    loadLibrarians();
  }, []);

  const [registerNewLibrarian, setRegisterNewLibrarian] = useState(false);

  const filteredLibrarians = useMemo(() => {
    // Filter librarians based on search term and status
    return librarians.filter((librarian) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        librarian.id.toLowerCase().includes(searchLower) || // search by ID
        librarian.fullname.toLowerCase().includes(searchLower) || // search by Name
        librarian.email.toLowerCase().includes(searchLower) || // search by Email
        librarian.phone.toLowerCase().includes(searchLower) || // search by Phone
        librarian.address.toLowerCase().includes(searchLower); // search by Address
      if (!matchesSearch) return false;

      if (statusFilter !== "All" && librarian.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [searchTerm, statusFilter, librarians]);

  return (
    <div className="w-full bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold text-gray-800">Manage Librarians</h1>
        <button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
          onClick={() => setRegisterNewLibrarian(true)}
        >
          Register New Librarian
        </button>
      </div>
      <LibrarianFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <GridParcel
        colDefs={ManageLibrarianColumnDefs}
        rowData={filteredLibrarians}
        paginationPageSize={10}
        enableFiltering={true}
        enableSorting={true}
        enableRowSelection={true}
        key={`${searchTerm}-${statusFilter}-${librarians}`}
      />
      {registerNewLibrarian && (
        <RegisterNewLibrarian
          setRegisterNewLibrarianClicked={setRegisterNewLibrarian}
        />
      )}
    </div>
  );
};

export default ManageLibrarian;
