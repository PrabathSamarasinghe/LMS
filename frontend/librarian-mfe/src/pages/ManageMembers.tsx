import { GridParcel } from "@gtn/utility";
import { useState, useMemo, useEffect } from "react";
import RegisterNewMember from "../components/ManageMemberComponents/RegisterNewMember";
import MemberFilter from "../components/ManageMemberComponents/MemberFilter";
import { FetchAllMembers } from "../service/UserAPI";
import { ManageMembersColumnDefs } from "../utils/colDefs";
import { Member } from "../utils/interfaces";
const ManageMembers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const allMembers = await FetchAllMembers("member");
      setMembers(allMembers);
    };
    fetchMembers();
  },[]);

  const [registerNewMember, setRegisterNewMember] = useState(false);

  const filteredMembers = useMemo(() => {
    // Filter members based on search term and status filter
    return members.filter((member) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        member.id.toString().toLowerCase().includes(searchLower) ||
        member.fullname.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower) ||
        member.phone.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      if (statusFilter !== "All" && member.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [members, searchTerm, statusFilter]);

  return (
    <div className="w-full bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Manage Members
        </h1>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
          onClick={() => setRegisterNewMember(true)}
        >
          Register New Member
        </button>
      </div>
      <MemberFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <GridParcel
        colDefs={ManageMembersColumnDefs}
        rowData={filteredMembers}
        paginationPageSize={10}
        enableFiltering={true}
        enableSorting={true}
        enableRowSelection={true}
        key={`${members}-${searchTerm}-${statusFilter}`}
      />
      {registerNewMember && (
        <RegisterNewMember
          setRegisterNewMemberClicked={setRegisterNewMember}
        />
      )}
    </div>
  );
};

export default ManageMembers;
