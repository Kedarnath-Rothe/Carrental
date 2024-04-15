import { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { user, authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("https://carrental-khaki.vercel.app/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch user data. Please try again later.");
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://carrental-khaki.vercel.app/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      await response.json();

      getAllUsersData();
      toast.success("User Deleted Successfully...");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to delete user.");
    }
  }

  useEffect(() => {
    getAllUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationToken]);

  if (!user.isAdmin) {
    return <Navigate to="/userhome" />;
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="admin-users-section">

        <div style={{ marginTop: "4rem" }}>
          <center><h1>Admin Users Data</h1></center>
          <br />
          <center>
            <div className="container section_search">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                className="search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <p>Total Users: {filteredUsers.length - 1}</p>
            </div>
          </center>
        </div>

        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Car Provider</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((curUser) =>
                !curUser.isAdmin && (
                  <tr key={curUser._id}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td style={{
                      color: curUser.verified ? 'white' : 'red',
                      fontWeight: '1500'
                    }}>
                      {curUser.verified ? 'Verified' : 'Un-Verified'}
                    </td>
                    <td>{curUser.car_provider ? 'Yes' : 'No'}</td>
                    <td className="edit"><button><Link className="edit" style={{ color: "white" }} to={`/admin/user/${curUser._id}/edit`}>Edit</Link></button></td>
                    <td className="delete"><button onClick={() => deleteUser(curUser._id)}>Delete</button></td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default AdminUsers;
