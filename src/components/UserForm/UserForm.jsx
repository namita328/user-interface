import React, { useState } from "react";
import styles from "./UserForm.module.css";

const UserForm = ({ onAddUser, onCloseForm, userData }) => {
  const [newUser, setNewUser] = useState(
    userData || {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser(newUser);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={newUser.department}
            onChange={handleInputChange}
          />
        </label>
        <div className={styles.buttonContainer}>
          <button className={styles.addButton} type="submit">
            Add User
          </button>
          <button className={styles.closeButton} onClick={onCloseForm}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
