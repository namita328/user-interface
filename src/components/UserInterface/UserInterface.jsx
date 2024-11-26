import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, editUser, deleteUser } from "../utils/api";
import UserTable from "../userTable/userTable";
import UserForm from "../UserForm/UserForm";
import styles from "../UserInterface/UserInterface.module.css";

const UserInterface = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "userInterface";
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchUsers();
      console.log("users data", data);
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error fetching users. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await addUser(newUser);
      setUsers((prevUsers) => [...prevUsers, addedUser]);
      console.log("new user", addedUser);
      setIsAddingUser(false);
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Error adding user. Please try again.");
    }
  };

  const handleEditUser = async (editedUser) => {
    try {
      const res = await editUser(editedUser.id, editedUser);
      console.log(res);
      fetchData();
      setSelectedUser(null);
    } catch (err) {
      console.error("Error editing user:", err);
      setError("Error editing user. Please try again.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await deleteUser(userId);
      console.log(res);
      fetchData();
      setSelectedUser(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Error deleting user. Please try again.");
    }
  };
  const handleOnCloseForm = () => {
    // console.log("close form");
    setIsAddingUser(false);
  };

  return (
    <div className={styles.userInterfaceContainer}>
      <h1>User Management System</h1>

      <div className={styles.actionButtons}>
        <button onClick={() => setIsAddingUser(true)}>Add User</button>
      </div>

      <UserTable
        users={users}
        setSelectedUser={setSelectedUser}
        handleEdit={handleEditUser}
        handleDelete={handleDeleteUser}
      />

      {selectedUser && (
        <div className={styles.userDetails}>
          <h2>User Details</h2>
          <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
        </div>
      )}

      {isAddingUser && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <UserForm
              onAddUser={handleAddUser}
              onCloseForm={handleOnCloseForm}
              userData={selectedUser}
            />
          </div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default UserInterface;
