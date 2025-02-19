import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, Search, UserPlus, X, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";

const AdminUserManagement = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/admin/users");
      const userData = Array.isArray(data) ? data : data.users;
      setUsers(userData);
      setFilteredUsers(userData);
    } catch (error) {
      toast.error("Failed to fetch users. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const updateUserRole = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:5000/admin/users/${id}`, { role: newRole });
      toast.success("User role updated successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`);
      toast.success("User deleted successfully");
      setDeleteConfirmOpen(null);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const addUser = async () => {
    setFormLoading(true);
    try {
      await axios.post("http://localhost:5000/admin/users", newUser);
      toast.success("User added successfully");
      setAddModalOpen(false);
      setNewUser({ name: "", email: "", password: "", phonenumber: "", role: "user" });
      fetchUsers();
    } catch (error) {
      toast.error("Failed to add user");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md relative">
      {/* Close */}
      <button onClick={() => navigate(-1)} className="absolute top-4 right-4 text-gray-500 hover:text-red-600">
        <X size={24} />
      </button>

      <h1 className="text-3xl font-semibold text-gray-800 mb-6">User Management</h1>

      {/* Search + Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-1 items-center border rounded-lg bg-gray-50">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 flex-1 bg-transparent focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r-lg"
          >
            <Search size={18} />
          </button>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#5e3a3a] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#4a2d2d]"
        >
          <UserPlus size={18} /> Add User
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-6 text-gray-600">
          <Loader2 size={32} className="animate-spin inline-block" /> Loading users...
        </div>
      ) : (
        <div className="overflow-auto bg-gray-50 rounded-lg shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#ebd3c7] text-[#5e3a3a]">
              <tr>
                <th className="p-3">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="p-3">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user._id, e.target.value)}
                      className="border rounded p-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => setDeleteConfirmOpen(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!filteredUsers.length && <p className="text-center py-4 text-gray-500">No users found.</p>}
        </div>
      )}

      {/* Add Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add User</h2>
            {/* Form */}
            <input type="text" placeholder="Name" className="border w-full p-2 mb-3" />
            <button onClick={addUser} className="bg-[#5e3a3a] text-white p-2 rounded w-full">
              {formLoading ? "Adding..." : "Add User"}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Are you sure you want to delete this user?</p>
            <button onClick={() => deleteUser(deleteConfirmOpen)}>Yes</button>
            <button onClick={() => setDeleteConfirmOpen(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
