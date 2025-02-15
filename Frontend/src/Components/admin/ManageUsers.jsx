import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Search, UserPlus } from "lucide-react";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    role: "user",
  });
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      if (Array.isArray(res.data)) {
        setUsers(res.data);
        setFilteredUsers(res.data); // Always keep both users and filteredUsers in sync
      } else if (Array.isArray(res.data.users)) {
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
      } else {
        setUsers([]);
        setFilteredUsers([]);
        console.error("Unexpected response format:", res.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
      setFilteredUsers([]);
    }
  };
  

  const fetchUserById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/admin/users/${searchId}`);
      setUsers([res.data]);
    } catch (error) {
      console.error("Failed to fetch user by ID:", error);
    }
  };

  

    const fetchUserByName = () => {
    if (!searchName.trim()) {
        setFilteredUsers(users); // If search is empty, reset to all users
    }else {
        const filtered = users.filter((user) =>
          user.name.toLowerCase().includes(searchName.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    }

  const updateUserRole = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:5000/admin/users/${id}`, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const addUser = async () => {
  try {
    await axios.post("http://localhost:5000/admin/users", newUser);
    setAddModalOpen(false);
    setNewUser({ name: "", email: "", password: "", phonenumber: "", role: "user" });
    fetchUsers();
  } catch (error) {
    console.error("Failed to add user:", error.response?.data || error.message);
  }
};


  return (
    <div className="p-6 bg-[#fff8f6] rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-[#5e3a3a] mb-4">Manage Users</h1>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search User by ID"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={fetchUserByName} className="bg-[#ebd3c7] p-2 rounded flex items-center gap-1">
          <Search size={18} /> Search
        </button>
        <button onClick={fetchUsers} className="bg-[#ebd3c7] p-2 rounded">Reset</button>
        <button onClick={() => setAddModalOpen(true)} className="bg-[#ebd3c7] p-2 rounded flex items-center gap-1">
          <UserPlus size={18} /> Add User
        </button>
      </div>

      <div className="overflow-auto bg-[#fef5f2] rounded-lg shadow-md p-4">
        <table className="min-w-full text-sm">
          <thead className="bg-[#ebd3c7] text-[#5e3a3a]">
            <tr>
              <th className="py-2">S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className="hover:bg-[#fdf2ef]">
                <td className="py-2">{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                <select
                    value={user.role.trim()} // Handle extra spaces
                    onChange={(e) => updateUserRole(user._id, e.target.value)}
                    className="border p-1 rounded"
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </td>





                <td>
                  <button onClick={() => deleteUser(user._id)} className="text-red-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-[300px]">
      <h2 className="text-lg mb-3 font-semibold">Add New User</h2>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={newUser.phonenumber}
        onChange={(e) => setNewUser({ ...newUser, phonenumber: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <div className="flex justify-end gap-2">
        <button onClick={() => setAddModalOpen(false)} className="bg-gray-300 p-2 rounded">
          Cancel
        </button>
        <button onClick={addUser} className="bg-[#f6e5df] p-2 rounded">
          Add User
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminUserManagement;
