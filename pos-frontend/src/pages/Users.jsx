import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cashier");
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
     `${import.meta.env.VITE_API_URL}/api/users`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch users"
        );
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create User
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Name, email and password are required");
      return;
    }

    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create user");
        return;
      }

      alert("User created successfully");

      setName("");
      setEmail("");
      setPassword("");
      setRole("cashier");

      fetchUsers();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Update User
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/users/${editingUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingUser.name,
            email: editingUser.email,
            role: editingUser.role,
            isActive: editingUser.isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update user");
        return;
      }

      alert("User updated successfully");

      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Toggle User Status
  const handleToggleStatus = async (user) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !user.isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update status");
        return;
      }

      fetchUsers();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete user");
        return;
      }

      alert("User deleted successfully");

      fetchUsers();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className=" bg-linear-to-br
      from-violet-700
      via-purple-600
      to-fuchsia-600
      bg-clip-text
      text-2xl
      font-extrabold
      tracking-tight
      text-transparent
      sm:text-3xl">
        Users
      </h1>

      {/* Add User Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Add User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-4 py-3"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option value="admin">Admin</option>
            <option value="cashier">Cashier</option>
            <option value="manager">Manager</option>
          </select>

          <button
            type="submit"
            className="bg-black text-white rounded-lg px-4 py-3"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Edit User */}
      {editingUser && (
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Edit User
          </h2>

          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  name: e.target.value,
                })
              }
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
              className="border rounded-lg px-4 py-3"
            />

            <select
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  role: e.target.value,
                })
              }
              className="border rounded-lg px-4 py-3"
            >
              <option value="admin">Admin</option>
              <option value="cashier">Cashier</option>
              <option value="manager">Manager</option>
            </select>

            <button
              type="submit"
              className="bg-black text-white rounded-lg px-4 py-3"
            >
              Update User
            </button>
          </form>

          <button
            onClick={() => setEditingUser(null)}
            className="mt-3 text-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">
            All Users
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4">
                  Name
                </th>

                <th className="text-left px-6 py-4">
                  Email
                </th>

                <th className="text-left px-6 py-4">
                  Role
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    {user.name}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {user.role}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleToggleStatus(user)
                      }
                      className={
                        user.isActive
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      {user.isActive
                        ? "Active"
                        : "Inactive"}
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        setEditingUser(user)
                      }
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <p className="p-6 text-gray-500">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Users;