import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AccountContainer } from "../styles/Account.styled";
import { RiEyeCloseLine } from "react-icons/ri";

const Account = () => {
  const role = localStorage.getItem("role");
  const [accounts, setAccounts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState();
  const [isgate, setIsgate] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3010/accounts");

        setAccounts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleEdit = (id) => {
    const username = selectedAccount.username;
    const password = selectedAccount.password;
    const role = selectedAccount.role;

    const editgatenumval = document
      .getElementById("editgatenum")
      .value.replace(/[^\w\s]/gi, "");
    if (!username && !password && !role) {
      alert("Please fill in all fields");
      return;
    }
    if (role === "gate" && !editgatenumval) {
      alert("Please fill in all fields");
      return;
    }
    const editedAccount = {
      username: username,
      password: password,
      role: role,
      gatenum: role === "gate" ? editgatenumval : "",
    };
    (async () => {
      try {
        const { data } = await axios.put(
          `http://localhost:3010/accounts/${id}`,
          editedAccount
        );
        if (data.message) {
          alert(data.message);
          return;
        } else if (data.err) {
          alert("An error occurs");
        } else {
          alert("Account edited successfully");
          setAccounts(data);
          setIsEditing(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      (async () => {
        try {
          const { data } = await axios.delete(
            `http://localhost:3010/accounts/${id}`
          );
          alert("Account deleted successfully");
          setAccounts(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };
  const handleAdd = (e) => {
    const root = document.querySelector(".add_container");
    const username = root.querySelector("#username").value;
    const password = root.querySelector("#password").value;
    const role = root.querySelector("#role").value;
    const gatenum = root.querySelector("#gatenum").value;
    if (!username || !password || !role) {
      alert("Please fill in all fields");
      return;
    }
    if (role === "gate" && !gatenum) {
      alert("Please fill in all fields");
      return;
    }
    const newAccount = {
      username: username,
      password: password,
      role,
      gatenum,
    };
    (async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3010/accounts",
          newAccount
        );
        console.log(data);
        if (data.message) {
          alert(data.message);
        } else {
          username.value = "";
          password.value = "";
          role.value = "";
          setAccounts(data);
          setIsAdding(false);
          alert("Account added successfully");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  if (role === "admin" || role === "super") {
    return (
      <AccountContainer>
        <h2 className="title">Account Management</h2>
        <div className="account-header">
          <button
            type="button"
            onClick={() => {
              setIsAdding(true);
            }}
          >
            Add Account
          </button>
          {/* <input type="text" placeholder="Search" /> */}
        </div>
        {isAdding && (
          <div
            style={isAdding ? { display: "flex" } : { display: "none" }}
            className="add_container"
          >
            <h1>Add Account</h1>
            <div className="form_container">
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="Username" id="username" />
            </div>
            <div className="form_container">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" id="password" />
            </div>
            <div className="form_container">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                onChange={(e) => {
                  if (e.target.value === "gate") {
                    setIsgate(true);
                  } else {
                    setIsgate(false);
                  }
                }}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="gate">Gate</option>
              </select>
            </div>
            <div
              style={isgate ? { display: "flex" } : { display: "none" }}
              className="form_container"
            >
              <label htmlFor="gatenum">Gate Number</label>
              <input
                type="number
            "
                pattern="[0-9]*"
                id="gatenum"
                placeholder="Gate number"
              />
            </div>
            <div className="btn">
              <button type="button" onClick={handleAdd}>
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setIsgate(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isEditing && (
          <div
            className="edit_container"
            style={isEditing ? { display: "flex" } : { display: "none" }}
          >
            <h1>Edit Account</h1>
            <div className="form_container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                defaultValue={selectedAccount?.username}
                onChange={(e) => {
                  setSelectedAccount({
                    ...selectedAccount,
                    username: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form_container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                defaultValue={selectedAccount?.password}
                onChange={(e) => {
                  setSelectedAccount({
                    ...selectedAccount,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form_container">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                defaultValue={selectedAccount?.role}
                onChange={(e) => {
                  setSelectedAccount({
                    ...selectedAccount,
                    role: e.target.value,
                  });
                  if (e.target.value == "gate") {
                    setIsgate(true);
                  } else {
                    setIsgate(false);
                  }
                }}
              >
                <option value="admin">Admin</option>
                <option value="gate">Gate</option>
              </select>
            </div>
            {(isgate || selectedAccount.role === "gate") && (
              <div className="form_container">
                <label htmlFor="gatenum">Gate Number</label>
                <input
                  defaultValue={selectedAccount?.gatenum}
                  type="number"
                  pattern="[0-9]*"
                  id="editgatenum"
                  placeholder="Gate number"
                />
              </div>
            )}
            <div className="btn">
              <button
                type="button"
                onClick={() => {
                  const id = selectedAccount?.id;
                  handleEdit(id);
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsgate(false);
                  setIsEditing(false);
                  setSelectedAccount({});
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="table">
          <table className="account-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {accounts.map((account) => (
                <tr id={"id" + account?.id} key={account?.id}>
                  <td>{account?.username}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {account?.password.split("").map((letter, index) => (
                          <span key={index}>*</span>
                        ))}
                      </div>
                      <input
                        type="checkbox"
                        id={"show-password" + account?.id}
                        style={{ display: "none" }}
                        onClick={(e) => {
                          const password = document.getElementById(
                            "show-password" + account?.id
                          );
                          const parent = e.target.parentElement;
                          const child = parent.children[0];
                          const icon = parent.children[2];

                          if (password.checked) {
                            child.innerHTML = account?.password;
                            icon.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path></g></svg>`;
                          } else {
                            child.innerHTML = account?.password
                              .split("")
                              .map((letter) => "*")
                              .join("");
                            icon.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M9.342 18.782l-1.931-.518.787-2.939a10.988 10.988 0 0 1-3.237-1.872l-2.153 2.154-1.415-1.415 2.154-2.153a10.957 10.957 0 0 1-2.371-5.07l1.968-.359C3.903 10.812 7.579 14 12 14c4.42 0 8.097-3.188 8.856-7.39l1.968.358a10.957 10.957 0 0 1-2.37 5.071l2.153 2.153-1.415 1.415-2.153-2.154a10.988 10.988 0 0 1-3.237 1.872l.787 2.94-1.931.517-.788-2.94a11.072 11.072 0 0 1-3.74 0l-.788 2.94z"></path></g></svg>`;
                          }
                        }}
                      />
                      <label htmlFor={"show-password" + account?.id}>
                        <RiEyeCloseLine />
                      </label>
                    </div>
                  </td>
                  <td>{account?.role + account?.gatenum}</td>
                  <td>
                    <button
                      className="edit"
                      type="button"
                      onClick={() => {
                        setSelectedAccount(account);
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => {
                        const id = account?.id;
                        handleDelete(id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AccountContainer>
    );
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

export default Account;
