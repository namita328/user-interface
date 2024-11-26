import React, { useState } from "react";
import styles from "./UserTable.module.css";

import { FiEdit } from "react-icons/fi";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const UserTable = ({ users, setSelectedUser, handleEdit, handleDelete }) => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleStartEditing = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditingRowId(id);
    setEditedData({ ...userToEdit });
  };

  const handleSaveChanges = (id) => {
    handleEdit(id, editedData);
    setEditingRowId(null);
    setEditedData({});
  };

  const handleCancelEditing = () => {
    setEditingRowId(null);
    setEditedData({});
  };

  const handleEditField = (field, newValue) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };

  return (
    <div className={styles.userTableContainer}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => setSelectedUser(user)}>
              <td>{user.id}</td>
              <td>
                {editingRowId === user.id ? (
                  <TextField
                    value={editedData.name || ""}
                    onChange={(e) => handleEditField("name", e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingRowId === user.id ? (
                  <TextField
                    value={editedData.username || ""}
                    onChange={(e) =>
                      handleEditField("username", e.target.value)
                    }
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingRowId === user.id ? (
                  <TextField
                    value={editedData.email || ""}
                    onChange={(e) => handleEditField("email", e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingRowId === user.id ? (
                  <TextField
                    value={editedData.company?.name || ""}
                    onChange={(e) =>
                      handleEditField("company", {
                        ...editedData.company,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.company && user.company.name
                )}
              </td>
              <td>
                {editingRowId === user.id ? (
                  <>
                    <IconButton
                      onClick={() => handleSaveChanges(user.id)}
                      color="primary"
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelEditing} color="error">
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => setSelectedUser(user)}>
                      View
                    </IconButton>
                    <IconButton
                      onClick={() => handleStartEditing(user.id)}
                      color="primary"
                    >
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(user.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
